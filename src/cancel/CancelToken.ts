import {Canceler, CancelExecutor, CancelTokenSource} from "../types/index";
import Cancel from "./Cancel";

export interface ResolvePromise {
  (reason?: Cancel): void;
}

export default class CancelToken {
  promise: Promise<Cancel>;
  reason?: Cancel;

  constructor(cancel: CancelExecutor) {
    let promiseVec: ResolvePromise;

    this.promise = new Promise(resolve => {
      promiseVec = resolve;
    });

    cancel(reason => {
      if (this.reason) {
        console.log("请求已取消!");
        return
      }
      this.reason = new Cancel(reason);
      promiseVec(this.reason);
    })
  }

  static source(): CancelTokenSource {
    let cancel: Canceler;
    let token = new CancelToken(c => {
      cancel = c;
    });
    return {
      cancel: cancel!,
      token
    }
  }

  ifThrowRequest() {
    if (this.reason) {
      throw this.reason
    }
  }
}
