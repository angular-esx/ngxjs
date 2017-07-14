import {
  RendererFactory2,
  Renderer2,
  Injectable,
  Inject
} from '@angular/core';

import { NgxRenderer } from './renderer.class';


@Injectable()
class NgxRenderService {
  protected _renderer: Renderer2;


  constructor (@Inject(RendererFactory2) rendererFactory: RendererFactory2) {
    this._renderer = rendererFactory.createRenderer(null, null);
  }


  createRenderer (nativeElement: any): NgxRenderer {
    return new NgxRenderer(nativeElement, this._renderer);
  }

  listen (
    target: 'window' | 'document' | 'body' | any,
    eventName: string,
    callback: (event: any) => boolean | void
  ): () => void {
    return this._renderer.listen(target, eventName, callback);
  }
}


export { NgxRenderService };
