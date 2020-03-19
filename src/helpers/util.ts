import {Method} from "../types/index";

const toString = Object.prototype.toString;

export function isDate(val: any): val is Date {
  return toString.call(val) == "[object Date]"
}

export function isObject(val: any): val is Object {
  return val !== null && typeof val === "object"
}

export function isPlainObject(val: any): boolean {
  return toString.call(val) === "[object Object]";
}

export function isFormData(val: any): val is FormData {
    return typeof val !== "undefined" && val instanceof FormData;
}

export function isURLSearchParams(params: any): params is URLSearchParams {
    return typeof params !== "undefined" && params instanceof URLSearchParams;
}

export function extend <T, U>(to: T, from: U): T & U {
  for(const key in from) {
    (<T & U>to)[key] = from[key] as any;
  }
  return to as T & U;
}

export function deepMerge(...objs: any[]): any {
  let result = Object.create(null);

  objs.forEach(obj => {
    if (obj === undefined || obj === null) return;
    Object.keys(obj).forEach(key => {
      if (isPlainObject(obj[key])) {
        const val = obj[key];
        if (isPlainObject(val)) {
          if (result[key]) {
            result[key] = deepMerge(result[key], val);
          } else {
            result[key] = deepMerge(val);
          }
        } else {
          result[key] = obj[key];
        }
      } else {
        result[key] = obj[key];
      }
    })
  });

  return result;
}

export function flattenHeaders(headers: any, method: Method): any {
  //common等提取出来
  if (!headers) {
    return headers;
  }

  headers = deepMerge(headers, headers[method], headers.common);

  let deleteProperties = ['get', "post", "delete", "options", "head", "put", "patch", "common"];

  deleteProperties.forEach(key => {
    delete headers[key];
  });
  return headers;
}




