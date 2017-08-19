/* tslint:disable: component-class-suffix */
import {
  Component,
  AfterViewInit,
  ViewContainerRef,
  ViewChild,
  ComponentFactoryResolver,
  ViewEncapsulation,
  Inject,
} from '@angular/core';

import {
  DenseScriptComponent,
  EnglishScriptComponent,
  TallScriptComponent,
} from './modules';


@Component({
  selector: 'ngx-typography-page',
  templateUrl: './templates/typography.html',
  styleUrls: ['./styles/index.scss'],
  host: {
    '[class.ngx-TypographyPage]': 'true',
  },
  encapsulation: ViewEncapsulation.None,
})
class TypographyPage implements AfterViewInit {
  private _scriptComponentRef: any;

  @ViewChild('scriptContainer', { read: ViewContainerRef })
  private _scriptViewContainerRef: ViewContainerRef;

  activeScript: string;

  constructor (@Inject(ComponentFactoryResolver) private _componentResolver: ComponentFactoryResolver) {}

  ngAfterViewInit (): void {
    this._display('english-script');
  }

  _display (script): void {
    if (this.activeScript === script) { return; }

    this.activeScript = script;

    if (this._scriptComponentRef) { this._scriptComponentRef.destroy(); }

    let _scriptComponent;
    switch (this.activeScript) {
      case 'dense-script':
        _scriptComponent = DenseScriptComponent;
        break;
      case 'english-script':
        _scriptComponent = EnglishScriptComponent;
        break;
      case 'tall-script':
        _scriptComponent = TallScriptComponent;
        break;
    }

    this._scriptComponentRef = this._scriptViewContainerRef.createComponent(
      this._componentResolver.resolveComponentFactory(_scriptComponent),
      this._scriptViewContainerRef.length,
    );
  }
}


export { TypographyPage };
