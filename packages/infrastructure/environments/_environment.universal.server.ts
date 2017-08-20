import { BaseEnvironment } from './_environment.base';


class UniversalServerEnvironment extends BaseEnvironment
{
  get isUniversalServer(): boolean { return true; }
}

export { UniversalServerEnvironment };
