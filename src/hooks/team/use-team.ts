import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { TGroupUser } from 'src/types/user';
import { useApi } from '../use-api';
import { TGroupTeam, TTeamCreate, TTeamUpdate } from 'src/types/team';
import { arrayObjectToMap } from 'src/utils';

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

export const useGetTeamDetailFromTeamList = (teamId: number) => {
  const { isLoading, teams, onFetchTeams } = useGroupTeams();

  const teamMap: Map<string, TGroupTeam> = useMemo(() => arrayObjectToMap(teams, 'id'), [teams]);
  const teamDetail = useMemo(() => teamMap.get(teamId.toString()), [teamMap, teamId]);

  return { isLoading, teamDetail, onFetchTeamDetail: onFetchTeams };
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

export const useUpdateTeam = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { post } = useApi();

  const onUpdateTeam = useCallback(
    async (teamId: number, data: TTeamUpdate) => {
      setIsLoading(true);
      try {
        const response = await post('/teams', { ...data, id: teamId });
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

  return { isLoading, onUpdateTeam };
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
