export const isAbsoluteUrl = (url: any) => {
  return new RegExp(`(^|:)//`).test(url);
};
