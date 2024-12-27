import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useGetTeamDetailFromTeamList, useUpdateTeam } from 'src/hooks/team';
import { DashboardContent } from 'src/layouts/dashboard';
import { TTeamUpdate, TTeamUpdateFields } from 'src/types/team';
import { hasNullishOrEmptyString, pickProperties } from 'src/utils';

// ----------------------------------------------------------------------

export function TeamDetailView() {
  const params = useParams();
  const teamId = useMemo(() => parseInt(params?.id ?? '0', 10), [params]);

  const { enqueueSnackbar } = useSnackbar();
  const { handleSubmit, register, formState, reset } = useForm<TTeamUpdateFields>();
  const { isLoading, teamDetail, onFetchTeamDetail } = useGetTeamDetailFromTeamList(teamId);
  const { onUpdateTeam } = useUpdateTeam();

  const onSave = useCallback(
    async (fields: TTeamUpdateFields) => {
      // validate
      const requiredValues = pickProperties(fields, ['name']);
      if (hasNullishOrEmptyString(requiredValues)) {
        enqueueSnackbar('Tên không được để trống', { variant: 'warning' });
        return;
      }

      // process data
      const data: TTeamUpdate = {
        name: fields.name ?? '',
        hotline: fields.hotline,
      };

      // call on
      await onUpdateTeam(teamId, data);

      // side effect
      onFetchTeamDetail();

      // reset
      reset();
    },
    [enqueueSnackbar, onUpdateTeam, onFetchTeamDetail, reset, teamId]
  );
  return (
    <DashboardContent>
      {isLoading && <Typography>...loading</Typography>}
      {!isLoading && !teamDetail && <Typography color="red">Không có thông tin!</Typography>}
      {!isLoading && teamDetail && (
        <>
          <Box display="flex" alignItems="center" mb={5}>
            <Typography variant="h4" flexGrow={1}>
              {teamDetail.name}
            </Typography>
          </Box>
          <Card>
            <Box p={{ xs: 2, sm: 4 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4} xl={3}>
                  <TextField
                    {...register('name')}
                    defaultValue={teamDetail.name}
                    required
                    label="Tên phòng ban"
                    placeholder="Nhập tên"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                <Grid item xs={12} md={4} xl={3}>
                  <TextField
                    {...register('hotline')}
                    defaultValue={teamDetail.hotline}
                    label="Hotline"
                    placeholder="Nhập hotline"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 3 }}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2} mt={{ xs: 1, md: 2 }}>
                <Grid item xs={12} md={4} xl={3}>
                  <LoadingButton
                    onClick={handleSubmit(onSave)}
                    disabled={!formState.isDirty}
                    loading={formState.isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    color="inherit"
                    variant="contained"
                  >
                    Lưu
                  </LoadingButton>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </>
      )}{' '}
    </DashboardContent>
  );
}
