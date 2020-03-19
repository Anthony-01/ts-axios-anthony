import {AxiosRequestConfig, AxiosResponse} from "../types/index";

export class AxiosError extends Error {
  config: AxiosRequestConfig;
  code: string | null | undefined;
  request: XMLHttpRequest;
  response: AxiosResponse | undefined;
  isAxiosError: boolean;

  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse
  ) {
    super(message);

    this.config = config;
    this.code = code;
    this.request = request;
    this.response = response;
    this.isAxiosError = true;

    Object.setPrototypeOf(this, AxiosError.prototype);
  }
}

export function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse
) {
  const error = new AxiosError(message, config, code, request, response);

  return error;
}
