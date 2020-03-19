import {isDate, isObject, isURLSearchParams} from "./util";

export interface URLOrigin {
  protocol: string,
  host: string
}

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURL(url: string, params?: any, paramsSerializer?: (params: any) => string): string {
  if (!params) {
    return url;
  }
  const parts: string[] = [];

  var serializedParams;

  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if(isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    Object.keys(params).forEach(key => {
      const val = params[key];
      if (val === null || typeof val === "undefined") {
        return;
      }
      let values = [];
      if (Array.isArray(val)) {
        values = val;
        key += "[]"
      } else {
        values = [val];
      }

      values.forEach(val => {
        if (isDate(val)) {
          val = val.toISOString();
        } else if (isObject(val)) {
          val = JSON.stringify(val);
        }
        parts.push(`${encode(key)}=${encode(val)}`);
      });

    });

    serializedParams = parts.join("&");
  }


  if (serializedParams) {
    let markIndex= url.indexOf("#");
    if (markIndex !== -1) {
      url = url.slice(0, markIndex);
    }
    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }


  return url;
}

export function isAbsoluteURL(url: string): boolean {
  return /(^[a-z][a-z\d\+\-\.]:)?\/\//i.test(url);
}

export function combineURL(baseURL: string, relativeURL?: string): string {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
}

export function isUrlSameOrigin(requestUrl: string): boolean {
  const parsedUrl = resolveUrl(requestUrl);
  return (parsedUrl.host === currentOrigin.host && parsedUrl.protocol === currentOrigin.protocol);
}

const urlParsingNode = document.createElement('a');
const currentOrigin = resolveUrl(window.location.href);

function resolveUrl(url: string): URLOrigin {
  urlParsingNode.setAttribute('href', url);
  let {protocol, host} = urlParsingNode;
  return {
    protocol,
    host
  }
}
