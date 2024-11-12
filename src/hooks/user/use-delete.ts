import { useSnackbar } from 'notistack';
import { useCallback, useState } from 'react';
import { useApi } from '../use-api';

export const useDeleteUser = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { remove } = useApi();

  const deleteUserById = useCallback(
    async (userId:number) => {
      setIsSubmitting(true);
      try {
        const response = await remove('/users', { id: userId });
        if (response.statusCode === 200) {
          enqueueSnackbar('Xóa thành công', { variant: 'success' });
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
    [enqueueSnackbar, remove]
  );

  return { deleteUserById, isSubmitting };
};
