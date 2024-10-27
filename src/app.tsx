import 'src/global.css';

import { Router } from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import { ThemeProvider } from 'src/theme/theme-provider';

import { SnackbarProvider } from 'notistack';

import { AuthProvider } from './contexts/auth-context';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import dayjs from 'dayjs';

import 'dayjs/locale/vi'; // Import Vietnamese locale


// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();
  dayjs.locale('vi');

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
      <AuthProvider>
        <ThemeProvider>
          <SnackbarProvider maxSnack={3} disableWindowBlurListener>
            <Router />
          </SnackbarProvider>
        </ThemeProvider>
      </AuthProvider>
    </LocalizationProvider>
  );
}
