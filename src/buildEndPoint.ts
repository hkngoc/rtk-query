import { reduce } from 'lodash';

export const buildEndPoint = (apis: any) => (build: any, endpoint: any) => {
  return reduce(apis, (result, v, k) => {
    if (k) {
      if ((typeof v) == "function") {
        result[k] = build.query({
          query: v,
          endpoint: endpoint || k,
        });
      } else if ((typeof v) == "object") {
        result[k] = build.query({ ...v, endpoint: endpoint || k });
      }
    } else {
      if ((typeof v) == "function") {
        result = {
          ...result,
          ...build.query({
            query: v,
            endpoint: endpoint || k,
          })
        }
      } else if ((typeof v) == "object") {
        result = {
          ...result,
          ...build.query({ ...v, endpoint: endpoint || k })
        }
      }
    }

    return result;
  }, {});
};
