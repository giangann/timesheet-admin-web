import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { TGroupUser } from 'src/types/user';
import { useApi } from '../use-api';
import { TGroupTeam, TTeamCreate } from 'src/types/team';

export const useGroupTeams = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [teams, setTeams] = useState<TGroupTeam[]>([]);
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

// write what?
// hook for create, update, delete team?
export const useCreateTeam = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { post } = useApi();

  const onCreateNewTeam = useCallback(
    async (data: TTeamCreate) => {
      setIsLoading(true);
      try {
        const response = await post('/teams', data);
        if (response.statusCode === 200) {
          enqueueSnackbar('Tạo mới thành công', { variant: 'success' });
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

  return { isLoading, onCreateNewTeam };
};

export const useDeleteTeam = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { remove } = useApi();

  const deleteTeamById = useCallback(
    async (id: number) => {
      setIsLoading(true);
      try {
        const response = await remove('/teams', { id });
        if (response.statusCode === 200) {
          enqueueSnackbar('Xóa thành công', { variant: 'success' });
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
    [remove, enqueueSnackbar, setIsLoading]
  );

  return { deleteTeamById, isLoading };
};
