/* eslint-disable react/prop-types */
import { useCallback, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import type { DialogProps } from '@mui/material/Dialog';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { TableEmptyRows } from '../table-empty-rows';
import { TableNoData } from '../table-no-data';
import { TeamTableHead } from '../team-table-head';
import { UserTableToolbar } from '../team-table-toolbar';
import { applyFilter, emptyRows, getComparator } from '../utils';

import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useCreateTeam, useDeleteTeam, useGroupTeams } from 'src/hooks/team';
import { useRouter } from 'src/routes/hooks';
import { TGroupTeam, TTeamCreate, TTeamCreateFields } from 'src/types/team';
import { hasNullishOrEmptyString, pickProperties } from 'src/utils';
import { TeamProps, TeamTableRow } from '../team-table-row';

// ----------------------------------------------------------------------

export function TeamView() {
  const [openModal, setOpenModal] = useState(false);
  const [filterName, setFilterName] = useState('');

  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const table = useTable();
  const { deleteTeamById } = useDeleteTeam();
  const { onCreateNewTeam } = useCreateTeam();
  const { teams, onFetchTeams: refetchTeams } = useGroupTeams();

  const dataFiltered: TeamProps[] = applyFilter({
    inputData: teams,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const onGotoTeamDetailPage = useCallback(
    (team: TGroupTeam) => {
      router.push(`/phong-ban/${team.id}`);
    },
    [router]
  );

  const onSoftDeleteTeam = useCallback(
    async (team: TGroupTeam) => {
      await deleteTeamById(team.id);
      refetchTeams();
    },
    [deleteTeamById, refetchTeams]
  );

  const onCreateTeam = useCallback(
    async (fields: TTeamCreateFields) => {
      // validate
      const requiredFields = pickProperties(fields, ['name']);
      if (hasNullishOrEmptyString(requiredFields)) {
        enqueueSnackbar('Tên không được để trống', { variant: 'warning' });
        return;
      }

      // process data
      const data: TTeamCreate = {
        hotline: fields.hotline ?? '',
        name: fields.name ?? '',
      };

      // make api call
      await onCreateNewTeam(data);

      // side effect
      refetchTeams();
      setOpenModal(false);
    },
    [refetchTeams, onCreateNewTeam, enqueueSnackbar, setOpenModal]
  );

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Phòng ban
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
              <TeamTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={teams.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    teams.map((team) => team.id.toString())
                  )
                }
                headLabel={[
                  { id: 'name', label: 'Tên phòng ban' },
                  { id: 'hotline', label: 'Hotline' },
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
                    <TeamTableRow
                      key={row.id.toString()}
                      row={row}
                      selected={table.selected.includes(row.id.toString())}
                      onSelectRow={() => table.onSelectRow(row.id.toString())}
                      onDeleteTeam={onSoftDeleteTeam}
                      onGotoDetail={onGotoTeamDetailPage}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, teams.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={teams.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 15, 25, teams.length]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />

        {openModal && (
          <CreateTeamDialog
            cb={onCreateTeam}
            dialogProps={{ open: openModal, onClose: () => setOpenModal(false) }}
          />
        )}
      </Card>
    </DashboardContent>
  );
}

type CreateTeamDialogProps = {
  dialogProps: DialogProps;
  cb: (fields: TTeamCreateFields) => void;
};
const CreateTeamDialog: React.FC<CreateTeamDialogProps> = ({ dialogProps, cb }) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TTeamCreateFields>();

  return (
    <Dialog {...dialogProps}>
      <Box px={{ xs: 2, md: 4 }} pb={{ xs: 3, md: 6 }} pt={{ xs: 1, md: 2 }}>
        <DialogTitle sx={{ pl: 0.5, mb: { xs: 1, md: 2 } }}>Tạo phòng ban mới</DialogTitle>
        <Grid container spacing={{ xs: 0, md: 2 }}>
          <Grid item xs={12} md={6}>
            <TextField
              {...register('name')}
              label="Tên phòng ban"
              placeholder="Nhập tên"
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 3 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              {...register('hotline')}
              label="Hotline"
              placeholder="Nhập hotline"
              fullWidth
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
