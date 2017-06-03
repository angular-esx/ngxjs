import {
  ComponentRef,
  ElementRef,
  TemplateRef,
  ViewContainerRef,
  Injector,
  Type,
} from '@angular/core';


interface INgxPortal {
  isAttached: boolean;

  attach (host: INgxPortalHost): any;

  detach (): void;

  attachedByHost (host: INgxPortalHost): void;

  detachedByHost (host: INgxPortalHost): void;
}


interface INgxPortalHost {
  hasAttached: boolean;

  setDisposeFunc (func: () => void);

  attachTemplate (portal: INgxTemplatePortal): Map<string, any>;

  attachComponent<T> (portal: INgxComponentPortal<T>): ComponentRef<T>;

  detach (): void;

  dispose (): void;
}

interface INgxTemplatePortal extends INgxPortal {
  elementRef: ElementRef;
  templateRef: TemplateRef<Map<string, any>>;
  viewContainerRef: ViewContainerRef;

  locals: Map<string, any>;

  attach (host: INgxPortalHost, locals?: Map<string, any>): Map<string, any>;
}

interface INgxComponentPortal<T> extends INgxPortal {
  component: Type<T>;
  viewContainerRef: ViewContainerRef;
  injector: Injector;
}


export {
  INgxPortal,
  INgxPortalHost,
  INgxTemplatePortal,
  INgxComponentPortal,
};
