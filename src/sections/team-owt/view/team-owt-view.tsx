import { useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { _posts } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { useDownloadExcelFile } from 'src/hooks/excel';
import { fParamsToQueryString } from 'src/utils';

export function TeamOutsideWkTime() {
  const [time, setTime] = useState<Dayjs>(dayjs());

  const params = useMemo(
    () => ({
      month: time.get('month') + 1,
      year: time.get('year'),
    }),
    [time]
  );

  const { onDownloadFile, isDownloading } = useDownloadExcelFile({
    endpoint: `/users/export-payment-for-user-overtime-working?${fParamsToQueryString(params)}`,
    fileName: `Ngoài giờ đơn vị T${params.month}/${params.year}.xlsx`,
  });

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
        Xuât file excel: Bảng ngoài giờ đơn vị theo tháng
        </Typography>
      </Box>

      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 5 }}>
        <DatePicker
          label="Chọn năm và tháng"
          views={['year', 'month']}
          value={time}
          defaultValue={time}
          onChange={(value) => setTime(value ?? dayjs())}
        />
      </Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 5 }}>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="material-symbols:download" />}
          onClick={onDownloadFile}
          disabled={isDownloading}
        >
          Tải về
        </Button>
      </Box>
    </DashboardContent>
  );
}
