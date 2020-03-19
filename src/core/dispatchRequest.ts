import {AxiosRequestConfig, AxiosPromise, AxiosResponse} from "../types/index";
import {xhr} from "./xhr";

import {buildURL, combineURL, isAbsoluteURL} from "../helpers/url";
// import {transformRequestData, transformResponse} from "../helpers/data";
// import {processHeader} from "../helpers/header";
import {flattenHeaders} from "../helpers/util";
import {transform} from "./transform";


export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config);
  ifThrowRequested(config);
  return xhr(config).then(res => {

    return transformResponseData(res);
  });
}



function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config);
  // config.headers = transformRequestHeader(config);
  // config.data = transformRequestBody(config.data);
  config.data = transform(config.data, config.header, config.transformRequest);
  config.headers = flattenHeaders(config.headers, config.method!);
}

export function transformURL(config: AxiosRequestConfig): string {
  let {url, params, paramsSerializer, baseURL} = config;
  if (baseURL && !isAbsoluteURL(url!)) {
    url = combineURL(baseURL, url);
  }
  return buildURL(url!, params, paramsSerializer);
}

// function transformRequestBody(config: AxiosRequestConfig): any {
//   return transformRequestData(config.data);
// }

// function transformRequestHeader(config: AxiosRequestConfig): any {
//   let {headers = {}, data} = config;
//   return processHeader(headers, data);
// }

function transformResponseData(res: AxiosResponse): AxiosPromise {
  res.data = transform(res.data, res.headers, res.config.transformResponse);
  return Promise.resolve(res);
}

function ifThrowRequested(config: AxiosRequestConfig) {
  if (config.CancelToken) {
    config.CancelToken.ifThrowRequest();
  }
}


