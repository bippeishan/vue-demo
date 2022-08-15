import queryString from 'querystring';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { UAPIOptions } from './type';

function FormatParams(params: any) {
  params = { ...params, _timestamp: Date.now() };

  return params;
}

function HandleResponse(response: AxiosResponse) {
  if (response && response.status === 200 && response.data) {
    const retCode = response.data.RetCode;
    if (retCode !== 0) {
      throw new Error(retCode);
    } else {
      return response.data;
    }
  } else {
    // -1为http非200错误
    throw new Error('-1');
  }
}

/**
 * @param params 实际使用参数
 * @param options { query: url查询参数 }
 */
export async function uPost(params: any, options?: UAPIOptions) {
  // eslint-disable-next-line object-curly-newline
  const { timeout = 60000, url = '', axiosConfig, isHandleErrorCatch = true } = options || ({} as UAPIOptions);
  params = FormatParams(params);

  const body = Object.keys(params)
    .map((key) => {
      if (params[key] !== undefined) {
        return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
      }
      return undefined;
    })
    .join('&');

  let response = null;
  try {
    response = await axios.post(url, body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        ...axiosConfig?.headers,
      },
      timeout,
      withCredentials: true,
      ...axiosConfig,
    });
  } catch (err: any) {
    if (isHandleErrorCatch) {
      // -2 为网络超时错误
      throw new Error('-2');
    } else {
      return HandleResponse(err?.response);
    }
  }

  return HandleResponse(response);
}

export async function uFetchAll(params: any, options?: UAPIOptions, service?: (param: any, option?: UAPIOptions) => Promise<any>) {
  let List: Array<any> = [];
  const Limit = params?.Limit || 100;
  let PageIndex = 0;
  let Count = (PageIndex + 1) * Limit; // 当前总数据量

  const uService = service || uPost;

  const {
    responseBody = {
      Limit: 'Limit',
      Offset: 'Offset',
      TotalCount: 'TotalCount',
      FormatListResponse: (resp: any) => resp?.Infos as Array<any>,
    },
  } = options || ({} as UAPIOptions);

  const getParams = (index: number) => ({
    Offset: index * Limit,
    Limit,
    ...params,
  });

  const func = async (param: any) => {
    const resp = await uService(param, options);
    List = List.concat(responseBody.FormatListResponse?.(resp));
    if (resp[`${responseBody.TotalCount}`] > Count) {
      PageIndex += 1;
      Count = (PageIndex + 1) * Limit;
      await func(getParams(PageIndex));
    }
  };

  await func(getParams(PageIndex));

  return List;
}

/**
 * 通用axios方法
 * @param config: AxiosRequestConfig
 * @param options
 */
export async function uSend(config: AxiosRequestConfig, options?: UAPIOptions) {
  // eslint-disable-next-line object-curly-newline
  const { timeout = 60000, url = '', query, isHandleErrorCatch = true } = options || ({} as UAPIOptions);

  const baseConfig = {
    url,
    params: query,
    withCredentials: config?.withCredentials !== false,
    timeout,
    ...config,
  };

  let response = null;
  try {
    response = await axios(baseConfig);
  } catch (err: any) {
    if (isHandleErrorCatch) {
      // -2 为网络超时错误
      throw new Error('-2');
    } else {
      return HandleResponse(err?.response);
    }
  }

  return HandleResponse(response);
}

export async function uPut(params: any, options?: UAPIOptions) {
  params = FormatParams(params);
  const { axiosConfig } = options || ({} as UAPIOptions);
  const config: AxiosRequestConfig = {
    ...axiosConfig,
    method: 'put',
    data: params,
  };

  return uSend(config, options);
}

export async function uPatch(params: any, options?: UAPIOptions) {
  params = FormatParams(params);
  const { axiosConfig } = options || ({} as UAPIOptions);
  const config: AxiosRequestConfig = {
    ...axiosConfig,
    method: 'patch',
    data: params,
    headers: {
      'content-type': 'application/merge-patch+json',
      ...axiosConfig?.headers,
    },
  };

  return uSend(config, options);
}

export async function uPostByJSON(params: any, options?: UAPIOptions) {
  params = FormatParams(params);
  const { axiosConfig } = options || ({} as UAPIOptions);
  const config: AxiosRequestConfig = {
    ...axiosConfig,
    method: 'post',
    data: params,
  };

  return uSend(config, options);
}

export async function uPostByParams(params: any, options?: UAPIOptions) {
  params = FormatParams(params);
  const { axiosConfig, query } = options || ({} as UAPIOptions);
  const config: AxiosRequestConfig = {
    ...axiosConfig,
    method: 'post',
    params: { ...params, ...query },
  };

  return uSend(config, options);
}

export async function uPostByForm(params: any, options?: UAPIOptions) {
  params = FormatParams(params);
  const { axiosConfig } = options || ({} as UAPIOptions);
  const config: AxiosRequestConfig = {
    ...axiosConfig,
    method: 'post',
    data: queryString.stringify(params),
    headers: {
      ...axiosConfig?.headers,
      'content-type': 'application/x-www-form-urlencoded',
    },
  };

  return uSend(config, options);
}

export async function uPostByFormData(params: any, options?: UAPIOptions) {
  params = FormatParams(params);
  const { axiosConfig } = options || ({} as UAPIOptions);
  const formData = new FormData();
  Object.keys(params).forEach((key) => {
    formData.append(key, params[key]);
  });
  const config: AxiosRequestConfig = {
    ...axiosConfig,
    method: 'post',
    data: formData,
  };

  return uSend(config, options);
}

export async function uGet(params: any, options?: UAPIOptions) {
  params = FormatParams(params);
  const { axiosConfig, query } = options || ({} as UAPIOptions);
  const config: AxiosRequestConfig = {
    ...axiosConfig,
    method: 'get',
    params: { ...params, ...query },
  };

  return uSend(config, options);
}

export async function uDelete(options?: UAPIOptions) {
  const { axiosConfig } = options || ({} as UAPIOptions);
  const config: AxiosRequestConfig = {
    ...axiosConfig,
    method: 'delete',
  };

  return uSend(config, options);
}
