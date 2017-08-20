import { BaseEnvironment } from './_environment.base';


class UniversalBrowserEnvironment extends BaseEnvironment
{
  get isUniversalBrowser(): boolean { return true; }
}

export { UniversalBrowserEnvironment };
