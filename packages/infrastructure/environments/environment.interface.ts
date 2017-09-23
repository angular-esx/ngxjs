export interface IBaseEnvironment {
  assetHost: string;
  imageHost: string;
  fontHost: string;
  isDevelopment: boolean;
  isTesting: boolean;
  isAot: boolean;
  isUniversalBrowser: boolean;
  isUniversalServer: boolean;
  isProduction: boolean;
}

export interface IDevelopmentEnvironment extends IBaseEnvironment {
  enableDashboard: boolean;
}

export interface ITestingEnvironment extends IBaseEnvironment {
  isCustomMode: boolean;
}
