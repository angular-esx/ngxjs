import { ComponentRef } from '@angular/core';

import {
  isNull,
  isNotNull
} from 'ngx-infrastructure';

import {
  INgxPortal,
  INgxPortalHost,
  INgxTemplatePortal,
  INgxComponentPortal,
} from './portal.interface';


abstract class NgxBasePortalHost implements INgxPortalHost {
  protected _attachedPortal: INgxPortal;
  private _isDisposed: boolean = false;
  private _disposeFunc: () => void;

  get hasAttached(): boolean {
    return isNotNull(this._attachedPortal);
  }

  setDisposeFunc (func: () => void) {
    this._disposeFunc = func;
  }

  attachTemplate (portal: INgxTemplatePortal): Map<string, any> {
    this._attach(portal);

    return this._attachTemplatePortal(portal);
  }

  attachComponent<T> (portal: INgxComponentPortal<T>): ComponentRef<T> {
    this._attach(portal);

    return this._attachComponentPortal(portal);
  }

  detach (): void {
    if (isNotNull(this._attachedPortal)) {
      this._attachedPortal.detachedByHost(this);
    }

    this._attachedPortal = null;

    if (isNotNull(this._disposeFunc)) {
      this._disposeFunc();
      this._disposeFunc = null;
    }
  }

  dispose (): void {
    if (this.hasAttached) {
      this.detach();
    }

    this._isDisposed = true;
  }

  private _attach (portal: INgxPortal): void {
    if (isNull(portal)) {
      throw new Error('Portal is required');
    }

    if (portal.isAttached) {
      throw new Error('This portal has already been attached to host');
    }

    if (this.hasAttached) {
      throw new Error('This portal host has already had attached portal');
    }

    if (this._isDisposed) {
      throw new Error('Porttal host has already disposed');
    }

    portal.attachedByHost(this);
    this._attachedPortal = portal;
  }

  protected abstract _attachComponentPortal<T> (portal: INgxComponentPortal<T>): ComponentRef<T>;

  protected abstract _attachTemplatePortal (portal: INgxTemplatePortal): Map<string, any>;
}


export { NgxBasePortalHost };
