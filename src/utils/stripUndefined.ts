import { isPlainObject } from './isPlainObject';

export const stripUndefined = (obj: any) => {
  if (!isPlainObject(obj)) {
    return obj;
  }

  const copy = { ...obj };
  for (const [k, v] of Object.entries(copy)) {
    if (typeof v === 'undefined') delete copy[k]
  }

  return copy;
};

export default stripUndefined;
