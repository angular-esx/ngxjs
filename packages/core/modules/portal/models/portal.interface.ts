import {
  ComponentRef,
  ElementRef,
  TemplateRef,
  ViewContainerRef,
  Injector,
  Type,
} from '@angular/core';


export interface INgxPortal {
  readonly isAttached: boolean;

  attach (host: INgxPortalHost): any;

  detach (): void;

  attachedByHost (host: INgxPortalHost): void;

  detachedByHost (host: INgxPortalHost): void;
}


export interface INgxPortalHost {
  readonly hasAttached: boolean;

  attachTemplate (portal: INgxTemplatePortal): Map<string, any>;

  attachComponent<T> (portal: INgxComponentPortal<T>): ComponentRef<T>;

  detach (): void;

  dispose (): void;
}

export interface INgxTemplatePortal extends INgxPortal {
  readonly templateRef: TemplateRef<Map<string, any>>;
  readonly viewContainerRef: ViewContainerRef;
  readonly locals: Map<string, any>;

  attach (host: INgxPortalHost, locals?: Map<string, any>): Map<string, any>;
}

export interface INgxComponentPortal<T> extends INgxPortal {
  readonly componentType: Type<T>;
  readonly viewContainerRef: ViewContainerRef;
  readonly injector: Injector;
}
