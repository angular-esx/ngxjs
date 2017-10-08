import { BaseEnvironment } from './_environment.base';


export class DevelopmentEnvironment extends BaseEnvironment
{
  get isDevelopment (): boolean { return true; }
}
