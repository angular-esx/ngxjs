import {
  NgModule,
  Component,
  ViewChild,
  ViewChildren,
  QueryList,
  Optional,
  Injectable,
  Injector,
  TemplateRef,
  Inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ComponentFixture,
  TestBed,
  async,
} from '@angular/core/testing';

import { NgxServiceModule } from '../../services/';
import {
  INgxPortal,
  NgxComponentPortal,
  NgxTemplatePortal,
  NgxTemplatePortalDirective,
  NgxPortalHostDirective,
  NgxPortalModule,
} from '../portal/';

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

// @Component({
//   selector: 'ngx-test-view-container',
//   template: '<p>NgxTestViewContainerComponent</p>'
// })
// class NgxTestViewContainerComponent {
//   constructor (public viewContainerRef: ViewContainerRef, public injector: Injector) { }
// }

@Component({
  selector: 'ngx-test-portal-host',
  template: `
    <div class="portal-container">
      <ng-template [ngxPortalHost]="selectedPortal"></ng-template>
    </div>

    <ng-template ngxPortal>NgxTemplatePortalDirective</ng-template>

    <ng-template ngxPortal let-data>{{ greeting }} - {{ data?.guest }}</ng-template>

    <ng-template ngxPortal>
      <ul>
        <li *ngFor="let guest of guests">{{ greeting }} - {{ guest }}</li>
      </ul>
    </ng-template>

    <ng-template #templateRef let-data>{{ greeting }} - {{ data?.guest }}</ng-template>
  `,
})
class NgxTestPortHostComponent {
  selectedPortal: INgxPortal;
  greeting = 'Hello';
  guests = ['Leon', 'Christ', 'Jill'];

  @ViewChild(NgxPortalHostDirective) portalHost: NgxPortalHostDirective;

  @ViewChild('templateRef', { read: TemplateRef }) templateRef: TemplateRef<any>;
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


describe('PortalHostDirective', () => {
  let _portalHostComponent: ComponentFixture<NgxTestPortHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxTestPortalModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    _portalHostComponent = TestBed.createComponent(NgxTestPortHostComponent);
  });

  it('should load a component into the portal', () => {
    _portalHostComponent.componentInstance.selectedPortal = new NgxComponentPortal(NgxTestPortalComponent);
    _portalHostComponent.detectChanges();

    expect(_getPortalContainerElement().textContent).toContain('NgxTestPortalComponent');
  });

  it('should load a template into the portal', () => {
    _portalHostComponent.componentInstance.selectedPortal = new NgxTemplatePortal(_portalHostComponent.componentInstance.templateRef, null);
    _portalHostComponent.detectChanges();

    expect(_getPortalContainerElement().textContent).toContain('Hello');
  });

  it('should project template context bindings in the portal', () => {
    let _templatePortal = new NgxTemplatePortal(_portalHostComponent.componentInstance.templateRef, null);
    const _context = { $implicit: { guest: 'Leon' } };

    _portalHostComponent.componentInstance.selectedPortal = _templatePortal;
    _portalHostComponent.detectChanges();
    expect(_getPortalContainerElement().textContent).toContain('Hello - ');

    _portalHostComponent.componentInstance.selectedPortal = undefined;
    _portalHostComponent.detectChanges();

    //  using TemplatePortal.attach method to set context
    _templatePortal.attach(_portalHostComponent.componentInstance.portalHost, _context);
    _portalHostComponent.detectChanges();
    expect(_getPortalContainerElement().textContent).toContain('Hello - Leon');

    _portalHostComponent.componentInstance.selectedPortal = undefined;
    _portalHostComponent.detectChanges();

    // using TemplatePortal constructor to set the context
    _templatePortal = new NgxTemplatePortal(_portalHostComponent.componentInstance.templateRef, null, _context);
    _portalHostComponent.componentInstance.selectedPortal = _templatePortal;
    _portalHostComponent.detectChanges();
    expect(_getPortalContainerElement().textContent).toContain('Hello - Leon');

    _portalHostComponent.componentInstance.selectedPortal = undefined;
    _portalHostComponent.detectChanges();

    // using TemplatePortal constructor to set the context but also calling attach method with context
    _templatePortal.attach(_portalHostComponent.componentInstance.portalHost, _context);
    _portalHostComponent.detectChanges();
    expect(_getPortalContainerElement().textContent).toContain('Hello - Leon');
  });

  it('should dispose the host when destroyed', () => {
    _portalHostComponent.componentInstance.selectedPortal = new NgxComponentPortal(NgxTestPortalComponent);
    _portalHostComponent.detectChanges();

    expect(_portalHostComponent.componentInstance.selectedPortal.isAttached).toBe(true);

    _portalHostComponent.destroy();
    expect(_portalHostComponent.componentInstance.selectedPortal.isAttached).toBe(false);
  });

