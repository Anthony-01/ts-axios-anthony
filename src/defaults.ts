 import {AxiosRequestConfig} from "./types/index";
 import {processHeader} from "./helpers/header";
 import {transformRequestData, transformResponse} from "./helpers/data";

 var defaultConfig: AxiosRequestConfig = {
   timeout: 0,
   method: 'get',
   xsrfCookieName: "XSRF-TOKEN",
   xsrfHeaderName: "X-XSRF-TOKEN",
   headers: {
     common: {
       'Context-Type': 'application/json, text/plain, */*'
     }
   },
   transformRequest: [function(data: any, headers: any) {
     processHeader(headers, data);
     return transformRequestData(data);
   }],
   transformResponse: [function(data: any) {
     return transformResponse(data)
   }],
   validateStatus: (status: number) => {
     return status >= 200 && status < 300;
 }
};
const methods1 = ['delete', 'get', "head", 'options'];
 methods1.forEach(name => {
   Object.defineProperty(defaultConfig.headers, name, {});
   // defaultConfig.headers[name] = Object.create(null);
 });
 ['post', 'put', 'patch'].forEach(name => {
   Object.defineProperty(defaultConfig.headers, name, {
     value: {
       'Context-Type': 'application/x-www-form-urlencoded'
     }
   });
   // defaultConfig.headers[name] = {
   //   'Context-Type': 'application/x-www-form-urlencoded'
   // }
 });

 export default defaultConfig
