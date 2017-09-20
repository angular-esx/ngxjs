import {
  ComponentRef,
  ElementRef,
  TemplateRef,
  EmbeddedViewRef,
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

  attachTemplate<T> (portal: INgxTemplatePortal<T>): EmbeddedViewRef<T>;

  attachComponent<T> (portal: INgxComponentPortal<T>): ComponentRef<T>;

  detach (): void;

  dispose (): void;
}

export interface INgxTemplatePortal<T> extends INgxPortal {
  readonly templateRef: TemplateRef<T>;
  readonly viewContainerRef: ViewContainerRef;
  readonly context: T | undefined;

  attach (host: INgxPortalHost, context?: T | undefined): T;
}

export interface INgxComponentPortal<T> extends INgxPortal {
  readonly componentType: Type<T>;
  readonly viewContainerRef: ViewContainerRef;
  readonly injector: Injector;
}
