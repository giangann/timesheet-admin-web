import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { TimesheetView } from 'src/sections/timesheet/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Bảng chấm công - ${CONFIG.appName}`}</title>
      </Helmet>

      <TimesheetView />
    </>
  );
}
