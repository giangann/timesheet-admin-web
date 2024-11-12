import { useCallback, useEffect, useState } from 'react';
import { useApi } from '../use-api';
import { useSnackbar } from 'notistack';
import { DEFAULT_PAGI_PARAMS } from 'src/configs';
import { TGroupUser } from 'src/types/user';

export const useGroupUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<TGroupUser[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const { get } = useApi();

  const onFetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await get('/users', { ...DEFAULT_PAGI_PARAMS });
      if (response.statusCode === 200) {
        setUsers(response.data.users);
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
    onFetchUsers();
  }, [get, enqueueSnackbar, onFetchUsers]);

  return { users, isLoading, refetchUsers: onFetchUsers };
};
