import {AxiosRequestConfig, AxiosResponse, AxiosPromise} from "../types/index";


import {parseHeader} from "../helpers/header";

import {createError} from "../helpers/error";
import {isUrlSameOrigin} from "../helpers/url";
import cookie from "../helpers/cookie";
import {isFormData} from "../helpers/util";

export function xhr(config: AxiosRequestConfig): AxiosPromise {
  let {data = null, url, method = "", headers, responseType, timeout, CancelToken, withCredentials,xsrfCookieName,
    xsrfHeaderName, onDownLoadProgress, onUpLoadProgress, auth, validateStatus} = config;

  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();

    xhr.open( method.toUpperCase(), url!, true);

    configureRequest();

    addEvent();

    processHeaders();

    processCancel();

    xhr.send( data );

    function handleResponse(res: AxiosResponse) {
      if (!validateStatus || validateStatus(res.status)) {
        resolve(res);
      } else {
        reject( createError(`Request failed with status code ${res.status}`, config, null, xhr, res));
      }
    }

    function configureRequest() {
      if (responseType) {
        xhr.responseType = responseType;
      }
      if (withCredentials) {
        xhr.withCredentials = withCredentials;
      }
      if (timeout) {
        xhr.timeout = timeout;
      }
    }

    function addEvent() {
      xhr.onreadystatechange = function handleLoad() {
        if (xhr.readyState !== 4) {
          reject(null);
          return;
        }
        let responseHeader = parseHeader(xhr.getAllResponseHeaders());
        let responseData = responseType === 'text' ? xhr.responseText : xhr.response;
        let obj: AxiosResponse = {
          data: responseData,
          status: xhr.status,
          statusText: xhr.statusText,
          config,
          request: xhr,
          headers: responseHeader
        };
        handleResponse(obj)

      };
      xhr.onerror = function handleError() {
        throw createError('Network Error', config, null, xhr);
      };
      xhr.ontimeout = function handleTimeout() {
        throw createError(`Failed with timeout ${timeout} ms exceeded`, config, 'ECONNABORTED', xhr);
      };
      if (onDownLoadProgress) {
        xhr.onprogress = onDownLoadProgress;
      }
      if (onUpLoadProgress) {
        xhr.upload.onprogress = onUpLoadProgress;
      }
    }

    function processHeaders() {
      if ((withCredentials || isUrlSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue = cookie.readName(xsrfCookieName);
        if (xsrfValue && xsrfHeaderName) {
          headers[xsrfHeaderName] = xsrfValue;
        }
      }

      if (isFormData(data)) {
        delete headers['Content-Type'];
      }

      if (auth) {
        headers["Authorization"] = "Basic " + atob(auth.username + ":" + auth.password);
      }

      Object.keys(headers).forEach(name => {
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name];
        } else {
          xhr.setRequestHeader(name, headers[name]);
        }
      });
    }

    function processCancel() {
      if (CancelToken) {
        CancelToken.promise.then(message => {
          xhr.abort();
          reject(message);
        })
      }
    }
  })

}
