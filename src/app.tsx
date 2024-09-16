import 'src/global.css';

import { Router } from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import { ThemeProvider } from 'src/theme/theme-provider';

import { SnackbarProvider } from 'notistack';

import { AuthProvider } from './contexts/auth-context';
// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <AuthProvider>
      <ThemeProvider>
        <SnackbarProvider maxSnack={3} disableWindowBlurListener>
          <Router />
        </SnackbarProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
