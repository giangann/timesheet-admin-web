import { useCallback } from 'react';
import { getApi, postApi } from '../services/api';
import { UnknownObj } from 'src/types/common';
import { useAuth } from './use-auth';

export const useApi = () => {
  const { token } = useAuth();

  const get = useCallback(async (endpoint: string, params?: UnknownObj) => {
    const customHeader = new Headers();
    customHeader.append('Authorization', `Bearer ${token}`);

    return getApi(endpoint, params, customHeader);
  }, [token]);

  const post = useCallback(async (endpoint: string, body?: UnknownObj) => {
    const customHeader = new Headers();
    customHeader.append('Authorization', `Bearer ${token}`);

    return postApi(endpoint, body, customHeader);
  }, [token]);

  return { get, post };
};