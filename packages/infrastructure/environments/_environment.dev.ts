import { BaseEnvironment } from './_environment.base';
import { IDevelopmentEnvironment } from './environment.interface';


export class DevelopmentEnvironment
  extends BaseEnvironment
  implements IDevelopmentEnvironment
{
  get enableDashboard(): boolean { return this._enableDashboard; }

  get isDevelopment(): boolean { return true; }


  constructor (private _enableDashboard: boolean = false) {
    super();
  }
}
