import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { BaseSalaryDetailView } from 'src/sections/system-setting/base-salary/view';


// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Chi tiết mức lương cơ bản - ${CONFIG.appName}`}</title>
      </Helmet>

      <BaseSalaryDetailView />
    </>
  );
}
