import { UnknownObj } from 'src/types/common';
import { getApi, postApi } from 'src/services/api';
import { useAuth } from './use-auth';

export const useApi = () => {
  const { token } = useAuth();

  const get = async (endpoint: string, params?: UnknownObj) => {
    const customHeader = new Headers();
    customHeader.append('Authorization', `Bearer ${token}`);

    const responseJson = await getApi(endpoint, params, customHeader);

    return responseJson;
  };

  const post = async (endpoint: string, body?: UnknownObj) => {
    const customHeader = new Headers();
    customHeader.append('Authorization', `Bearer ${token}`);

    const responseJson = await postApi(endpoint, body, customHeader);

    return responseJson;
  };

  return { get, post };
};
