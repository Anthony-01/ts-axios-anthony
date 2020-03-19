export default class Cancel {
  message: string | undefined;

  constructor(message?: string) {
    this.message = message;
  }
}

export function isCancel(value: any): boolean {
  return value instanceof Cancel;
}
