export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface AxiosRequestConfig {
  url?: string;
  method?: Method;
  data?: any;
  params?: any;
  headers?: any;
  responseType?: XMLHttpRequestResponseType;
  timeout?: number,
  CancelToken?: CancelToken,
  withCredentials?: boolean;
  xsrfCookieName?: string,
  xsrfHeaderName?: string,
  onDownLoadProgress?: (e: ProgressEvent) => void;
  onUpLoadProgress?: (e: ProgressEvent) => void;
  auth?: BasicCredential,
  validateStatus?: (status: number) => boolean;
  paramsSerializer?: (params?: any) => string;
  baseURL?: string

  [key: string]: any,

  transformRequest?: AxiosTransformer | AxiosTransformer[],
  transformResponse?: AxiosTransformer | AxiosTransformer[]
}
//headers中间

export interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request: any;

}

export interface AxiosError {
  config: AxiosRequestConfig
  code?: string | null,
  request?: any,
  response?: AxiosResponse,
  isAxiosError: boolean
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {

}

export interface Axios {

  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>,
    response: AxiosInterceptorManager<AxiosResponse>
  }

  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>;

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;

  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;

  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;

  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;

  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;

  getURI(config?: AxiosRequestConfig): string;
}

export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>;

  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance;

  cancelToken: CancelTokenStatic;
  cancel: CancelStatic;
  isCancel: (val: any) => boolean;

  all<T>(promiseVec: Array<Promise<T> | T>): Promise<T[]>

  spread<T, R>(callBack: (...args: T[]) => R): (arr: T[]) => R

  Axios: AxiosClassStatic,


}

export interface AxiosClassStatic {
  new (config: AxiosRequestConfig): Axios
}

export interface AxiosInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number;

  eject(id: number): void;
}

export interface ResolvedFn<T> {
  (val: T): Promise<T> | T;
}

export interface RejectedFn {
  (err: any): any;
}

export interface AxiosTransformer {
  (data: any, headers?: any): any;
}

export interface CancelToken {
  promise: Promise<Cancel>;
  reason?: Cancel;

  ifThrowRequest(): void;
}

export interface Canceler {
  (reason?: string): void;
}

export interface CancelExecutor {
  (cancal: Canceler): void;
}

export interface CancelTokenSource {
  token: CancelToken,
  cancel: Canceler
}

export interface CancelTokenStatic {

  new(cancel: CancelExecutor): CancelToken

  source(): CancelTokenSource


}

export interface Cancel{
  message?: string
}

export interface CancelStatic {
  new(message?: string): Cancel;
}

export interface BasicCredential {
  username: string;
  password: string;
}


