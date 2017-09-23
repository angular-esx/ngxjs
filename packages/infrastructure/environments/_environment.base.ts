import { IBaseEnvironment } from './environment.interface';


export abstract class BaseEnvironment implements IBaseEnvironment {
  get assetHost(): string { return ''; };

  get imageHost(): string { return `${this.assetHost}/images`; }

  get fontHost(): string { return `${this.assetHost}/fonts`; }

  get isDevelopment(): boolean { return false; }

  get isTesting(): boolean { return false; }

  get isAot(): boolean { return false; }

  get isUniversalBrowser(): boolean { return false; }

  get isUniversalServer(): boolean { return false; }

  get isProduction(): boolean { return false; }
}
