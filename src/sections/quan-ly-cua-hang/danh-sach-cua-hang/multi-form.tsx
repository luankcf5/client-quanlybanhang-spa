import { useRef, useState, useCallback } from 'react';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TableContainer from '@mui/material/TableContainer';

import { useBoolean } from 'src/hooks/use-boolean';

import { exportToExcel, readExcelFile } from 'src/utils/xlsx';

import { createStores } from 'src/api/store';
import { useTableContext } from 'src/table/context';

import { useSnackbar } from 'src/components/snackbar';

// ----------------------------------------------------------------------

interface Column {
  id: 'username' | 'password' | 'name' | 'class';
  label: string;
  minWidth?: number;
  align?: 'right';
}

const COLUMNS: Column[] = [
  { id: 'username', label: 'Tên đăng nhập' },
  { id: 'password', label: 'Mật khẩu' },
  {
    id: 'name',
    label: 'Họ và tên',
  },
  {
    id: 'class',
    label: 'Lớp',
  },
];

export default function MultiForm() {
  const { table_open_multi_form, onCreateNewManyRow, onMultiForm } = useTableContext();

  const isLoading = useBoolean();

  const { enqueueSnackbar } = useSnackbar();

  const inputRef = useRef<HTMLInputElement>(null);

  const [importData, setImportData] = useState<any>([]);

  const handleExportData = useCallback(() => {
    exportToExcel({
      data: [
        {
          'Tên học sinh': 'Lê Thanh Tùng',
          'Tên đăng nhập': 'lethanhtung',
          'Mật khẩu': 'TungLe@123',
        },
      ],
      name: 'mau_tao_hoc_sinh',
      sheet: 'Sheet1',
      type: '.xlsx',
    });
  }, []);

  const onSubmit = useCallback(async () => {
    try {
      isLoading.onTrue();
      const students = await createStores(importData);
      onCreateNewManyRow(students);
      isLoading.onFalse();
      enqueueSnackbar('Đã thêm dữ liệu học sinh mới !');
      handleClose();
    } catch (error) {
      isLoading.onFalse();
      console.log(error);
      enqueueSnackbar(
        error.message || error.message[0] || 'Đã có lỗi xảy ra !  Vui lòng thử lại !',
        {
          variant: 'error',
        }
      );
    }
  }, [importData]);

  const handleImportValue = useCallback(
    async (event: any) => {
      const importValues = (await readExcelFile(event.target.files[0])) as any;
      const format = importValues.map((importValue: any) => ({
        name: importValue['Tên học sinh'],
        username: importValue['Tên đăng nhập'],
        password: importValue['Mật khẩu'],
      }));

      setImportData(format);
    },
    [readExcelFile, setImportData]
  );

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleClose = useCallback(() => {
    onMultiForm(false);
    setImportData([]);
  }, [onMultiForm, setImportData]);

  return (
    <Dialog fullWidth maxWidth="lg" open={table_open_multi_form} onClose={handleClose}>
      <DialogTitle>Thêm dữ liệu nhiều học sinh mới</DialogTitle>

      <DialogContent>
        <Stack spacing={2}>
          <Alert variant="outlined" severity="info" sx={{ mt: 2 }}>
            Ghi chú : Bấm vào <strong>Tạo dữ liệu mẫu</strong> để tạo mẫu nhập dữ liệu. Sau đó bấm
            vào <strong>Nhập dữ liệu từ mẫu</strong>, <strong>chọn lớp</strong> và bắt đầu thêm danh
            sách học sinh.
          </Alert>

          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" spacing={1}>
              <Button variant="contained" color="primary" onClick={handleExportData}>
                Tạo dữ liệu mẫu
              </Button>

              <Button variant="contained" color="success" onClick={handleClick}>
                Nhập dữ liệu từ mẫu
                <input
                  type="file"
                  style={{ display: 'none' }}
                  accept=".xlsx,.xls"
                  ref={inputRef}
                  onChange={handleImportValue}
                />
              </Button>
            </Stack>
          </Stack>

          <TableContainer sx={{ overflow: 'unset' }}>
            <Table>
              <TableHead>
                {COLUMNS.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ top: 56, minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableHead>

              <TableBody>
                {importData.map((student: any) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={student.username}>
                    {COLUMNS.map((column) => {
                      const value = student[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Huỷ bỏ
        </Button>

        <LoadingButton
          color="primary"
          variant="contained"
          loading={isLoading.value}
          disabled={!importData.length}
          onClick={onSubmit}
        >
          Thêm danh sách học sinh
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
