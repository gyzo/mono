import dotenv from 'dotenv';

export class BackendDotenvService {
  private env: {
    [key: string]: unknown;
  } = {};

  constructor(path?: string) {
    this.config(path);
  }

  public get<T = string>(key: string) {
    return this.env[key] as T;
  }

  public config(path?: string) {
    this.env = dotenv.config(typeof path !== 'undefined' ? { path } : void 0).parsed ?? { ...this.env };
  }
}
