import { BaseEnvironment } from './_environment.base';


class AotEnvironment extends BaseEnvironment
{
  get isAot(): boolean { return true; }
}

export { AotEnvironment };
