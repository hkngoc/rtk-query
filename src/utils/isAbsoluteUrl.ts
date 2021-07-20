export const isAbsoluteUrl = (url) => {
  return new RegExp(`(^|:)//`).test(url);
};
