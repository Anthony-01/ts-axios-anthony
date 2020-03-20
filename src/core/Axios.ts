import {
  AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse, Method, RejectedFn,
  ResolvedFn
} from "../types/index";
import dispatchRequest, {transformURL} from './dispatchRequest'
import {Interceptor, default as InterceptorManager} from "./InterceptorManager";
import mergeConfig from "./mergeConfig";


export interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>;
  response: InterceptorManager<AxiosResponse>
}
interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise);
  rejected?: RejectedFn;
}


export default class Axios {

  public interceptors: Interceptors;

  public defaults: AxiosRequestConfig;

  constructor(config: AxiosRequestConfig) {
    this.defaults = config;
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }

  request(url: any, config?: any): AxiosPromise {
    if (typeof url === "string") {
      if (!config) {
        config = {};
        config.url = url;
      }
    } else {
      config = url;
    }

    config = mergeConfig(this.defaults, config);


    const chain: PromiseChain<any>[] = [{
      resolved: dispatchRequest,
      rejected: undefined
    }];

    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor);
    });
    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor);
    });

    let promise = Promise.resolve(config);
    while(chain.length > 0) {
      const { resolved, rejected } = chain.shift()!;
      promise = promise.then(resolved, rejected);
    }
    return promise;
  }

  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithoutData('get', url, config);
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithoutData('delete', url, config);
  }

  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithoutData('head', url, config);
  }

  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithoutData('options', url, config);
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithData('post', data,  url, config);
  }

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithData('put', data,  url, config);
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithData('patch', data,  url, config);
  }

  _requestWithoutData(method: Method, url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.request(Object.assign(config || {}, {
      method,
      url
    }))
  }

  _requestWithData(method: Method, url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this.request(Object.assign(config || {}, {
      method,
      url,
      data
    }))
  }

  getURI(config?: AxiosRequestConfig) {
    config = mergeConfig(this.defaults, config);
    return transformURL(config);
  }
}
