import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { UserDetailView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Chi tiết nhân viên - ${CONFIG.appName}`}</title>
      </Helmet>

      <UserDetailView />
    </>
  );
}
