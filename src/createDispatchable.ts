export const createDispatchable = (fn: any) => {
  return (...args: any[]) => async (dispatch: any, getState: any) => {

    return await fn.apply(null, [...args, { getState }]);
  };
}

export default createDispatchable;
