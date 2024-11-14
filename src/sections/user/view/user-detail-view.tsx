import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, TextField, Typography } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Iconify } from 'src/components/iconify';
import { useUserDetail, useUserUpdate } from 'src/hooks/user';
import { DashboardContent } from 'src/layouts/dashboard';
import { TGroupUser } from 'src/types/user';

// ----------------------------------------------------------------------

export function UserDetailView() {
  const [isEdit, setIsEdit] = useState(false);
  const params = useParams();
  const userId = useMemo(() => parseInt(params?.id ?? '0', 10), [params]);

  const { isLoading, userDetail, onFetchUserDetail } = useUserDetail(userId);
  const { onUpdateUser } = useUserUpdate();
  const { handleSubmit, register } = useForm<Partial<TGroupUser>>();

  const onToggleEdit = useCallback(() => {
    setIsEdit((prev) => !prev);
  }, [setIsEdit]);

  const onSave = useCallback(
    async (values: Partial<TGroupUser>) => {
      // get dirty values
      // call on
      await onUpdateUser(userId, values);

      // side effect
      onToggleEdit();
      onFetchUserDetail();
    },
    [onUpdateUser, onToggleEdit, onFetchUserDetail, userId]
  );
  return (
    <DashboardContent>
      {isLoading && <Typography>...loading</Typography>}
      {!isLoading && !userDetail && <Typography color="red">Không có thông tin!</Typography>}
      {!isLoading && userDetail && (
        <>
          <Box display="flex" alignItems="center" mb={5}>
            <Typography variant="h4" flexGrow={1}>
              {userDetail.name}
            </Typography>
            <Button
              variant="contained"
              color="inherit"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={onToggleEdit}
            >
              {isEdit ? 'Hủy' : 'Sửa'}
            </Button>
          </Box>
          <Card>
            <TextField
              {...register('name')}
              fullWidth
              label="Tên"
              placeholder="Nhập số CCCD"
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 3 }}
            />

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              color="inherit"
              variant="contained"
              onClick={handleSubmit(onSave)}
            >
              Đăng nhập
            </LoadingButton>
          </Card>
        </>
      )}
    </DashboardContent>
  );
}
