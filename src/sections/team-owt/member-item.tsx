import { Box, Typography } from '@mui/material';

export type MemberItemProps = {
  id: number;
  name: string;
  roleName: string;
  roleCode: string;
  phoneNumber: string;
  address: string;
  email: string;
};
export function MemberItem() {
  return (
    <Box>
      <Typography>MemberItem</Typography>
    </Box>
  );
}
