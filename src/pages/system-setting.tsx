import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { SystemSettingView } from 'src/sections/system-setting/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Cài đặt hệ thống - ${CONFIG.appName}`}</title>
      </Helmet>

      <SystemSettingView />
    </>
  );
}
