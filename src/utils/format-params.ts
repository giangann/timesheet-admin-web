export function fParamsToQueryString(params: Record<string, unknown> | undefined): string {
  if (!params) return '';
  const queryString = Object.keys(params)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(String(params[key]))}`)
    .join('&');

  return queryString ? `?${queryString}` : '';
}
export function fParamsToQueryStringNoEncode(params: Record<string, unknown> | undefined): string {
  if (!params) return '';
  const queryString = Object.keys(params)
    .map((key) => `${key}=${String(params[key])}`)
    .join('&');

  return queryString ? `?${queryString}` : '';
}
