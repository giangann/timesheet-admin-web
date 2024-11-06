import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { EmployeeOutsideWkTime } from 'src/sections/emp-owt/view';


// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Ngoài giờ cá nhân - ${CONFIG.appName}`}</title>
      </Helmet>

      <EmployeeOutsideWkTime />
    </>
  );
}
