export const withoutTrailingSlash = (url: any) => {
  return url.replace(/\/$/, '')
};
