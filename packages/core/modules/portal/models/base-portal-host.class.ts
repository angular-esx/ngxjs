import {
  ComponentRef,
  EmbeddedViewRef,
} from '@angular/core';

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


/**
 * Partial implementation of NgxPortalHost that only deals with attaching either a
 * NgxComponentPortal or a NgxTemplatePortal.
 */
export abstract class NgxBasePortalHost implements INgxPortalHost {
  protected _isDisposed: boolean = false;
  protected _disposeFunc: () => void;

  protected _attachedPortal: INgxPortal;

  get hasAttached(): boolean {
    return isNotNull(this._attachedPortal);
  }

  attachTemplate<T> (portal: INgxTemplatePortal<T>): EmbeddedViewRef<T> {
    this._attach(portal);

    return this._attachTemplatePortal(portal);
  }

  attachComponent<T> (portal: INgxComponentPortal<T>): ComponentRef<T> {
    this._attach(portal);

    return this._attachComponentPortal(portal);
  }

  detach (): void {
    if (this.hasAttached) {
      this._attachedPortal.detachedByHost(this);
      this._attachedPortal = null;
    }

    if (isNotNull(this._disposeFunc)) {
      this._disposeFunc();
      this._disposeFunc = null;
    }
  }

  dispose (): void {
    if (this.hasAttached) {
      this.detach();
    }
    else if (isNotNull(this._disposeFunc)) {
      this._disposeFunc();
      this._disposeFunc = null;
    }

    this._isDisposed = true;
  }

  protected abstract _attachComponentPortal<T> (portal: INgxComponentPortal<T>): ComponentRef<T>;

  protected abstract _attachTemplatePortal<T> (portal: INgxTemplatePortal<T>): EmbeddedViewRef<T>;

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
}
