import {
  RendererFactory2,
  Renderer2,
  Injectable,
  Inject
} from '@angular/core';

import { INgxRenderService } from './render-service.interface';
import { INgxRenderer } from './renderer.interface';
import { NgxRenderer } from './renderer.class';


@Injectable()
export class NgxRenderService implements INgxRenderService {
  protected _renderer: Renderer2;


  constructor (@Inject(RendererFactory2) rendererFactory: RendererFactory2) {
    this._renderer = rendererFactory.createRenderer(null, null);
  }


  createRenderer (nativeElement: any): INgxRenderer {
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
