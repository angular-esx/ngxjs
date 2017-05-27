interface IBaseEnvironment {
  assetHost: string;
  imageHost: string;
  fontHost: string;
  isDevelopment: boolean;
  isProduction: boolean;
}

interface IDevelopmentEnvironment extends IBaseEnvironment {
  enableDashboard: boolean;
}


export {
  IBaseEnvironment,
  IDevelopmentEnvironment,
};
