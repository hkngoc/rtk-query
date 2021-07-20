import {isAbsoluteUrl } from './isAbsoluteUrl';
import { withoutLeadingSlash } from './withoutLeadingSlash';
import { withoutTrailingSlash } from './withoutTrailingSlash';

export const joinUrls = (base, url) => {
  if (!base) {
    return url;
  }

  if (!url) {
    return base;
  }

  if (isAbsoluteUrl(url)) {
    return url;
  }

  base = withoutTrailingSlash(base)
  url = withoutLeadingSlash(url)

  return `${base}/${url}`;
};