  it('should load a component into the portal with a given injector', () => {
    const _customInjector = new CustomOptionInjector(_portalHostComponent.componentInstance.injector);

    _portalHostComponent.componentInstance.selectedPortal = new NgxComponentPortal(NgxTestPortalComponent, null, _customInjector);
    _portalHostComponent.detectChanges();

    expect(_getPortalContainerElement().textContent).toContain('NgxTestPortalComponent');
    expect(_getPortalContainerElement().textContent).toContain('CustomOption');
  });

  it('should load a <ng-template> portal', () => {
    // Detect changes initially so that the component's ViewChildren are resolved.
    _portalHostComponent.detectChanges();

    _portalHostComponent.componentInstance.selectedPortal = _portalHostComponent.componentInstance.templatePortal;
    _portalHostComponent.detectChanges();

    expect(_getPortalContainerElement().textContent).toContain('NgxTemplatePortalDirective');
  });

  it('should load a <ng-template> portal with a context', () => {
    // Detect changes initially so that the component's ViewChildren are resolved.
    _portalHostComponent.detectChanges();

    _portalHostComponent.componentInstance.selectedPortal = _portalHostComponent.componentInstance.templatePortalWithContext;
    _portalHostComponent.detectChanges();
    expect(_getPortalContainerElement().textContent).toContain('Hello - ');


    _portalHostComponent.componentInstance.greeting = 'Hi';
    _portalHostComponent.detectChanges();
    expect(_getPortalContainerElement().textContent).toContain('Hi - ');
  });

  it('should load a <ng-template> portal with a content', () => {
    // Detect changes initially so that the component's ViewChildren are resolved.
    _portalHostComponent.detectChanges();

    _portalHostComponent.componentInstance.selectedPortal = _portalHostComponent.componentInstance.templatePortalWithContent;
    _portalHostComponent.detectChanges();
    expect(_getPortalContainerElement().textContent).toContain('Hello - Leon');

    _portalHostComponent.componentInstance.guests = ['Rebecca'];
    _portalHostComponent.detectChanges();
    expect(_getPortalContainerElement().textContent).toContain('Hello - Rebecca');
  });

  it('should change the attached portal', () => {
    // Detect changes initially so that the component's ViewChildren are resolved.
    _portalHostComponent.detectChanges();

    _portalHostComponent.componentInstance.selectedPortal = _portalHostComponent.componentInstance.templatePortal;
    _portalHostComponent.detectChanges();
    expect(_getPortalContainerElement().textContent).toContain('NgxTemplatePortalDirective');

    _portalHostComponent.componentInstance.selectedPortal = new NgxComponentPortal(NgxTestPortalComponent);
    _portalHostComponent.detectChanges();
    expect(_getPortalContainerElement().textContent).toContain('NgxTestPortalComponent');
  });

  it('should detach the portal when it is set to null', () => {
    _portalHostComponent.componentInstance.selectedPortal = new NgxComponentPortal(NgxTestPortalComponent);
    _portalHostComponent.detectChanges();
    expect(_portalHostComponent.componentInstance.portalHost.hasAttached).toBe(true);
    expect(_portalHostComponent.componentInstance.portalHost.portal).toBe(_portalHostComponent.componentInstance.selectedPortal);

    _portalHostComponent.componentInstance.selectedPortal = null;
    _portalHostComponent.detectChanges();
    expect(_portalHostComponent.componentInstance.portalHost.hasAttached).toBe(false);
    expect(_portalHostComponent.componentInstance.portalHost.portal).toBeNull();
  });

  it('should set the `portal` when attaching a component portal programmatically', () => {
    const _portal = new NgxComponentPortal(NgxTestPortalComponent);

    _portalHostComponent.componentInstance.portalHost.attachComponent(_portal);

    expect(_portalHostComponent.componentInstance.portalHost.portal).toBe(_portal);
  });

  it('should set the `portal` when attaching a template portal programmatically', () => {
    _portalHostComponent.detectChanges();

    _portalHostComponent.componentInstance.portalHost.attachTemplate(_portalHostComponent.componentInstance.templatePortal);

    expect(_portalHostComponent.componentInstance.portalHost.portal).toBe(_portalHostComponent.componentInstance.templatePortal);
  });

  it('should clear the portal reference on destroy', () => {
    _portalHostComponent.componentInstance.selectedPortal = new NgxComponentPortal(NgxTestPortalComponent);
    _portalHostComponent.detectChanges();
    expect(_portalHostComponent.componentInstance.portalHost.portal).toBeTruthy();

    _portalHostComponent.destroy();

    expect(_portalHostComponent.componentInstance.portalHost.portal).toBeNull();
  });

  function _getPortalContainerElement (): HTMLElement {
    return _portalHostComponent.nativeElement.querySelector('.portal-container') as HTMLElement;
  }
});
