import { reduce } from 'lodash';

export const createEndpoins = (endpoints: any) => (build: any) => {
  return reduce(endpoints, (result, v, k) => {
    if (k) {
      result[k] = v(build);
    } else {
      result = {
        ...v(build)
      }
    }

    return result;
  }, {});
};
