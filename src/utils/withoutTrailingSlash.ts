export const withoutTrailingSlash = (url) => {
  return url.replace(/\/$/, '')
};
