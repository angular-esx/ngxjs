import {
  IBaseEnvironment,
  IDevelopmentEnvironment,
  ITestingEnvironment,
} from './environment.interface';

import { DevelopmentEnvironment } from './_environment.dev';
import { TestingEnvironment } from './_environment.test';
import { AotEnvironment } from './_environment.aot';
import { UniversalBrowserEnvironment } from './_environment.universal.browser';
import { UniversalServerEnvironment } from './_environment.universal.server';


function getEnvironment (): IBaseEnvironment {
  let environment: IBaseEnvironment;


  switch (process.env.BUILD_ENV) {
    case 'development':
      environment = new DevelopmentEnvironment();
      break;
    case 'development:dashboard':
      environment = new DevelopmentEnvironment(true);
      break;
    case 'testing':
      environment = new TestingEnvironment();
      break;
    case 'testing:custom':
      environment = new TestingEnvironment(true);
      break;
    case 'aot':
      environment = new AotEnvironment();
      break;
    case 'universal:browser':
      environment = new UniversalBrowserEnvironment();
      break;
    case 'universal:server':
      environment = new UniversalServerEnvironment();
      break;
    default:
      throw new Error(`Invalid process.env.BUILD_ENV: ${process.env.BUILD_ENV}`);
  }

  return environment;
}

export {
  getEnvironment,
  IBaseEnvironment,
  IDevelopmentEnvironment,
  ITestingEnvironment,
};
