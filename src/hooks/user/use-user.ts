import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { DEFAULT_PAGI_PARAMS } from 'src/configs';
import { TGroupUser, TGroupUserUpdate } from 'src/types/user';
import { arrayObjectToMap } from 'src/utils';
import { useApi } from '../use-api';

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
        // enqueueSnackbar(response.error ?? response.message ?? 'Unknown error', {
        //   variant: 'error',
        // });
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

export const useGetUserDetailFromUserList = (userId: number) => {
  const { isLoading, users, refetchUsers } = useGroupUsers();

  const userMap: Map<string, TGroupUser> = useMemo(() => arrayObjectToMap(users, 'id'), [users]);
  const userDetail = useMemo(() => userMap.get(userId.toString()), [userMap, userId]);

  return { isLoading, userDetail, onFetchUserDetail: refetchUsers };
};

export const useUserDetail = (userId: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userDetail, setUserDetail] = useState<TGroupUser>();

  const { get } = useApi();
  const { enqueueSnackbar } = useSnackbar();

  const onFetchUserDetail = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await get(`/users`, { id: userId });
      if (response.statusCode === 200) {
        // setUserDetail(response.data.user); // uncomment this when api ok
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
  }, [get, enqueueSnackbar, userId]);

  useEffect(() => {
    onFetchUserDetail();
  }, [onFetchUserDetail]);

  return { isLoading, userDetail, onFetchUserDetail };
};

export const useUserUpdate = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { put } = useApi();
  const { enqueueSnackbar } = useSnackbar();

  const onUpdateUser = useCallback(
    async (userId: number, newValues: TGroupUserUpdate) => {
      setIsSubmitting(true);
      try {
        const response = await put(`/users`, { id: userId }, newValues);
        if (response.statusCode === 200) {
          enqueueSnackbar('Cập nhật thành công', { variant: 'success' });
        } else {
          enqueueSnackbar(response.error ?? response.message ?? 'Unknown error', {
            variant: 'error',
          });
        }
      } catch (error: any) {
        enqueueSnackbar(error.message, { variant: 'error' });
      } finally {
        setIsSubmitting(false);
      }
    },
    [put, enqueueSnackbar]
  );

  return { onUpdateUser, isSubmitting };
};
