import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { TGroupRole } from 'src/types/role';
import { useApi } from '../use-api';

export const useGroupRoles = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [roles, setRoles] = useState<TGroupRole[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const { get } = useApi();

  const onFetchRoles = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await get('/roles');
      if (response.statusCode === 200) {
        setRoles(response.data.roles);
      } else {
        enqueueSnackbar(response.error ?? response.message ?? 'Unknown error', {
          variant: 'error',
        });
      }
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  }, [get, enqueueSnackbar]);

  useEffect(() => {
    onFetchRoles();
  }, [get, enqueueSnackbar, onFetchRoles]);

  return { roles, isLoading, onFetchRoles };
};
