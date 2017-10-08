import { ComponentRef } from '@angular/core';

import {
  isNull,
  isNotNull
} from 'ngx-infrastructure';

import {
  INgxPortal,
  INgxPortalHost
} from './portal.interface';


/**
 * Partial implementation of NgxBasePortal that you want to render somewhere else.
 */
export abstract class NgxBasePortal implements INgxPortal {
  protected _attachedHost: INgxPortalHost;

  get isAttached(): boolean {
    return isNotNull(this._attachedHost);
  }

  attach (host: INgxPortalHost): any {
    if (isNull(host)) {
      throw new Error('Portal host is required');
    }

    const result = this._attach(host);
    this._attachedHost = host;

    return result;
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
      throw new Error('The host from parameter is not attached host of this portal');
    }

    this._attachedHost = null;
  }

  protected abstract _attach (host: INgxPortalHost): any;
}
