import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { varAlpha } from 'src/theme/styles';
import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export const UserPage = lazy(() => import('src/pages/user'));
export const UserDetailPage = lazy(() => import('src/pages/user-detail'));
export const TeamOutsideWorkingTimePage = lazy(() => import('src/pages/team-owt'));
export const EmployeeOutsideWorkingTimePage = lazy(() => import('src/pages/emp-owt'));

export const TimesheetPage = lazy(() => import('src/pages/timesheet'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export function Router() {
  return useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={renderFallback}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <UserPage />, index: true },
        { path: 'ngoai-gio-don-vi', element: <TeamOutsideWorkingTimePage /> },
        { path: 'ngoai-gio-ca-nhan', element: <EmployeeOutsideWorkingTimePage /> },
        { path: 'bang-cham-cong', element: <TimesheetPage /> },
        { path: 'nhan-vien/:id', element: <UserDetailPage /> },

      ],
    },
    {
      path: 'sign-in',
      element: (
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      ),
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
