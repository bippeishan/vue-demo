import { AxiosRequestConfig } from 'axios';

export interface UAPIPath {
  sso: {
    login: string;
    activeSystem: string;
  };
}

export interface UAPIOptions {
  path?: UAPIPath;
  url?: string;
  timeout?: number; // 超时默认时间 60000
  query?: any; // url查询对象
  params?: any; // url查询对象
  axiosConfig?: AxiosRequestConfig;
  handleError?: () => void; // 提供自定义error 异常抛出
  handleResponse?: () => void; // 提供自定义response处理
  isHandleErrorCatch?: boolean; // 是否catch请求过程错误
  responseBody?: {
    Limit?: 'Limit';
    Offset?: 'Offset';
    Keyword?: 'Keyword';
    TotalCount?: 'TotalCount';
    FormatListResponse?: (resp: any) => Array<any>;
  }; // 用于uFetchAll，formatListResponse
}
