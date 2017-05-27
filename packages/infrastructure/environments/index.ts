import {
  IBaseEnvironment,
  IDevelopmentEnvironment,
} from './environment.interface';

import { DevelopmentEnvironment } from './_environment.dev';

let _environment: IBaseEnvironment;


switch (process.env.BUILD_ENV) {
  case 'development':
    _environment = new DevelopmentEnvironment();
    break;
  case 'development:dashboard':
    _environment = new DevelopmentEnvironment(true);
    break;
  default:
    throw new Error(`Invalid process.env.BUILD_ENV: ${process.env.BUILD_ENV}`);
}

const environment: IBaseEnvironment = _environment;
export {
  environment,
  IBaseEnvironment,
  IDevelopmentEnvironment
};
