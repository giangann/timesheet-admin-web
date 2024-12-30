import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Grid,
} from '@mui/material';
import { useCallback, useState } from 'react';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type UserTableToolbarProps = {
  numSelected: number;
  onMultiDelete?: () => void;
  filterName: string;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function UserTableToolbar({
  numSelected,
  filterName,
  onFilterName,
  onMultiDelete,
}: UserTableToolbarProps) {
  const [openCfModal, setOpenCfModal] = useState(false);
  const handleOpenConfirmModal = useCallback(() => {
    setOpenCfModal(true);
  }, [setOpenCfModal]);

  const handleCloseConfirmModal = useCallback(() => {
    setOpenCfModal(false);
  }, [setOpenCfModal]);

  const handleAcceptDelete = useCallback(() => {
    handleCloseConfirmModal();
    onMultiDelete?.();
  }, [handleCloseConfirmModal, onMultiDelete]);
  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <OutlinedInput
          fullWidth
          value={filterName}
          onChange={onFilterName}
          placeholder="Tìm theo họ tên..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify width={20} icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          }
          sx={{ maxWidth: 320 }}
        />
      )}
      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton onClick={handleOpenConfirmModal}>
            <Iconify icon="solar:trash-bin-trash-bold" />
          </IconButton>
        </Tooltip>
      )}

      {/* {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <Iconify icon="solar:trash-bin-trash-bold" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <Iconify icon="ic:round-filter-list" />
          </IconButton>
        </Tooltip>
      )} */}

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
                Xác nhận xóa {numSelected} bản ghi
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
    </Toolbar>
  );
}
