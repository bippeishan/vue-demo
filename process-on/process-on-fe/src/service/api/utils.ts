import axios, { AxiosResponse } from 'axios';
import { UAPIOptions } from './type';

function FormatParams(params: any) {
  params = { ...params, _timestamp: Date.now() };

  return params;
}

function HandleResponse(response: AxiosResponse) {
  if (response && response.status === 200 && response.data) {
    return response.data;
  }
  // -1为http非200错误
  throw new Error('-1');
}

/**
 * @param params 实际使用参数
 * @param options { query: url查询参数 }
 */
export async function uPost(params: any, options?: UAPIOptions) {
  // eslint-disable-next-line object-curly-newline
  const { timeout = 60000, url = '/api', axiosConfig, isHandleErrorCatch = true } = options || ({} as UAPIOptions);
  params = FormatParams(params);
  const { Action = '', ...otherParams } = params;

  const body = Object.keys(otherParams)
    .map((key) => {
      if (otherParams[key] !== undefined) {
        return `${encodeURIComponent(key)}=${encodeURIComponent(otherParams[key])}`;
      }
      return undefined;
    })
    .join('&');

  let response = null;
  try {
    response = await axios.post(`${url}/${Action}`, body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        ...axiosConfig?.headers,
      },
      timeout,
      withCredentials: false,
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

export async function uGet(params: any, options?: UAPIOptions) {
  params = FormatParams(params);
  const { url = '/api', isHandleErrorCatch = true } = options || ({} as UAPIOptions);
  params = FormatParams(params);
  const { Action = '', ...otherParams } = params;

  let response = null;
  try {
    response = await axios.get(`${url}/${Action}`, { params: otherParams });
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
  const { url = '/api', isHandleErrorCatch = true } = options || ({} as UAPIOptions);
  params = FormatParams(params);
  const { Action = '', ...otherParams } = params;

  let response = null;
  try {
    response = await axios.put(`${url}/${Action}`, otherParams, { withCredentials: true });
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
