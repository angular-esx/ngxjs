import { ComponentRef } from '@angular/core';

import {
  isNull,
  isNotNull
} from 'ngx-infrastructure';

import {
  INgxPortal,
  INgxPortalHost
} from './portal.interface';


abstract class NgxBasePortal implements INgxPortal {
  private _attachedHost: INgxPortalHost;

  get isAttached(): boolean {
    return isNotNull(this._attachedHost);
  }

  attach (host: INgxPortalHost): any {
    if (isNull(host)) {
      throw new Error('Portal host is required');
    }

    this._attachedHost = host;

    return this._attach(host);
  }

  detach (): void {
    if (isNull(this._attachedHost)) {
      throw new Error('Not found portal host');
    }

    const _host = this._attachedHost;
    this._attachedHost = null;

    _host.detach();
  }

  attachedByHost (host: INgxPortalHost): void {
    if (isNull(host)) {
      throw new Error('Portal host is required');
    }

    if (isNotNull(this._attachedHost)) {
      throw new Error('This portal has already been attached to host');
    }

    this._attachedHost = host;
  }

  detachedByHost (host: INgxPortalHost): void {
    if (isNotNull(this._attachedHost) && this._attachedHost !== host) {
      throw new Error('Portal host is passed into detachByHost which is not attached host of this portal');
    }

    this._attachedHost = null;
  }

  protected abstract _attach (host: INgxPortalHost): any;
}


export { NgxBasePortal };
