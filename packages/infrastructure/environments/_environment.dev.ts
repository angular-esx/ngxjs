import { BaseEnvironment } from './_environment.base';
import { IDevelopmentEnvironment } from './environment.interface';


class DevelopmentEnvironment
  extends BaseEnvironment
  implements IDevelopmentEnvironment
{
  private _enableDashboard: boolean;

  constructor (enableDashboard: boolean = false) {
    super();
    this._enableDashboard = enableDashboard;
  }

  get enableDashboard(): boolean { return this._enableDashboard; }

  get isDevelopment(): boolean { return true; }
}

export { DevelopmentEnvironment };
