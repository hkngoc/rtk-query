export const isJsonContentType = (headers: any) => {
  return headers.get('content-type')?.trim()?.startsWith('application/json');
}
