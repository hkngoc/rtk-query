export const createDispatchable = (fn) => {
  return (...args) => async (dispatch, getState) => {

    return await fn.apply(null, [...args, { getState }]);
  };
}

export default createDispatchable;
