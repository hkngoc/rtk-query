import { isPlainObject } from './isPlainObject';

export const isJsonifiable = (body) => {
  return typeof body === 'object' &&
    (isPlainObject(body) ||
      Array.isArray(body) ||
      typeof body.toJSON === 'function');
};
