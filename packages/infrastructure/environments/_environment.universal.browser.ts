import { BaseEnvironment } from './_environment.base';


export class UniversalBrowserEnvironment extends BaseEnvironment
{
  get isUniversalBrowser(): boolean { return true; }
}
