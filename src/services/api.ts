import { _bearerToken } from 'src/_mock';
import { ENVIROMENTS } from 'src/configs';
import { UnknownObj } from 'src/types/common';
import { fParamsToQueryString } from 'src/utils';

const apiDomain: string = ENVIROMENTS.API_DOMAIN;
const apiPrefix: string = ENVIROMENTS.API_PREFIX;
const baseUrl = `${apiDomain}${apiPrefix}`;

export const getApi = async (endpoint: string, params?: UnknownObj) => {
  const reqHeader = new Headers();
  reqHeader.append('Authorization', `Bearer ${_bearerToken}`);
  reqHeader.append('Content-Type', 'application/json');
  reqHeader.append('ngrok-skip-browser-warning', '69420');

  const queryString = fParamsToQueryString(params);
  const url = `${baseUrl}${endpoint}${queryString}`;

  const response = await fetch(url, { method: 'GET', headers: reqHeader });
  const responseJson = await response.json();

  return responseJson;
};

export const postApi = async (endpoint: string, body?: UnknownObj) => {
  // ini request header
  const reqHeader = new Headers();
  reqHeader.append('Authorization', `Bearer ${_bearerToken}`);
  reqHeader.append('Content-Type', 'application/json');

  const url = `${baseUrl}${endpoint}`;

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
