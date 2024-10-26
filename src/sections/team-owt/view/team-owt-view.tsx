import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useApi } from 'src/hooks/use-api';

export function TeamOutsideWkTime() {
  const { get } = useApi();
  useEffect(() => {
    async function fetchGroupUsers() {
      try {
        const response = await get('/users');
        console.log(response);
      } catch (error: any) {
        console.log('error: ', error);
      }
    }

    fetchGroupUsers();
  }, [get]);
  return (
    <Box>
      <Typography>Time out out working time</Typography>
    </Box>
  );
}
