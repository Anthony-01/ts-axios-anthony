import {AxiosInterceptorManager, RejectedFn, ResolvedFn} from "../types/index";

export interface Interceptor<T> {
  resolved: ResolvedFn<T>

  rejected?: RejectedFn
}

export default class InterceptorManager<T> {

  private _interceptorAry: Array<Interceptor<T> | null> = [];

  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
    this._interceptorAry.push({
      resolved,
      rejected
    });
    return this._interceptorAry.length - 1;
  }

  eject(id: number) {
    if (this._interceptorAry[id] && this._interceptorAry[id] !== null) {
      this._interceptorAry[id] = null;
    }
  }

  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this._interceptorAry.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor);
      }
    })
  }
}
