export interface IEnvironment {
  assetHost: string;
  isDevelopment: boolean;
  isTesting: boolean;
  isCustomTesting: boolean;
  isUniversalBrowser: boolean;
  isUniversalServer: boolean;
  isProduction: boolean;
  toString (): string;
}
