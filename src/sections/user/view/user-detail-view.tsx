import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, TextField, Typography } from '@mui/material';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useGetUserDetailFromUserList, useUserUpdate } from 'src/hooks/user';
import { DashboardContent } from 'src/layouts/dashboard';
import { TGroupUser } from 'src/types/user';
import { dirtyValues } from 'src/utils/format-field-values';

// ----------------------------------------------------------------------

export function UserDetailView() {
  const params = useParams();
  const userId = useMemo(() => parseInt(params?.id ?? '0', 10), [params]);

  const { isLoading, userDetail, onFetchUserDetail } = useGetUserDetailFromUserList(userId);
  const { onUpdateUser } = useUserUpdate();
  const { handleSubmit, register, formState , reset} = useForm<Partial<TGroupUser>>();

  const onSave = useCallback(
    async (values: Partial<TGroupUser>) => {
      // get dirty values
      const data = dirtyValues(formState.dirtyFields, values);

      // call on
      await onUpdateUser(userId, data);

      // side effect
      onFetchUserDetail();

      // reset
      reset()
    },
    [onUpdateUser, onFetchUserDetail, userId, formState, reset]
  );

  console.log({ userDetail });
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
          </Box>
          <Card>
            <Box p={{ xs: 2, sm: 4 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4} xl={3}>
                  <TextField
                    {...register('name')}
                    defaultValue={userDetail.name}
                    label="Tên"
                    placeholder="Nhập tên"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                <Grid item xs={12} md={4} xl={3}>
                  <TextField
                    {...register('email')}
                    defaultValue={userDetail.email}
                    label="Email"
                    placeholder="Nhập email"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                <Grid item xs={12} md={4} xl={3}>
                  <TextField
                    {...register('address')}
                    defaultValue={userDetail.address}
                    label="Địa chỉ"
                    placeholder="Nhập địa chỉ"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                <Grid item xs={12} md={4} xl={3}>
                  <TextField
                    {...register('phone')}
                    defaultValue={userDetail.phone}
                    label="Số điện thoại"
                    placeholder="Nhập số điện thoại"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 3 }}
                  />
                </Grid>

                <Grid item xs={12} md={4} xl={3}>
                  <TextField
                    {...register('team.id')}
                    fullWidth
                    label="Phòng ban"
                    placeholder="Chọn phòng ban"
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 3 }}
                  />
                </Grid>

                <Grid item xs={12} md={4} xl={3}>
                  <TextField
                    {...register('roleCode')}
                    fullWidth
                    label="Chức vụ"
                    placeholder="Chọn chức vụ"
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 3 }}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} md={4} xl={3}>
                  <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    color="inherit"
                    variant="contained"
                    disabled={!formState.isDirty}
                    onClick={handleSubmit(onSave)}
                  >
                    Lưu
                  </LoadingButton>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </>
      )}
    </DashboardContent>
  );
}
