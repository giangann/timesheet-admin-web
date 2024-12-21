import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { TeamView } from 'src/sections/team/view';


// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Phòng ban - ${CONFIG.appName}`}</title>
      </Helmet>

      <TeamView />
    </>
  );
}
