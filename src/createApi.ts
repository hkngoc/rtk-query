import { last, pick } from 'lodash';
import createDispatchable from './createDispatchable';

export const createApi = (options) => {
  const { endpoints, baseQuery } = options;

  const endPointBuilder = {
    query: (opts) => {
      const {
        query,  
        fetchFn,
        transformResponse,
      } = opts;

      return (...args) => {
        const lastArg = last(args, {});
        const arg = query(...args);

        return baseQuery({
          ...arg,
        }, { ...pick(lastArg, ["getState"]), fetchFn, transformResponse });

      };
    }
  };

  const dispatcherBuilder = {
    query: (opts) => {
      const {
        query,  
        fetchFn,
        transformResponse,
      } = opts;

      const fn = (...args) => {
        const lastArg = last(args, {});
        const arg = query(...args);

        return baseQuery({
          ...arg,
        }, { ...pick(lastArg, ["getState"]), fetchFn, transformResponse });
      };

      return createDispatchable(fn);
    }
  };

  return {
    endpoints: endpoints(endPointBuilder),
    dispatcher: endpoints(dispatcherBuilder),
  }
};
