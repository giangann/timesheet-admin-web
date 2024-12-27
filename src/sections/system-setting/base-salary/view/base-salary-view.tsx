/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogProps,
  DialogTitle,
  Grid,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  TextField,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { useBaseSalary, useCreateBaseSalary, useDeleteBaseSalary } from 'src/hooks/system-setting';
import { DashboardContent } from 'src/layouts/dashboard';
import { useRouter } from 'src/routes/hooks';
import {
  TBaseSalary,
  TBaseSalaryCreate,
  TBaseSalaryCreateFormFields,
} from 'src/types/system-setting';
import { hasNullishOrEmptyString, pickProperties } from 'src/utils';
import { BaseSalaryTableHead } from '../base-salary-table-head';
import { BaseSalaryProps, BaseSalaryTableRow } from '../base-salary-table-row';
import { BaseSalaryTableToolbar } from '../base-salary-table-toolbar';
import { TableEmptyRows } from '../table-empty-rows';
import { TableNoData } from '../table-no-data';
import { applyFilter, emptyRows, getComparator } from '../utils';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

export function BaseSalaryView() {
  const [openModal, setOpenModal] = useState(false);
  const [filterName, setFilterName] = useState('');

  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const { baseSalaries, onFetchBaseSalaries: refetch } = useBaseSalary();
  const { onCreateNewBaseSalary } = useCreateBaseSalary();
  const { deleteBaseSalaryById } = useDeleteBaseSalary();
  const table = useTable();

  const dataFiltered: BaseSalaryProps[] = applyFilter({
    inputData: baseSalaries,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;
  const onGotoDetailPage = useCallback(
    (row: TBaseSalary) => {
      router.push(`/cai-dat-he-thong/luong-co-ban/${row.id}`);
    },
    [router]
  );
  const onSoftDelete = useCallback(
    async (row: TBaseSalary) => {
      await deleteBaseSalaryById(row.id);
      refetch();
    },
    [deleteBaseSalaryById, refetch]
  );

  const onCreate = useCallback(
    async (fields: TBaseSalaryCreateFormFields) => {
      // validate
      const requiredFields = pickProperties(fields, ['value', 'effectiveDate']);
      if (hasNullishOrEmptyString(requiredFields)) {
        enqueueSnackbar('Tên không được để trống', { variant: 'warning' });
        return;
      }

      // process data
      const data: TBaseSalaryCreate = {
        value: fields.value ?? 0,
        effectiveDate: fields.effectiveDate ?? '',
      };

      // make api call
      await onCreateNewBaseSalary(data);

      // side effect
      refetch();
      setOpenModal(false);
    },
    [refetch, onCreateNewBaseSalary, enqueueSnackbar, setOpenModal]
  );
  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Mức lương cơ bản
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
        <BaseSalaryTableToolbar
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
              <BaseSalaryTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={baseSalaries.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    baseSalaries.map((baseSalary) => baseSalary.id.toString())
                  )
                }
                headLabel={[
                  { id: 'effectiveDate', label: 'Ngày hiệu lực' },
                  { id: 'value', label: 'Giá trị' },
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
                    <BaseSalaryTableRow
                      key={row.id.toString()}
                      row={row}
                      selected={table.selected.includes(row.id.toString())}
                      onSelectRow={() => table.onSelectRow(row.id.toString())}
                      onDeleteBaseSalary={onSoftDelete}
                      onGotoDetail={onGotoDetailPage}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, baseSalaries.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={baseSalaries.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 15, 25, baseSalaries.length]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />

        {openModal && (
          <CreateBaseSalaryDialog
            cb={onCreate}
            dialogProps={{ open: openModal, onClose: () => setOpenModal(false) }}
          />
        )}
      </Card>
    </DashboardContent>
  );
}

type CreateBaseSalaryDialogProps = {
  dialogProps: DialogProps;
  cb: (fields: TBaseSalaryCreateFormFields) => void;
};
const CreateBaseSalaryDialog: React.FC<CreateBaseSalaryDialogProps> = ({ dialogProps, cb }) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = useForm<TBaseSalaryCreateFormFields>();

  return (
    <Dialog {...dialogProps}>
      <Box px={{ xs: 2, md: 4 }} pb={{ xs: 3, md: 6 }} pt={{ xs: 1, md: 2 }}>
        <DialogTitle sx={{ pl: 0.5, mb: { xs: 1, md: 2 } }}>Tạo mức lương cơ sở mới</DialogTitle>
        <Grid container spacing={{ xs: 0, md: 2 }}>
          <Grid item xs={12} md={6}>
            <Controller
              name="effectiveDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Ngày hiệu lực *" // required marked by *
                  value={dayjs(field.value)} // Bind the value to the form state
                  onChange={(newValue: Dayjs | null) => {
                    field.onChange(newValue); // Update form state
                  }}
                  slotProps={{
                    textField: {
                      onBlur: field.onBlur, // Bind onBlur to react-hook-form
                      name: field.name, // Provide the field name
                      inputRef: field.ref, // Reference for validation
                    },
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              {...register('value')}
              label="Mức lương (VNĐ)"
              placeholder="Nhập mức lương"
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 3 }}
            />
          </Grid>
        </Grid>

        <DialogActions sx={{ pr: 0 }}>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<Iconify icon="codicon:close" />}
            onClick={(event) => dialogProps.onClose?.(event, 'backdropClick')}
          >
            Đóng
          </Button>
          <Button
            variant="contained"
            startIcon={<Iconify icon="material-symbols:add" />}
            onClick={handleSubmit(cb)}
            disabled={isSubmitting}
          >
            {`Tạo`.padEnd(5)}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

// ----------------------------------------------------------------------

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('effectiveDate');
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
