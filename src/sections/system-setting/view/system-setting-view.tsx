import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, TextField, Typography } from '@mui/material';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateSystemSetting } from 'src/hooks/system-setting';
import { DashboardContent } from 'src/layouts/dashboard';
import { TSystemSettingUpdate } from 'src/types/system-setting';

const MOCK_BASE_SALARY = 2340000;

export function SystemSettingView() {
  const { register, handleSubmit, formState } = useForm<TSystemSettingUpdate>();
  const { onUpdateSystemSetting } = useUpdateSystemSetting();

  const onSave = useCallback(
    async (fieldValues: TSystemSettingUpdate) => {
      console.log({ fieldValues });
      await onUpdateSystemSetting(fieldValues);
    },
    [onUpdateSystemSetting]
  );
  return (
    <DashboardContent>
      <>
        <Box display="flex" alignItems="center" mb={5}>
          <Typography variant="h4" flexGrow={1}>
            Cài đặt mức lương cơ bản
          </Typography>
        </Box>
        <Card>
          <Box p={{ xs: 2, sm: 4 }}>
            <Grid container>
              <Grid item xs={12} md={4} xl={3}>
                <TextField
                  {...register('baseSalary')}
                  defaultValue={MOCK_BASE_SALARY}
                  type="number"
                  label="Mức lương cơ bản"
                  placeholder="Nhập mức lương cơ bản"
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
    </DashboardContent>
  );
}
