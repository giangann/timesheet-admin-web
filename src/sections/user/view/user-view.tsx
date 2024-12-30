import TextField from '@mui/material/TextField';
import { useCallback, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { TableEmptyRows } from '../table-empty-rows';
import { TableNoData } from '../table-no-data';
import { UserTableHead } from '../user-table-head';
import { UserTableRow } from '../user-table-row';
import { UserTableToolbar } from '../user-table-toolbar';
import { applyFilter, emptyRows, getComparator, transformUserData } from '../utils';

import { Dialog, DialogContentText, DialogTitle, Grid, IconButton, Tooltip } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useDownloadExcelFile } from 'src/hooks/excel';
import { useAuth } from 'src/hooks/use-auth';
import { useDeleteUser, useGroupUsers, useImport } from 'src/hooks/user';
import { useRouter } from 'src/routes/hooks';
import { base64ToBlob, saveDownloadedFileBlobFormat } from 'src/utils';
import type { UserProps } from '../user-table-row';

// ----------------------------------------------------------------------

export function UserView() {
  const [openModal, setOpenModal] = useState(false);
  const [importFile, setImportFile] = useState<File>();
  const [filterName, setFilterName] = useState('');

  const router = useRouter();
  const table = useTable();
  const { enqueueSnackbar } = useSnackbar();
  const { isLoading, users, refetchUsers } = useGroupUsers();
  const { deleteUserById, deleteUserByIds } = useDeleteUser();
  const { user: userInfo } = useAuth();
  const { isDownloading, onDownloadFile } = useDownloadExcelFile({
    endpoint: '/users/download-example',
    fileName: 'ThêmNhânViên_FileExcelMẫu.xlsx',
  });
  const {
    onImportFile,
    isSubmitting,
    response,
    onResetState: resetImportResponse,
  } = useImport({
    endpoint: '/users/import-user',
    file: importFile,
  });

  const dataFiltered: UserProps[] = applyFilter({
    inputData: transformUserData(users),
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const onImportFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const target = event.target as HTMLInputElement;
      if (target.files) {
        setImportFile(target.files[0]);
        resetImportResponse();
      }
    },
    [resetImportResponse]
  );

  const onImportFileAndRefetchData = useCallback(async () => {
    await onImportFile();
    refetchUsers();
  }, [onImportFile, refetchUsers]);

  const onSaveImportResultFile = useCallback(() => {
    const responseFileBlob = base64ToBlob(response?.file);

    if (!responseFileBlob) {
      enqueueSnackbar('Lỗi không tìm thấy Blob File', { variant: 'error' });
      return;
    }
    saveDownloadedFileBlobFormat(responseFileBlob, 'ThêmNhânViên_FileExcelKếtQuả.xlsx');
  }, [response, enqueueSnackbar]);

  const resetImportFileRequest = useCallback(() => setImportFile(undefined), []);

  const onResetDialogState = useCallback(() => {
    resetImportFileRequest();
    resetImportResponse();
  }, [resetImportFileRequest, resetImportResponse]);

  const onGotoUserDetailPage = useCallback(
    (user: UserProps) => {
      router.push(`/nhan-vien/${user.id}`);
    },
    [router]
  );

  const onSoftDeleteUser = useCallback(
    async (user: UserProps) => {
      await deleteUserById(user.id);
      refetchUsers();
    },
    [deleteUserById, refetchUsers]
  );

  const onSoftDeleteUserById = useCallback(
    async (id: number) => {
      await deleteUserById(id);
      refetchUsers();
    },
    [deleteUserById, refetchUsers]
  );

  const onSelectAllRow = useCallback(
    (checked: boolean) => {
      table.onSelectAllRows(
        checked,
        users.map((user) => user.id.toString())
      );
    },
    [users, table]
  );

  const onUnSelectAllRow = useCallback(() => {
    table.onSelectAllRows(false, []);
  }, [table]);

  const onDeleteMultiUser = useCallback(() => {
    const userIds: string[] = table.selected;
    const ids = userIds.map((id) => parseInt(id, 10));

    deleteUserByIds(ids);

    onUnSelectAllRow();
  }, [table, deleteUserByIds, onUnSelectAllRow]);

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Nhân viên ({users.length})
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={() => setOpenModal(true)}
        >
          Thêm mới
        </Button>
      </Box>

      <Card>
        <UserTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterName(event.target.value);
            table.onResetPage();
          }}
          onMultiDelete={onDeleteMultiUser}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={users.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={onSelectAllRow}
                headLabel={[
                  { id: 'name', label: 'Họ tên' },

                  { id: 'teamName', label: 'Phòng ban' },
                  { id: 'teamHotline', label: 'Liên hệ phòng' },

                  { id: 'roleName', label: 'Chức vụ' },
                  { id: 'phone', label: 'Số điện thoại', align: 'left' },
                  { id: 'address', label: 'Địa chỉ' },
                  { id: 'email', label: 'Email' },

                  { id: 'salaryCoefficient', label: 'Hệ số lương' },
                  { id: 'positionBonusCoefficient', label: 'Hệ số chức vụ' },
                  { id: 'otherBonusCoefficient', label: 'Hệ số phụ cấp khác' },

                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <UserTableRow
                      key={row.id.toString()}
                      row={row}
                      selected={table.selected.includes(row.id.toString())}
                      onSelectRow={() => table.onSelectRow(row.id.toString())}
                      onDeleteUser={onSoftDeleteUser}
                      onGotoDetail={onGotoUserDetailPage}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, users.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={users.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 15, 25, users.length]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>

      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ p: 4, pb: 8 }}>
          <Box position="relative">
            <DialogTitle sx={{ textAlign: 'center' }}>Nhập bằng file excel</DialogTitle>
            <Box position="absolute" top="15%" left={0}>
              <Tooltip title="Thực hiện lại">
                <IconButton onClick={onResetDialogState}>
                  <Iconify icon="mage:reload" />
                </IconButton>
              </Tooltip>
            </Box>

            <Box position="absolute" top="15%" right={0}>
              <Tooltip title="Đóng">
                <IconButton onClick={() => setOpenModal(false)}>
                  <Iconify icon="material-symbols:close" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <Grid container rowGap={3}>
            <Grid item xs={12}>
              <DialogContentText sx={{ mb: 1 }}>1. Tải về file excel mẫu:</DialogContentText>
              <Button
                variant="contained"
                color="inherit"
                startIcon={<Iconify icon="material-symbols:download" />}
                onClick={onDownloadFile}
                disabled={isDownloading}
              >
                Tải về
              </Button>
            </Grid>

            <Grid item xs={12}>
              <DialogContentText sx={{ mb: 2 }}>
                2. Tải lên file excel đã điền thông tin Nhân viên:
              </DialogContentText>
              <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
                  <TextField
                    type="file"
                    onChange={onImportFileChange}
                    label="Chọn file excel"
                    InputLabelProps={{ shrink: true, sx: { fontSize: 20 } }}
                    inputProps={{
                      accept:
                        '.xls, .xlsx, .csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, text/csv',
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <Button
                    onClick={onImportFileAndRefetchData}
                    variant="contained"
                    color="info"
                    startIcon={<Iconify icon="line-md:upload-loop" />}
                    disabled={!importFile || isSubmitting}
                  >
                    Tải lên
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <DialogContentText sx={{ mb: 2 }}>3. Kết quả:</DialogContentText>
              <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
                  <Typography>Tổng số bản ghi gửi lên: {response?.totalRecord ?? '-'}</Typography>
                  <Typography>
                    Số bản ghi nhập thành công: {response?.numSuccessRecord ?? '-'}
                  </Typography>
                  <Typography>
                    Số bản ghi nhập thất bại: {response?.numErrorRecord ?? '-'}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={12}>
                  <Button
                    onClick={onSaveImportResultFile}
                    variant="contained"
                    color="primary"
                    startIcon={<Iconify icon="carbon:result-new" />}
                    disabled={!response?.file}
                  >
                    Tải về xem file kết quả
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}
