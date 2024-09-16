import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { TeamOutsideWkTime } from 'src/sections/team-owt/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Ngoài giờ đơn vị - ${CONFIG.appName}`}</title>
      </Helmet>

      <TeamOutsideWkTime />
    </>
  );
}
