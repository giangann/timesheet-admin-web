import { useSnackbar } from 'notistack';
import { useCallback, useState } from 'react';
import { useApi } from '../use-api';
import { TSystemSettingUpdate } from 'src/types/system-setting';

export function useUpdateSystemSetting() {
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { post } = useApi();

  const onUpdateSystemSetting = useCallback(
    async (data: TSystemSettingUpdate) => {
      setIsLoading(true);
      try {
        const response = await post('/<sys_setting_endpoint>', { ...data });
        if (response.statusCode === 200) {
          enqueueSnackbar('Cập nhật thành công', { variant: 'success' });
        } else {
          enqueueSnackbar(response.error ?? response.message ?? 'Unknown error', {
            variant: 'error',
          });
        }
      } catch (error: any) {
        enqueueSnackbar(error.message ?? 'Unknown error', { variant: 'error' });
      } finally {
        setIsLoading(false);
      }
    },
    [enqueueSnackbar, setIsLoading, post]
  );

  return { isLoading, onUpdateSystemSetting };
}
