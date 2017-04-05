import {
  Component,
  ViewEncapsulation,
  ViewContainerRef,
  ViewChild,
  ComponentFactoryResolver,
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
class TypographyPage {
  _activeScript;
  _scriptComponentRef;

  @ViewChild('scriptContainer', { read: ViewContainerRef })_scriptViewContainerRef;

  static parameters = [
    [new Inject(ComponentFactoryResolver)],
  ]
  constructor(componentResolver) {
    this._componentResolver = componentResolver;
  }

  ngAfterViewInit() {
    this._display('english-script');
  }

  _display(script) {
    if (this._activeScript === script) { return; }

    this._activeScript = script;

    if (this._scriptComponentRef) { this._scriptComponentRef.destroy(); }

    let _scriptComponent;
    switch (this._activeScript) {
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
