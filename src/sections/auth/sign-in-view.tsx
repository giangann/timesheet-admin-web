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

// ----------------------------------------------------------------------

export function SignInView() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleSignIn = useCallback(async () => {
    try {
      const url = 'https://proven-incredibly-redbird.ngrok-free.app/api/v1/auth/login';
      const credentials = { identifyCard: '0123456789', password: '!Daxuti01011970' };

      const signInRes = await postApi(url, credentials);
      console.log('signInRes', signInRes);

      router.push('/');
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  }, [router, enqueueSnackbar]);

  const renderForm = (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      <TextField
        fullWidth
        name="identifyCard"
        label="Số CCCD"
        placeholder="Nhập số CCCD"
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 3 }}
      />

      <TextField
        fullWidth
        name="password"
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
        onClick={handleSignIn}
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
