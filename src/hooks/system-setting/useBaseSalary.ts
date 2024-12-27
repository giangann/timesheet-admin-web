import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import {
  TBaseSalary,
  TBaseSalaryCreate,
  TBaseSalaryDetail,
  TBaseSalaryUpdate,
} from 'src/types/system-setting';
import { useApi } from '../use-api';

export function useBaseSalary() {
  const [isLoading, setIsLoading] = useState(false);
  const [baseSalaries, setBaseSalaries] = useState<TBaseSalary[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const { get } = useApi();

  const onFetchBaseSalaries = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await get('/base-salary');
      if (response.statusCode === 200) {
        setBaseSalaries(response.data.baseSalaries.content);
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
    onFetchBaseSalaries();
  }, [get, enqueueSnackbar, onFetchBaseSalaries]);

  return { baseSalaries, isLoading, onFetchBaseSalaries };
}

export const useBaseSalaryDetail = (baseSalaryId: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [baseSalaryDetail, setBaseSalaryDetail] = useState<TBaseSalaryDetail>();

  const { get } = useApi();
  const { enqueueSnackbar } = useSnackbar();

  const onFetchBaseSalaryDetail = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await get(`/base-salary/find-by-id`, { id: baseSalaryId });
      if (response.statusCode === 200) {
        setBaseSalaryDetail(response.data.baseSalary);
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
  }, [get, enqueueSnackbar, baseSalaryId]);

  useEffect(() => {
    onFetchBaseSalaryDetail();
  }, [onFetchBaseSalaryDetail]);

  return { isLoading, baseSalaryDetail, onFetchBaseSalaryDetail };
};

export function useCreateBaseSalary() {
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { post } = useApi();

  const onCreateNewBaseSalary = useCallback(
    async (data: TBaseSalaryCreate) => {
      setIsLoading(true);
      try {
        const response = await post('/base-salary', data);
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

  return { isLoading, onCreateNewBaseSalary };
}

export function useUpdateBaseSalary() {
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { put } = useApi();

  const onUpdateBaseSalary = useCallback(
    async (baseSalaryId: number, data: TBaseSalaryUpdate) => {
      setIsLoading(true);
      try {
        const response = await put('/base-salary', { id: baseSalaryId }, data);
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
    [enqueueSnackbar, setIsLoading, put]
  );

  return { isLoading, onUpdateBaseSalary };
}

export function useDeleteBaseSalary() {
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { remove } = useApi();

  const deleteBaseSalaryById = useCallback(
    async (id: number) => {
      setIsLoading(true);
      try {
        const response = await remove('/base-salary', { id });
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

  return { deleteBaseSalaryById, isLoading };
}
