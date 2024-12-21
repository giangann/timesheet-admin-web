import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { TeamDetailView } from 'src/sections/team/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Chi tiết phòng ban - ${CONFIG.appName}`}</title>
      </Helmet>

      <TeamDetailView />
    </>
  );
}
