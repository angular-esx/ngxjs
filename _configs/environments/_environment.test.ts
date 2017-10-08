import { BaseEnvironment } from './_environment.base';


export class TestingEnvironment extends BaseEnvironment {
  get isTesting (): boolean { return true; }

  get isCustomTesting (): boolean { return this._isCustomTesting; }

  constructor (private _isCustomTesting: boolean) {
    super();
  }
}
