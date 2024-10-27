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
import { applyFilter, emptyRows, getComparator } from '../utils';

import { useGroupUsers, useImport } from 'src/hooks/user';
import type { UserProps } from '../user-table-row';
import { useDownloadExcelFile } from 'src/hooks/excel';
import { base64ToUrl } from 'src/utils';
import { Dialog, DialogContent, DialogContentText, DialogTitle, Grid, Modal } from '@mui/material';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

export function UserView() {
  const table = useTable();
  const { enqueueSnackbar } = useSnackbar();
  const { isLoading, users } = useGroupUsers();
  const { isDownloading, onDownloadFile } = useDownloadExcelFile({
    url: '/users/download-example',
    fileName: 'ThêmNhânViên_FileExcelMẫu.xlsx',
  });
  const [openModal, setOpenModal] = useState(false);
  const [importFile, setImportFile] = useState<File>();
  const { onImportFile, isSubmitting, zipData } = useImport({ file: importFile });

  const [filterName, setFilterName] = useState('');

  const dataFiltered: UserProps[] = applyFilter({
    inputData: users,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

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
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    users.map((user) => user.identifyCard)
                  )
                }
                headLabel={[
                  { id: 'name', label: 'Họ tên' },

                  { id: 'team', label: 'Phòng ban' },
                  { id: 'hotline', label: 'Liên hệ phòng' },

                  { id: 'role', label: 'Chức vụ' },
                  { id: 'phone', label: 'Số điện thoại', align: 'left' },
                  { id: 'address', label: 'Địa chỉ' },
                  { id: 'email', label: 'Email' },

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
                      key={row.identifyCard}
                      row={row}
                      selected={table.selected.includes(row.identifyCard)}
                      onSelectRow={() => table.onSelectRow(row.identifyCard)}
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
        <Box sx={{ p: 4 }}>
          <DialogTitle>Nhập bằng file excel</DialogTitle>
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
                    onChange={(event) => {
                      const target = event.target as HTMLInputElement;
                      if (target.files) {
                        setImportFile(target.files[0]);
                      }
                    }}
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
                    variant="contained"
                    color="info"
                    startIcon={<Iconify icon="line-md:upload-loop" />}
                    disabled={!importFile}
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
                  <Typography>Tổng số bản ghi gửi lên: {2}</Typography>
                  <Typography>Số bản ghi nhập thành công: {1}</Typography>
                  <Typography>Số bản ghi nhập thất bại: {1}</Typography>
                </Grid>

                <Grid item xs={12} md={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Iconify icon="carbon:result-new" />}
                    disabled={!zipData}
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
