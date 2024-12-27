import { useCallback, useState } from 'react';

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Grid,
  Tooltip,
} from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { TBaseSalary } from 'src/types/system-setting';
import { fDate, formatStr } from 'src/utils';

// ----------------------------------------------------------------------

export type BaseSalaryProps = TBaseSalary;

type BaseSalaryTableRowProps = {
  row: BaseSalaryProps;
  selected: boolean;
  onSelectRow: () => void;
  onDeleteBaseSalary: (row: BaseSalaryProps) => void;
  onGotoDetail: (row: BaseSalaryProps) => void;
};

export function BaseSalaryTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteBaseSalary,
  onGotoDetail,
}: BaseSalaryTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
  const [openCfModal, setOpenCfModal] = useState(false);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleOpenConfirmModal = useCallback(() => {
    setOpenCfModal(true);
  }, [setOpenCfModal]);

  const handleCloseConfirmModal = useCallback(() => {
    setOpenCfModal(false);
  }, [setOpenCfModal]);

  const handleClickDeleteMenuItem = useCallback(() => {
    handleClosePopover();
    handleOpenConfirmModal();
  }, [handleClosePopover, handleOpenConfirmModal]);

  const handleClickEditMenuItem = useCallback(() => {
    handleClosePopover();
    onGotoDetail(row);
  }, [handleClosePopover, onGotoDetail, row]);

  const handleAcceptDelete = useCallback(() => {
    handleCloseConfirmModal();
    onDeleteBaseSalary(row);
  }, [handleCloseConfirmModal, onDeleteBaseSalary, row]);
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell>{fDate(new Date(row.effectiveDate), 'DD/MM/YYYY')}</TableCell>
        <TableCell>{row.value}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem onClick={handleClickEditMenuItem}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <MenuItem onClick={handleClickDeleteMenuItem} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>

      <Dialog open={openCfModal} onClose={handleCloseConfirmModal}>
        <Box sx={{ p: 4, pb: 4 }}>
          <Box position="relative">
            <DialogTitle sx={{ textAlign: 'left' }}>Xác nhận xóa?</DialogTitle>

            <Box position="absolute" top="15%" right={0}>
              <Tooltip title="Đóng">
                <IconButton onClick={handleCloseConfirmModal}>
                  <Iconify icon="material-symbols:close" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <Grid container rowGap={3}>
            <Grid item xs={12}>
              <DialogContentText sx={{ mb: 1 }}>
                Xác nhận xóa bản ghi có hiệu lực từ{' '}
                {fDate(new Date(row.effectiveDate), 'DD/MM/YYYY')}:
              </DialogContentText>
            </Grid>
          </Grid>
          <DialogActions>
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<Iconify icon="codicon:discard" />}
              onClick={handleCloseConfirmModal}
            >
              Hủy
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<Iconify icon="material-symbols:delete" />}
              onClick={handleAcceptDelete}
            >
              Xóa
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
