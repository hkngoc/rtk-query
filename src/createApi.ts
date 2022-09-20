import { last, pick } from 'lodash';
import createDispatchable from './createDispatchable';

export const createApi = (options: any) => {
  const { endpoints, baseQuery } = options;

  const endPointBuilder = {
    query: (opts: any) => {
      const {
        query,
        fetchFn,
        transformResponse,
      } = opts;

      return (...args: any[]) => {
        const lastArg = last(args);
        const arg = query(...args);

        return baseQuery({
          ...arg,
        }, { ...pick(lastArg, ["getState", "extra", "endpoint", "type"]), fetchFn, transformResponse });

      };
    }
  };

  const dispatcherBuilder = {
    query: (opts: any) => {
      const {
        query,
        fetchFn,
        transformResponse,
      } = opts;

      const fn = (...args: any[]) => {
        const lastArg = last(args);
        const arg = query(...args);

        return baseQuery({
          ...arg,
        }, { ...pick(lastArg, ["getState", "extra", "endpoint", "type"]), fetchFn, transformResponse });
      };

      return createDispatchable(fn);
    }
  };

  return {
    endpoints: endpoints(endPointBuilder),
    dispatcher: endpoints(dispatcherBuilder),
  }
};
