import { BaseEnvironment } from './_environment.base';


class DevelopmentEnvironment extends BaseEnvironment {
  constructor(enableDashboard = false) {
    super();
    this._enableDashboard = enableDashboard;
  }

  get enableDashboard() { return this._enableDashboard; }

  get isDevelopment() { return true; }
}

export { DevelopmentEnvironment };
