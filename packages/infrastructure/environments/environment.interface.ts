interface IBaseEnvironment {
  assetHost: string;
  imageHost: string;
  fontHost: string;
  isDevelopment: boolean;
  isTesting: boolean;
  isAot: boolean;
  isProduction: boolean;
}

interface IDevelopmentEnvironment extends IBaseEnvironment {
  enableDashboard: boolean;
}

interface ITestingEnvironment extends IBaseEnvironment {
  isCustomMode: boolean;
}


export {
  IBaseEnvironment,
  IDevelopmentEnvironment,
  ITestingEnvironment,
};
