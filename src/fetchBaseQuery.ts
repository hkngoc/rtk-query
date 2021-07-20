import {
  isJsonContentType,
  isJsonifiable,
  joinUrls,
  stripUndefined,
} from './utils';

// @ts-ignore
const defaultFetchFn = (...args) => fetch(...args);

const defaultValidateStatus = (response) => {
  return response.status >= 200 && response.status <= 299;
};

const handleResponse = async (response, responseHandler) => {
  if (typeof responseHandler === 'function') {
    return responseHandler(response);
  }

  if (responseHandler === 'text') {
    return response.text();
  }

  if (responseHandler === 'json') {
    const text = await response.text();
    return text.length ? JSON.parse(text) : undefined;
  }
};

export const fetchBaseQuery = ({
  baseUrl,
  prepareHeaders = (x) => x,
  fetchFn = defaultFetchFn,
  ...baseFetchOptions
}) => {
  if (typeof fetch === 'undefined' && fetchFn === defaultFetchFn) {
    console.warn(
      'Warning: `fetch` is not available. Please supply a custom `fetchFn` property to use `fetchBaseQuery` on SSR environments.'
    )
  }

  return async (arg, {
    getState,
    transformResponse = (r) => r,
  }) => {
    let meta = {};
    let {
      url,
      method = "GET",
      headers = new Headers({}),
      body = undefined,
      params = undefined,
      responseHandler = "json",
      validateStatus = defaultValidateStatus,
      ...rest
    } = typeof arg == "string" ? { url: arg } : arg;

    const config = {
      ...baseFetchOptions,
      method,
      body,
      ...rest,
    };

    // @ts-ignore
    config.headers = await prepareHeaders(new Headers(stripUndefined(headers)), { getState });

    if (!config.headers.has('content-type') && isJsonifiable(body)) {
      config.headers.set("content-type", "application/json");
    }

    if (body && isJsonContentType(config.headers)) {
      config.body = JSON.stringify(body)
    }

    if (params) {
      const divider = ~url.indexOf('?') ? '&' : '?'
      const query = new URLSearchParams(stripUndefined(params));
      if (query) {
        url += divider + query
      }
    }

    url = joinUrls(baseUrl, url);
    const request = new Request(url, config);
    const requestClone = request.clone()
    // meta = { request: requestClone }

    let response;
    try {
      response = await fetchFn(request)
    } catch (e) {
      return {
        error: {
          status: 'FETCH_ERROR',
          error: String(e)
        },
        // meta
      }
    }
    const responseClone = response.clone();

    // meta.response = responseClone;

    let resultData;
    try {
      resultData = await handleResponse(response, responseHandler)
    } catch (e) {
      return {
        error: {
          status: 'PARSING_ERROR',
          originalStatus: response.status,
          data: await responseClone.clone().text(),
          error: String(e),
        },
        meta,
      }
    }

    let transformed;
    try {
      transformed = await transformResponse(resultData);
    } catch (e) {
      return {
        error: {
          status: 'TRANSFORM_ERROR',
          originalStatus: response.status,
          data: await responseClone.clone().text(),
          error: String(e),
        },
        meta,
      }
    }

    return validateStatus(response, transformed)
      ? {
        data: transformed,
        meta,
      } : {
        error: {
          status: response.status,
          data: transformed,
        },
        meta,
      }
  };
};
