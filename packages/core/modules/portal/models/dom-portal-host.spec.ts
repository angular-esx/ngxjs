import {
  NgModule,
  Component,
  ViewChildren,
  QueryList,
  Optional,
  Injectable,
  Injector,
  TemplateRef,
  ViewContainerRef,
  ApplicationRef,
  ComponentFactoryResolver,
  Inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ComponentFixture,
  TestBed,
  async,
  inject,
} from '@angular/core/testing';

import { NgxServiceModule } from '../../../services/';
import {
  INgxPortal,
  NgxComponentPortal,
  NgxTemplatePortal,
  NgxDomPortalHost,
  NgxTemplatePortalDirective,
  NgxPortalHostDirective,
  NgxPortalModule,
} from '../../portal/';

@Injectable()
class CustomOption {
  toString (): string { return 'CustomOption'; }
}

class CustomOptionInjector {
  constructor (public parentInjector: Injector) { }

  get (token: any): any {
    return token === CustomOption ? new CustomOption() : this.parentInjector.get<any>(token);
  }
}

@Component({
  selector: 'ngx-test-portal',
  template: `
    <p>NgxTestPortalComponent</p>
    <p>{{ option?.toString() }}</p>
  `,
})
class NgxTestPortalComponent {
  constructor (@Inject(CustomOption) @Optional() public option: CustomOption) { }
}

@Component({
  selector: 'ngx-test-view-container',
  template: '<p>NgxTestViewContainerComponent</p>'
})
class NgxTestViewContainerComponent {
  constructor (
    @Inject(ViewContainerRef) public viewContainerRef: ViewContainerRef,
    @Inject(Injector) public injector: Injector
  ) { }
}

@Component({
  selector: 'ngx-test-portal-host',
  template: `
    <ng-template ngxPortal>NgxTemplatePortalDirective</ng-template>

    <ng-template ngxPortal let-data>{{ greeting }} - {{ data?.guest }}</ng-template>

    <ng-template ngxPortal>
      <ul>
        <li *ngFor="let guest of guests">{{ greeting }} - {{ guest }}</li>
      </ul>
    </ng-template>
  `,
})
class NgxTestPortHostComponent {
  selectedPortal: INgxPortal;
  greeting = 'Hello';
  guests = ['Leon', 'Christ', 'Jill'];

  @ViewChildren(NgxTemplatePortalDirective) templatePortals: QueryList<NgxTemplatePortalDirective>;

  get templatePortal() {
    return this.templatePortals.first;
  }

  get templatePortalWithContext() {
    return this.templatePortals.toArray()[1];
  }

  get templatePortalWithContent() {
    return this.templatePortals.toArray()[2];
  }

  constructor (@Inject(Injector) public injector: Injector) { }
}

const DIRECTIVES = [
  NgxTestPortHostComponent,
  NgxTestPortalComponent,
  NgxTestViewContainerComponent,
];
@NgModule({
  imports: [
    CommonModule,
    NgxPortalModule,
    NgxServiceModule,
  ],
  declarations: DIRECTIVES,
  providers: [CustomOption],
  entryComponents: DIRECTIVES,
  exports: DIRECTIVES,
})
class NgxTestPortalModule { }


