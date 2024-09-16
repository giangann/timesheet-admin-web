import { useCallback, useState } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import { useSnackbar } from 'notistack';
import { Iconify } from 'src/components/iconify';
import { postApi } from 'src/services/api';

import { useForm } from 'react-hook-form';
import { TCredentials } from 'src/types/auth';
// ----------------------------------------------------------------------

export function SignInView() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { handleSubmit, register } = useForm<TCredentials>();

  const handleSignIn = useCallback(
    async (values: TCredentials) => {
      try {
        const signInRes = await postApi('/auth/login', values);

        if (signInRes.statusCode === 200) {
          enqueueSnackbar('Đăng nhập thành công', { variant: 'success' });
          router.push('/');
        } else {
          enqueueSnackbar(signInRes.error, { variant: 'error' });
        }
      } catch (error: any) {
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    },
    [router, enqueueSnackbar]
  );

  const renderForm = (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      <TextField
        {...register('identifyCard')}
        fullWidth
        label="Số CCCD"
        placeholder="Nhập số CCCD"
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 3 }}
      />

      <TextField
        fullWidth
        {...register('password')}
        label="Mật khẩu"
        placeholder="Nhập mật khẩu"
        InputLabelProps={{ shrink: true }}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        onClick={handleSubmit(handleSignIn)}
      >
        Đăng nhập
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Đăng nhập</Typography>
      </Box>

      {renderForm}
    </>
  );
}
