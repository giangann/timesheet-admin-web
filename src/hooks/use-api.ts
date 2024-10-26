import { useCallback } from 'react';
import { getApi, getFileApi, postApi, postFormDataApi } from '../services/api';
import { UnknownObj } from 'src/types/common';
import { useAuth } from './use-auth';

export const useApi = () => {
  const { token } = useAuth();

  const get = useCallback(
    async (endpoint: string, params?: UnknownObj) => {
      const customHeader = new Headers();
      customHeader.append('Authorization', `Bearer ${token}`);

      return getApi(endpoint, params, customHeader);
    },
    [token]
  );

  const post = useCallback(
    async (endpoint: string, body?: UnknownObj) => {
      const customHeader = new Headers();
      customHeader.append('Authorization', `Bearer ${token}`);

      return postApi(endpoint, body, customHeader);
    },
    [token]
  );

  const getFile = useCallback(
    async (endpoint: string) => {
      const customHeader = new Headers();
      customHeader.append('Authorization', `Bearer ${token}`);

      return getFileApi(endpoint, customHeader);
    },
    [token]
  );

  const postFormData = useCallback(
    async (endpoint: string, formData: FormData) => {
      const customHeader = new Headers();
      customHeader.append('Authorization', `Bearer ${token}`);

      return postFormDataApi(endpoint, formData, customHeader);
    },
    [token]
  );
  return { get, post, getFile, postFormData };
};
