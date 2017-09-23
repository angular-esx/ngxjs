import { BaseEnvironment } from './_environment.base';
import { ITestingEnvironment } from './environment.interface';


export class TestingEnvironment
  extends BaseEnvironment
  implements ITestingEnvironment
{
  get isTesting(): boolean { return true; }

  get isCustomMode(): boolean { return this._isCustomMode; }


  constructor (private _isCustomMode: boolean = false) {
    super();
  }
}
