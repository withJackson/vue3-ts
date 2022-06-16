export class ErrorWithoutToast extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ErrorWithoutToast";
    this.message = message;
    this.stack = new Error().stack;
  }
}

export class APIError extends Error {
  constructor(message: string, detail: string) {
    super(message);
    this.name = "APIError";
    this.message = message;
    this.stack = `${message}\n${detail}`;
  }
}

export class ServiceWorkerRegisterError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ServiceWorkerRegisterError";
    this.message = message;
  }
}

export class ServiceWorkerInnerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ServiceWorkerInnerError";
    this.message = message;
  }
}
