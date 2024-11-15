import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  Typography
} from '@mui/material';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useGroupRoles } from 'src/hooks/role';
import { useGroupTeams } from 'src/hooks/team';
import { useGetUserDetailFromUserList, useUserUpdate } from 'src/hooks/user';
import { DashboardContent } from 'src/layouts/dashboard';
import { TGroupUser, TGroupUserUpdate } from 'src/types/user';
import { dataToOptions } from 'src/utils/array-util';
import { dirtyValues } from 'src/utils/format-field-values';

// ----------------------------------------------------------------------

export function UserDetailView() {
  const params = useParams();
  const userId = useMemo(() => parseInt(params?.id ?? '0', 10), [params]);

  const { handleSubmit, register, formState, reset } = useForm<Partial<TGroupUserUpdate>>({
    defaultValues: { teamId: '1' },
  });
  const { onUpdateUser } = useUserUpdate();

  const { isLoading, userDetail, onFetchUserDetail } = useGetUserDetailFromUserList(userId);
  const { isLoading: isTeamsLoading, teams } = useGroupTeams();
  const { isLoading: isRolesLoading, roles } = useGroupRoles();

  const teamOpts = useMemo(() => dataToOptions(teams, 'name', 'id'), [teams]);
  const roleOpts = useMemo(() => dataToOptions(roles, 'name', 'code'), [roles]);

  const onSave = useCallback(
    async (values: Partial<TGroupUser>) => {
      // get dirty values
      const data = dirtyValues(formState.dirtyFields, values);

      // call on
      await onUpdateUser(userId, data);

      // side effect
      onFetchUserDetail();

      // reset
      reset();
    },
    [onUpdateUser, onFetchUserDetail, userId, formState, reset]
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
                  {isTeamsLoading && <Skeleton variant="rounded" height={56} width="100%" />}
                  {!isTeamsLoading && (
                    <FormControl fullWidth>
                      <InputLabel id="team-id-label">Phòng ban</InputLabel>
                      <Select
                        {...register('teamId')}
                        label="Phòng ban"
                        labelId="team-id-label"
                        id="team-id"
                        fullWidth
                        defaultValue={userDetail.team.id.toString()}
                        sx={{ mb: 3 }}
                      >
                        {teamOpts.map((opt) => (
                          <MenuItem value={opt.value} key={opt.value}>
                            {opt.text}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                </Grid>

                <Grid item xs={12} md={4} xl={3}>
                  {isRolesLoading && <Skeleton variant="rounded" height={56} width="100%" />}
                  {!isRolesLoading && (
                    <FormControl fullWidth>
                    <InputLabel id="role-code-label">Chức vụ</InputLabel>
                    <Select
                      {...register('roleCode')}
                      label="Chức vụ"
                      labelId="role-code-label"
                      id="role-code"
                      fullWidth
                      defaultValue={userDetail.roleCode}
                      sx={{ mb: 3 }}
                    >
                      {roleOpts.map((opt) => (
                        <MenuItem value={opt.value} key={opt.value}>
                          {opt.text}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  )}
                </Grid>
              </Grid>

              <Grid container spacing={2} mt={{ xs: 1, md: 2 }}>
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
