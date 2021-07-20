export const isJsonContentType = (headers) => {
  return headers.get('content-type')?.trim()?.startsWith('application/json');
}
