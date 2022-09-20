export const createDispatchable = (fn: any) => {
  return (...args: any[]) => async (dispatch: any, getState: any, extra: any) => {

    return await fn.apply(null, [...args, { getState, extra }]);
  };
}

export default createDispatchable;
