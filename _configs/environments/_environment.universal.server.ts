import { BaseEnvironment } from './_environment.base';


export class UniversalServerEnvironment extends BaseEnvironment
{
  get isUniversalServer(): boolean { return true; }
}
