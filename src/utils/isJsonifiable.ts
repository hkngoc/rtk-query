import { isPlainObject } from './isPlainObject';

export const isJsonifiable = (body: any) => {
  return typeof body === 'object' && (isPlainObject(body) || Array.isArray(body) || typeof body.toJSON === 'function');
};
