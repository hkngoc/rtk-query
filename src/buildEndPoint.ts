import { reduce } from 'lodash';

export const buildEndPoint = (apis: any) => (build: any) => {
  return reduce(apis, (result, v, k) => {
    if (k) {
      if ((typeof v) == "function") {
        result[k] = build.query({
          query: v
        });
      } else if ((typeof v) == "object") {
        result[k] = build.query(v);
      }
    } else {
      if ((typeof v) == "function") {
        result = {
          ...build.query({
            query: v
          })
        }
      } else if ((typeof v) == "object") {
        result = {
          ...build.query(v)
        }
      }
    }

    return result;
  }, {});
};
