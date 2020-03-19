import {AxiosRequestConfig} from "../types/index";
import {deepMerge, isPlainObject} from "../helpers/util";

const stracts = Object.create(null);

function defaultStrat(val1: any, val2: any): any {
  return typeof val2 !== "undefined" ? val2 : val1;
}

function formVal2Stract(val1: any, val2: any): any {
  if (typeof val2 !== "undefined") {
    return val2;
  }
}

const stractKeysFromVal2 = ['url', 'params', 'data'];

stractKeysFromVal2.forEach(key => {
  stracts[key] = formVal2Stract;
});

function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== "undefined"){
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1);
  } else if (typeof val1 !== "undefined") {
    return val1;
  }
}

const stractKeysDeepMerge = ['headers', 'auth'];
stractKeysDeepMerge.forEach(key => {
  stracts[key] = deepMergeStrat;
});


/**
 * {config1} 默认配置
 * */
export default function mergeConfig(config1: AxiosRequestConfig, config2?: AxiosRequestConfig): AxiosRequestConfig {
  if (!config2) {
    config2 = {};
  }

  let config = Object.create(null);
  //使用策略模式
  for (let key in config2) {
    MergeField(key);
  }

  for(let key in config1) {
    if (!config2[key]) {
      config[key] = config1[key];
    }
  }

  function MergeField(key: string): any {
    let strat = stracts[key] || defaultStrat;
    config[key] = strat(config1[key], config2![key]);
  }

  return config;
}
