import 'src/global.css';

import { Router } from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import { ThemeProvider } from 'src/theme/theme-provider';

import { SnackbarProvider } from 'notistack';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <SnackbarProvider maxSnack={3} disableWindowBlurListener>
        <Router />
      </SnackbarProvider>
    </ThemeProvider>
  );
}