describe('DomPortalHost', () => {
  let _portalHostComponent: ComponentFixture<NgxTestPortHostComponent>;
  let _componentFactoryResolver: ComponentFactoryResolver;
  let _injector: Injector;
  let _appRef: ApplicationRef;
  let _viewContainerComponent: ComponentFixture<any>;
  let _element: HTMLElement;
  let _domPortalHost: NgxDomPortalHost;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxTestPortalModule],
    })
    .compileComponents();
  }));

  beforeEach(inject([
    ComponentFactoryResolver,
    Injector,
    ApplicationRef,
  ],
  (componentFactoryResolver: ComponentFactoryResolver,
    injector: Injector,
    appRef: ApplicationRef,
  ) => {
    _componentFactoryResolver = componentFactoryResolver;
    _injector = injector;
    _appRef = appRef;

    _element = document.createElement('div');
    _domPortalHost = new NgxDomPortalHost(_element, _componentFactoryResolver, _appRef, _injector);

    _portalHostComponent = TestBed.createComponent(NgxTestPortHostComponent);
    _viewContainerComponent = TestBed.createComponent(NgxTestViewContainerComponent);
  }));

  it('should attach and detach a component portal', () => {
    expect(
      new NgxComponentPortal(NgxTestPortalComponent, _viewContainerComponent.componentInstance.viewContainerRef)
      .attach(_domPortalHost).instance
      instanceof NgxTestPortalComponent
    ).toBe(true);
    expect(_element.textContent).toContain('NgxTestPortalComponent');

    _domPortalHost.detach();
    expect(_element.innerHTML).toBe('');
  });

  it('should attach and detach a component portal with a given injector', () => {
    expect(
      new NgxComponentPortal(
        NgxTestPortalComponent,
        _viewContainerComponent.componentInstance.viewContainerRef,
        new CustomOptionInjector(_viewContainerComponent.componentInstance.injector)
      ).attach(_domPortalHost).instance
      instanceof NgxTestPortalComponent
    ).toBe(true);
    _viewContainerComponent.detectChanges();
    expect(_element.textContent).toContain('NgxTestPortalComponent');
    expect(_element.textContent).toContain('CustomOption');

    _domPortalHost.detach();
    expect(_element.innerHTML).toBe('');
  });

  it('should attach and detach a template portal', () => {
    // Detect changes initially so that the component's ViewChildren are resolved.
    _portalHostComponent.detectChanges();

    _portalHostComponent.componentInstance.templatePortal.attach(_domPortalHost);

    expect(_element.textContent).toContain('NgxTemplatePortalDirective');
  });

  it('should render a template portal with a content', () => {
    // Detect changes initially so that the component's ViewChildren are resolved.
    _portalHostComponent.detectChanges();

    _portalHostComponent.componentInstance.templatePortalWithContent.attach(_domPortalHost);

    expect(_element.textContent).toContain('Leon');
  });

  it('should attach and detach a template portal with a context', () => {
    // Detect changes initially so that the component's ViewChildren are resolved.
    _portalHostComponent.detectChanges();

    _portalHostComponent.componentInstance.templatePortalWithContext.attach(_domPortalHost, { $implicit: { guest: 'Rebecca' } });
    _portalHostComponent.detectChanges();
    expect(_element.textContent).toContain('Hello - Rebecca');


    _portalHostComponent.componentInstance.greeting = 'Hi';
    _portalHostComponent.detectChanges();
    expect(_element.textContent).toContain('Hi');

    _domPortalHost.detach();
    expect(_element.innerHTML).toBe('');
  });

  it('should change the attached portal', () => {
    // Detect changes initially so that the component's ViewChildren are resolved.
    _portalHostComponent.detectChanges();

    _portalHostComponent.componentInstance.templatePortal.attach(_domPortalHost);
    expect(_element.textContent).toContain('NgxTemplatePortalDirective');

    _domPortalHost.detach();
    _domPortalHost.attachComponent(new NgxComponentPortal(NgxTestPortalComponent, _viewContainerComponent.componentInstance.viewContainerRef));
    expect(_element.textContent).toContain('NgxTestPortalComponent');
  });

  it('should attach and detach a component portal without a ViewContainerRef', () => {
    const _componentInstance = new NgxComponentPortal(NgxTestPortalComponent).attach(_domPortalHost).instance;

    expect(_componentInstance instanceof NgxTestPortalComponent).toBe(true);
    expect(_element.textContent).toContain('NgxTestPortalComponent');

    (_componentInstance as NgxTestPortalComponent).option = new CustomOption();
    _viewContainerComponent.detectChanges();
    expect(_element.textContent).toContain('CustomOption');

    _domPortalHost.detach();
    expect(_element.innerHTML).toBe('');
  });
});
