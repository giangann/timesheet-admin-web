import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { Box, Card, Grid, TextField, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { useSnackbar } from 'notistack';
import { useCallback, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useBaseSalaryDetail, useUpdateBaseSalary } from 'src/hooks/system-setting';
import { DashboardContent } from 'src/layouts/dashboard';
import { TBaseSalaryUpdate, TBaseSalaryUpdateFormFields } from 'src/types/system-setting';
import { fDate, formatStr, hasNullishOrEmptyString } from 'src/utils';
import { dirtyValues } from 'src/utils/format-field-values';

export function BaseSalaryDetailView() {
  const params = useParams();
  const baseSalaryId = useMemo(() => parseInt(params?.id ?? '0', 10), [params]);

  const { enqueueSnackbar } = useSnackbar();
  const { register, handleSubmit, formState, control } = useForm<TBaseSalaryUpdateFormFields>();
  const { onUpdateBaseSalary } = useUpdateBaseSalary();
  const {
    baseSalaryDetail,
    isLoading,
    onFetchBaseSalaryDetail: refetch,
  } = useBaseSalaryDetail(baseSalaryId);

  const onSave = useCallback(
    async (fieldValues: TBaseSalaryUpdateFormFields) => {
      // get dirty values
      const data: TBaseSalaryUpdate = dirtyValues(formState.dirtyFields, fieldValues);

      // validate date
      if (data.effectiveDate) {
        data.effectiveDate = fDate(data.effectiveDate, formatStr.paramCase.date) ?? '';
      }

      // check required fields
      if (hasNullishOrEmptyString(data)) {
        enqueueSnackbar('Hãy điền đủ thông tin yêu cầu', { variant: 'warning' });
        return;
      }

      // make api call
      await onUpdateBaseSalary(baseSalaryId, data);

      // side effect
      refetch();
    },
    [onUpdateBaseSalary, baseSalaryId, refetch, formState, enqueueSnackbar]
  );
  return (
    <DashboardContent>
      {isLoading && <Typography>...loading</Typography>}
      {!isLoading && !baseSalaryDetail && <Typography color="red">Không có thông tin!</Typography>}
      {!isLoading && baseSalaryDetail && (
        <>
          <Box display="flex" alignItems="center" mb={5}>
            <Typography variant="h4" flexGrow={1}>
              Mức lương cơ bản từ {fDate(new Date(baseSalaryDetail.effectiveDate), 'DD/MM/YYYY')}
            </Typography>
          </Box>
          <Card>
            <Box p={{ xs: 2, sm: 4 }}>
              <Grid container>
                <Grid item xs={12} md={4} xl={3}>
                  <Controller
                    name="effectiveDate"
                    control={control}
                    defaultValue={dayjs(baseSalaryDetail.effectiveDate)}
                    render={({ field }) => (
                      <DatePicker
                        label="Chọn ngày *" // required marked by *
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
                <Grid item xs={12} md={4} xl={3}>
                  <TextField
                    {...register('value')}
                    defaultValue={baseSalaryDetail?.value}
                    type="number"
                    required
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
      )}
    </DashboardContent>
  );
}
