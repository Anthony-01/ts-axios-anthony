import {AxiosRequestConfig, AxiosStatic} from "./types/index";
import Axios from "./core/Axios";
import {extend} from "./helpers/util";
import defaultConfig from "./defaults";
import mergeConfig from "./core/mergeConfig";
import CancelToken from "./cancel/CancelToken";
import {default as Cancel, isCancel} from "./cancel/Cancel";

function createAxiosInstance(config: AxiosRequestConfig): AxiosStatic {
  const ax = new Axios(config);
  const instance = Axios.prototype.request.bind(ax);
  extend(instance, ax);
  return instance as AxiosStatic;
}

var axios = createAxiosInstance(defaultConfig);

axios.create = function(config: AxiosRequestConfig) {
  return createAxiosInstance(mergeConfig(defaultConfig, config))
}

axios.cancelToken = CancelToken;
axios.cancel = Cancel;
axios.isCancel = isCancel;

axios.all = function (promiseVec) {
  return Promise.all(promiseVec);
}

axios.spread = function (callBack) {
  return function(arr) {
    return callBack.apply(null, arr)
  }
}

//单元测试

axios.Axios = Axios;
export default axios;
