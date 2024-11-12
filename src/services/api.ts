import { ENVIROMENTS } from 'src/configs';
import { UnknownObj } from 'src/types/common';
import { fParamsToQueryString } from 'src/utils';

const apiDomain: string = ENVIROMENTS.API_DOMAIN;
const apiPrefix: string = ENVIROMENTS.API_PREFIX;
const baseUrl = `${apiDomain}${apiPrefix}`;

export const getApi = async (endpoint: string, params?: UnknownObj, customHeader?: Headers) => {
  const reqHeader = new Headers();
  reqHeader.append('Content-Type', 'application/json');
  reqHeader.append('ngrok-skip-browser-warning', '69420');

  // Append custom headers if provided
  if (customHeader) {
    customHeader.forEach((value, key) => reqHeader.append(key, value));
  }

  const queryString = fParamsToQueryString(params);
  const url = `${baseUrl}${endpoint}${queryString}`;

  const response = await fetch(url, { method: 'GET', headers: reqHeader });
  const responseJson = await response.json();

  return responseJson;
};

export const postApi = async (endpoint: string, body?: UnknownObj, customHeader?: Headers) => {
  const reqHeader = new Headers();
  reqHeader.append('Content-Type', 'application/json');

  // Append custom headers if provided
  if (customHeader) {
    customHeader.forEach((value, key) => reqHeader.append(key, value));
  }

  const url = `${baseUrl}${endpoint}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: reqHeader,
    body: JSON.stringify(body),
  });

  const responseJson = await response.json();

  return responseJson;
};

export const deleteApi = async (endpoint: string, params?: UnknownObj, customHeader?: Headers) => {
  const reqHeader = new Headers();
  reqHeader.append('Content-Type', 'application/json');

  // Append custom headers if provided
  if (customHeader) {
    customHeader.forEach((value, key) => reqHeader.append(key, value));
  }

  const queryString = fParamsToQueryString(params);
  const url = `${baseUrl}${endpoint}${queryString}`;

  const response = await fetch(url, { method: 'DELETE', headers: reqHeader });
  const responseJson = await response.json();

  return responseJson;
};

export const getFileApi = async (endpoint: string, customHeader?: Headers) => {
  const reqHeader = new Headers();
  reqHeader.append('ngrok-skip-browser-warning', '69420');

  // Append custom headers if provided
  if (customHeader) {
    customHeader.forEach((value, key) => reqHeader.append(key, value));
  }

  const url = `${baseUrl}${endpoint}`;

  const response = await fetch(url, { method: 'GET', headers: reqHeader });

  return response;
};


export const postFormDataApi = async (endpoint: string, formData: FormData, customHeader?: Headers) => {
  const reqHeader = new Headers();
  // reqHeader.append('Content-Type', 'multipart/form-data');

  // Append custom headers if provided
  if (customHeader) {
    customHeader.forEach((value, key) => reqHeader.append(key, value));
  }

  const url = `${baseUrl}${endpoint}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: reqHeader,
    body: formData,
  });

  const responseJson = await response.json();

  return responseJson;
};