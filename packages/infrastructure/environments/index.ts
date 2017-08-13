import {
  IBaseEnvironment,
  IDevelopmentEnvironment,
  ITestingEnvironment,
} from './environment.interface';

import { DevelopmentEnvironment } from './_environment.dev';
import { TestingEnvironment } from './_environment.test';
import { AotEnvironment } from './_environment.aot';

let _environment: IBaseEnvironment;


switch (process.env.BUILD_ENV) {
  case 'development':
    _environment = new DevelopmentEnvironment();
    break;
  case 'development:dashboard':
    _environment = new DevelopmentEnvironment(true);
    break;
  case 'testing':
    _environment = new TestingEnvironment();
    break;
  case 'testing:custom':
    _environment = new TestingEnvironment(true);
    break;
    case 'aot':
    _environment = new AotEnvironment();
    break;
  default:
    throw new Error(`Invalid process.env.BUILD_ENV: ${process.env.BUILD_ENV}`);
}

const environment: IBaseEnvironment = _environment;
export {
  environment,
  IBaseEnvironment,
  IDevelopmentEnvironment,
  ITestingEnvironment,
};
