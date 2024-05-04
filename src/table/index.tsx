'use client';

import { useMemo, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControl from '@mui/material/FormControl';
import {
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  GridColumnVisibilityModel,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';

import { useBoolean } from 'src/hooks/use-boolean';

import axios from 'src/utils/axios';
import { exportToExcel } from 'src/utils/xlsx';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { IExam } from 'src/types/exam';

import { StyledBadge } from './styled';
import { useTableContext } from './context';
import ShortcutAction from './actions/shortcut-action';

// ----------------------------------------------------------------------

type Props = {
  exams?: IExam[];
  selectedExam?: number | string;
  setSelectedExam?: (id: number | string) => void;
};

const HIDE_COLUMNS = {
  id: false,
};

const HIDE_COLUMNS_TOGGLABLE = ['id', 'actions'];

export default function TableData({ exams, selectedExam, setSelectedExam }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const {
    setValue,
    table_data,
    table_column,
    table_selected,
    table_export_data,
    table_selected_row,
    table_config,
    onForm,
    onMultiForm,
    onDeleteRow,
    onDeleteRows,
    onUpdateRow,
  } = useTableContext();

  const {
    table_name,
    add_data,
    add_multi_data,
    active_row,
    delete_row,
    edit_row,
    delete_multi,
    change_status_multi,
  } = table_config;

  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>(HIDE_COLUMNS);

  const columns: GridColDef[] = useMemo(() => table_column, [table_column]);

  const getTogglableColumns = () =>
    columns
      .filter((column) => !HIDE_COLUMNS_TOGGLABLE.includes(column.field))
      .map((column) => column.field);

  // ----------------------------------------------------------------------

  const confirmDeleteOne = useBoolean();
  const loadingDeleteOne = useBoolean();

  const onDeleteOne = useCallback(async () => {
    loadingDeleteOne.onTrue();
    try {
      await axios.delete(`${table_name}/${table_selected_row.id}`);
      onDeleteRow(table_selected_row.id);
      loadingDeleteOne.onFalse();
      confirmDeleteOne.onFalse();
      enqueueSnackbar('Đã xoá dữ liệu thành công !');
    } catch (error) {
      console.log(error);
      loadingDeleteOne.onFalse();
      confirmDeleteOne.onFalse();
      enqueueSnackbar('Dữ liệu đang có sự ràng buộc ! Không thể xoá !', {
        variant: 'error',
      });
    }
  }, [table_selected_row, table_config, axios, onDeleteRow, enqueueSnackbar]);

  // ----------------------------------------------------------------------

  const confirmDeleteMulti = useBoolean();
  const confirmChangeStatusMulti = useBoolean();
  const loadingDeleteMulti = useBoolean();

  const onDeleteMulti = useCallback(async () => {
    loadingDeleteMulti.onTrue();

    try {
      await axios.delete(`${table_name}/batch`, { data: table_selected });
      onDeleteRows(table_selected);
      loadingDeleteMulti.onFalse();
      confirmDeleteMulti.onFalse();
      enqueueSnackbar('Đã xoá dữ liệu thành công !');
    } catch (error) {
      console.log(error);
      loadingDeleteMulti.onFalse();
      confirmDeleteMulti.onFalse();
      enqueueSnackbar('Dữ liệu đang có sự ràng buộc ! Không thể xoá !', {
        variant: 'error',
      });
    }
  }, [table_selected_row, table_selected, table_config, axios, onDeleteRows, enqueueSnackbar]);

  // ----------------------------------------------------------------------

  const onActive = useCallback(
    async (row: any) => {
      try {
        const response = await axios.patch(`${table_name}/active/${row.id}`, {
          status: !row.isActive,
        });
        onUpdateRow(response.data);
        enqueueSnackbar('Thay đổi trạng thái thành công !');
      } catch (error) {
        console.log(error);
        enqueueSnackbar(
          error.message || error.message[0] || 'Đã có lỗi xảy ra !  Vui lòng thử lại !',
          {
            variant: 'error',
          }
        );
      }
    },
    [table_selected_row, table_config, axios, onUpdateRow, enqueueSnackbar]
  );

  // ----------------------------------------------------------------------

  const onExport = useCallback(() => {
    exportToExcel({
      data: table_export_data,
      name: 'export',
      sheet: 'Sheet1',
      type: '.xlsx',
    });
    enqueueSnackbar('Xuất dữ liệu thành công !');
  }, [exportToExcel, table_export_data]);

  return (
    <>
      <Card>
        <Stack direction="row" justifyContent="space-between" sx={{ m: 1.5 }} spacing={1}>
          <Stack direction="row" spacing={1}>
            {exams && setSelectedExam && (
              <FormControl sx={{ width: 220 }}>
                <InputLabel size="small">Lựa chọn bài thi</InputLabel>
                <Select
                  size="small"
                  label="Lựa chọn bài thi"
                  value={selectedExam}
                  onChange={(event) => setSelectedExam(event.target.value)}
                >
                  {exams.map((exam) => (
                    <MenuItem key={exam.id} value={exam.id}>
                      {exam.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {add_data && (
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<Iconify icon="material-symbols-light:add-notes-sharp" />}
                onClick={() => onForm(true)}
                disabled
              >
                Thêm mới
              </Button>
            )}

            {add_multi_data && (
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<Iconify icon="mdi:table-add" />}
                onClick={() => onMultiForm(true)}
                disabled
              >
                Nhập file
              </Button>
            )}
          </Stack>

          <Stack direction="row" spacing={1}>
            {delete_multi && (
              <Tooltip title="Thay đổi trạng thái">
                <StyledBadge
                  badgeContent={table_selected.length}
                  color="error"
                  children={
                    <IconButton
                      color="warning"
                      size="small"
                      disabled={!table_selected.length}
                      onClick={confirmChangeStatusMulti.onTrue}
                    >
                      <Iconify icon="material-symbols:change-circle" />
                    </IconButton>
                  }
                />
              </Tooltip>
            )}

            {change_status_multi && (
              <Tooltip title="Xoá các lựa chọn">
                <StyledBadge
                  badgeContent={table_selected.length}
                  color="error"
                  children={
                    <IconButton
                      color="error"
                      size="small"
                      disabled={!table_selected.length}
                      onClick={confirmDeleteMulti.onTrue}
                    >
                      <Iconify icon="material-symbols:delete" />
                    </IconButton>
                  }
                />
              </Tooltip>
            )}
          </Stack>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ height: 'calc(100vh - 112px)' }}>
          <DataGrid
            checkboxSelection
            disableRowSelectionOnClick
            rows={table_data}
            columns={[
              ...columns,
              {
                type: 'actions',
                field: 'actions',
                headerName: 'Hành động',
                align: 'right',
                headerAlign: 'right',
                flex: 1,
                minWidth: 120,
                sortable: false,
                filterable: false,
                disableColumnMenu: true,
                getActions: (params) => [
                  <GridActionsCellItem
                    showInMenu
                    icon={<Iconify icon="fluent-mdl2:sync-status-solid" />}
                    label="Thay đổi trạng thái"
                    sx={{ color: 'info.main' }}
                    onClick={() => onActive(params.row)}
                    disabled={!active_row}
                  />,
                  <GridActionsCellItem
                    showInMenu
                    icon={<Iconify icon="solar:pen-bold" />}
                    label="Chỉnh sửa dữ liệu"
                    sx={{ color: 'warning.main' }}
                    onClick={() => {
                      setValue('table_selected_row', params.row);
                      onForm(true);
                    }}
                    disabled={!edit_row}
                  />,
                  <GridActionsCellItem
                    showInMenu
                    icon={<Iconify icon="solar:trash-bin-trash-bold" />}
                    label="Xoá dữ liệu này"
                    sx={{ color: 'error.main' }}
                    onClick={() => {
                      setValue('table_selected_row', params.row);
                      confirmDeleteOne.onTrue();
                    }}
                    disabled={!delete_row}
                  />,
                ],
              },
            ]}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
            onRowSelectionModelChange={(newSelectionModel) => {
              setValue(
                'table_selected',
                table_data
                  .filter((row: any) => newSelectionModel.includes(row.id))
                  .map((_row: any) => _row.id)
              );
            }}
            slots={{
              toolbar: () => (
                <GridToolbarContainer>
                  <GridToolbarQuickFilter size="small" placeholder="Tìm kiếm dữ liệu..." />
                  <Box sx={{ flexGrow: 1 }} />
                  <GridToolbarColumnsButton />
                  <GridToolbarFilterButton />
                  <GridToolbarDensitySelector />
                  <Button
                    size="small"
                    startIcon={<Iconify icon="material-symbols:export-notes-rounded" />}
                    onClick={onExport}
                    disabled={!table_export_data.length}
                  >
                    Xuất
                  </Button>
                  <ShortcutAction />
                </GridToolbarContainer>
              ),
              noRowsOverlay: () => <EmptyContent title="Không có dữ liệu" />,
              noResultsOverlay: () => <EmptyContent title="Không tìm thấy dữ liệu" />,
            }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              },
              columnsPanel: {
                getTogglableColumns,
              },
            }}
          />
        </Box>
      </Card>

      <ConfirmDialog
        open={confirmDeleteOne.value}
        onClose={confirmDeleteOne.onFalse}
        title="Xác nhận xoá dữ liệu"
        content="Bạn có chắc muốn xoá dữ liệu này ? ( Dữ liệu đã xoá không thể khôi phục lại )"
        action={
          <LoadingButton
            variant="contained"
            color="error"
            loading={loadingDeleteOne.value}
            onClick={onDeleteOne}
          >
            Xác nhận xoá
          </LoadingButton>
        }
      />

      <ConfirmDialog
        open={confirmDeleteMulti.value}
        onClose={confirmDeleteMulti.onFalse}
        title="Xác nhận xoá các dữ liệu"
        content={`Bạn có chắc muốn xoá ${table_selected.length} dữ liệu này ? ( Dữ liệu đã xoá không thể khôi phục lại )`}
        action={
          <LoadingButton
            variant="contained"
            color="error"
            loading={loadingDeleteMulti.value}
            onClick={onDeleteMulti}
          >
            Xác nhận xoá
          </LoadingButton>
        }
      />
    </>
  );
}
