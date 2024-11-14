import { Box, Typography } from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';

// ----------------------------------------------------------------------

export function UserDetailView() {
  const location = useLocation();
  const params = useParams();
  console.log(location.pathname, { params });
  console.log('id', params.id);
  return (
    <Box>
      <Typography>Hello world</Typography>
    </Box>
  );
}
