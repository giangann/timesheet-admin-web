import { _bearerToken } from 'src/_mock';
import { UnknownObj } from 'src/types/common';

export const getApi = async (url: string, params?: UnknownObj) => {
  const reqHeader = new Headers();
  reqHeader.append('Authorization', `Bearer ${_bearerToken}`);

  const response = await fetch(url, { method: 'GET', headers: reqHeader });

  const responseJson = await response.json();

  return responseJson;
};

export const postApi = async (url: string, body?: UnknownObj) => {
  // ini request header
  const reqHeader = new Headers();
  reqHeader.append('Authorization', `Bearer ${_bearerToken}`);
  reqHeader.append('Content-Type', 'application/json');

  // create fetch request
  const response = await fetch(url, {
    method: 'POST',
    headers: reqHeader,
    body: JSON.stringify(body),
  });

  // read response
  const responseJson = await response.json();

  return responseJson;
};
