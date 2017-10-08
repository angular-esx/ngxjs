import {
  isFunction,
  IEnvironment,
} from '../../packages/infrastructure';


export abstract class BaseEnvironment implements IEnvironment {
  get assetHost (): string { return ''; }

  get isDevelopment (): boolean { return false; }

  get isTesting (): boolean { return false; }

  get isCustomTesting (): boolean { return false; }

  get isUniversalBrowser (): boolean { return false; }

  get isUniversalServer (): boolean { return false; }

  get isProduction (): boolean { return false; }

  toString (): string {
    return JSON.stringify({
      assetHost: this.assetHost,
      isDevelopment: this.isDevelopment,
      isTesting: this.isTesting,
      isCustomTesting: this.isCustomTesting,
      isUniversalBrowser: this.isUniversalBrowser,
      isUniversalServer: this.isUniversalServer,
      isProduction: this.isProduction,
    });
  }
}
