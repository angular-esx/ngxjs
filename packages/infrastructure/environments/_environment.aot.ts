import { BaseEnvironment } from './_environment.base';


export class AotEnvironment extends BaseEnvironment
{
  get isAot(): boolean { return true; }
}
