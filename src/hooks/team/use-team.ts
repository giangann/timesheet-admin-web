import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { TGroupUser } from 'src/types/user';
import { useApi } from '../use-api';

export const useGroupTeams = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [teams, setTeams] = useState<TGroupUser[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const { get } = useApi();

  const onFetchTeams = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await get('/teams');
      if (response.statusCode === 200) {
        setTeams(response.data.teams);
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
    onFetchTeams();
  }, [get, enqueueSnackbar, onFetchTeams]);

  return { teams, isLoading, onFetchTeams };
};

