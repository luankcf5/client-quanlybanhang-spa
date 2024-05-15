import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';

import { useBoolean } from 'src/hooks/use-boolean';

import { useTableContext } from 'src/table/context';
import { createProduct, updateProduct } from 'src/api/product';
import { createCategory, useGetCategories } from 'src/api/category';

import { useSnackbar } from 'src/components/snackbar';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import FormProvider, {
  BlockItem,
  RHFSelect,
  RHFUpload,
  RHFTextField,
} from 'src/components/hook-form';

import { ICategory } from 'src/types/category';

// ----------------------------------------------------------------------

export default function Form() {
  const { table_selected_row, table_open_form, setValue, onForm, onCreateNewRow, onUpdateRow } =
    useTableContext();

  const { categories } = useGetCategories();

  const isEdit = !!table_selected_row;

  const { enqueueSnackbar } = useSnackbar();

  const [currentTab, setCurrentTab] = useState('info');

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  const Schema = Yup.object().shape({
    name: Yup.string().required('Bạn chưa nhập tên cho sản phẩm !'),
    code: Yup.string().required('Bạn chưa nhập mã cho sản phẩm !'),
    category: Yup.string().required('Bạn chưa chọn danh mục cho sản phẩm !'),
    price: Yup.string().required('Bạn chưa nhập giá cho sản phẩm !'),
    discount: Yup.string().required('Bạn chưa nhập giảm giá cho sản phẩm !'),
    amount: Yup.string().required('Bạn chưa nhập tồn kho cho sản phẩm !'),
    description: Yup.string(),
    image: Yup.mixed().nullable(),
  });

  const defaultValues = useMemo(
    () => ({
      name: table_selected_row?.name || '',
      code: table_selected_row?.code || '',
      category: table_selected_row?.category.id || '',
      price: table_selected_row?.price || 0,
      discount: table_selected_row?.discount || 0,
      amount: table_selected_row?.amount || 0,
      description: table_selected_row?.description || '',
      image: table_selected_row?.image || null,
    }),
    [table_selected_row]
  );

  const methods = useForm({
    // @ts-ignore
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    setValue: setFormValue,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    reset(defaultValues);
  }, [reset, table_selected_row, defaultValues]);

  // ----------------------------------------------------------------------

  const onSubmit = handleSubmit(async (data: any) => {
    try {
      if (!isEdit) {
        const product = await createProduct({ ...data, categoryId: Number(data.category) });
        onCreateNewRow(product);
        enqueueSnackbar('Đã thêm dữ liệu sản phẩm mới !');
      } else {
        const product = await updateProduct(table_selected_row.id, {
          ...data,
          categoryId: Number(data.category),
        });
        onUpdateRow(product);
        enqueueSnackbar('Đã cập nhật dữ liệu sản phẩm !');
      }
      reset();
      handleClose();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message || error.message[0], {
        variant: 'error',
      });
    }
  });

  const handleClose = useCallback(() => {
    setValue('table_selected_row', null);
    onForm(false);
    reset();
  }, [onForm, setValue, reset]);

  const handleDropSingleFile = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      if (newFile) {
        setFormValue('image', newFile, { shouldValidate: true });
      }
    },
    [setFormValue]
  );

  // ----------------------------------------------------------------------

  const discountPopover = usePopover();

  const categoryPopover = usePopover();

  const isLoadingCategory = useBoolean();

  const [categoryName, setCategoryName] = useState('');

  const [categoryData, setCategoryData] = useState<ICategory[]>([]);

  useEffect(() => {
    setCategoryData(categories);
  }, [categories]);

  const handleNewCategory = useCallback(async () => {
    isLoadingCategory.onTrue();
    try {
      const category = await createCategory({ name: categoryName, tags: [] });
      categoryPopover.onClose();
      const currentCategories = [...categoryData];
      const newCategories = [...currentCategories, category];
      setFormValue('category', category.id);
      setCategoryData(newCategories);
      setCategoryName('');
      isLoadingCategory.onFalse();
      enqueueSnackbar('Đã thêm dữ liệu danh mục mới !');
    } catch (error) {
      isLoadingCategory.onFalse();
      enqueueSnackbar(
        error.message[0] || error.message || 'Đã có lỗi xảy ra !  Vui lòng thử lại !',
        {
          variant: 'error',
        }
      );
    }
  }, [
    categoryName,
    categoryPopover,
    categoryData,
    setCategoryName,
    setCategoryData,
    enqueueSnackbar,
  ]);

  return (
    <Dialog fullWidth maxWidth="md" open={table_open_form} onClose={handleClose}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>
          {isEdit ? 'Cập nhật dữ liệu sản phẩm' : 'Thêm dữ liệu sản phẩm mới'}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2}>
            <Tabs value={currentTab} onChange={handleChangeTab}>
              <Tab label="Thông tin sản phẩm" value="info" />
              <Tab label="Mô tả sản phẩm" value="description" />
              <Tab label="Hình ảnh sản phẩm" value="image" />
            </Tabs>

            {currentTab === 'info' && (
              <>
                <Stack direction="row" spacing={1}>
                  <BlockItem label="Tên sản phẩm :" required>
                    <RHFTextField
                      name="name"
                      label="Nhập tên sản phẩm"
                      placeholder="Quần áo H&M..."
                    />
                  </BlockItem>

                  <BlockItem label="Mã sản phẩm :" required>
                    <RHFTextField name="code" label="Nhập mã sản phẩm" placeholder="QA40434..." />
                  </BlockItem>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <BlockItem
                    label="Danh mục sản phẩm :"
                    required
                    button={
                      <>
                        <Button size="small" color="primary" onClick={categoryPopover.onOpen}>
                          Thêm danh mục
                        </Button>

                        <CustomPopover
                          open={categoryPopover.open}
                          onClose={categoryPopover.onClose}
                          sx={{ padding: 1, width: 320 }}
                        >
                          <Stack spacing={1}>
                            <TextField
                              fullWidth
                              size="small"
                              placeholder="Nhập tên danh mục"
                              value={categoryName}
                              onChange={(event) => setCategoryName(event.target.value)}
                            />

                            <LoadingButton
                              loading={isLoadingCategory.value}
                              variant="contained"
                              color="primary"
                              onClick={handleNewCategory}
                            >
                              Thêm mới
                            </LoadingButton>
                          </Stack>
                        </CustomPopover>
                      </>
                    }
                  >
                    <RHFSelect name="category" label="Chọn danh mục sản phẩm">
                      {categoryData.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </RHFSelect>
                  </BlockItem>

                  <BlockItem label="Số lượng tồn kho :" required>
                    <RHFTextField
                      name="amount"
                      type="number"
                      label="Nhập số lượng tồn kho"
                      placeholder="13..."
                      onChange={(event) =>
                        setFormValue('amount', event.target.value, { shouldValidate: true })
                      }
                    />
                  </BlockItem>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <BlockItem label="Giá gốc sản phẩm :" required>
                    <RHFTextField
                      name="price"
                      type="number"
                      label="Nhập giá gốc sản phẩm"
                      placeholder="100000..."
                      onChange={(event) =>
                        setFormValue('price', event.target.value, { shouldValidate: true })
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            <Typography variant="subtitle2">VNĐ</Typography>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </BlockItem>

                  <BlockItem
                    label="Giá khuyến mãi sản phẩm :"
                    required
                    button={
                      <>
                        <Button size="small" color="primary" onClick={discountPopover.onOpen}>
                          Nhập phần trăm
                        </Button>

                        <CustomPopover
                          open={discountPopover.open}
                          onClose={discountPopover.onClose}
                          sx={{ padding: 1 }}
                        >
                          <TextField
                            size="small"
                            type="number"
                            placeholder="Nhập % khuyến mãi"
                            onChange={(event) =>
                              setFormValue('discount', +values.price * (+event.target.value / 100))
                            }
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="start">
                                  <Typography variant="subtitle2">%</Typography>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </CustomPopover>
                      </>
                    }
                  >
                    <RHFTextField
                      name="discount"
                      type="number"
                      label="Nhập giá khuyến mãi sản phẩm"
                      placeholder="50000..."
                      onChange={(event) =>
                        setFormValue('discount', Number(event.target.value), {
                          shouldValidate: true,
                        })
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            <Typography variant="subtitle2">VNĐ</Typography>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </BlockItem>
                </Stack>
              </>
            )}

            {currentTab === 'description' && (
              <BlockItem label="Mô tả sản phẩm :" required>
                <RHFTextField
                  multiline
                  rows={2}
                  name="description"
                  label="Nhập mô tả sản phẩm..."
                  placeholder="Đây là sản phẩm cho các mặt hàng đồ gia dụng..."
                />
              </BlockItem>
            )}

            {currentTab === 'image' && (
              <BlockItem label="Hình ảnh sản phẩm :" required>
                <RHFUpload
                  name="image"
                  maxSize={3145728}
                  onDrop={handleDropSingleFile}
                  onDelete={() => setFormValue('image', null, { shouldValidate: true })}
                />
              </BlockItem>
            )}
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Huỷ bỏ
          </Button>

          <LoadingButton type="submit" color="primary" variant="contained" loading={isSubmitting}>
            {isEdit ? 'Cập nhật dữ liệu' : 'Thêm dữ liệu mới'}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
