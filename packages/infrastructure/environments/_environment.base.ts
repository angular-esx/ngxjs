import { IBaseEnvironment } from './environment.interface';


abstract class BaseEnvironment implements IBaseEnvironment {
  get assetHost(): string { return ''; };

  get imageHost(): string { return `${this.assetHost}/images`; }

  get fontHost(): string { return `${this.assetHost}/fonts`; }

  get isDevelopment(): boolean { return false; }

  get isProduction(): boolean { return false; }
}

export { BaseEnvironment };