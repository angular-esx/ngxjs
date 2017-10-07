import {
  RendererFactory2,
  Renderer2,
  Injectable,
  Inject,
  Optional,
  SkipSelf,
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

export function ngxRenderServiceFactory (
  parentNgxRenderService: INgxRenderService,
  rendererFactory: RendererFactory2) {
  return parentNgxRenderService || new NgxRenderService(rendererFactory);
}
/**
 * If there is already a NgxRenderService available, use that. Otherwise, provide a new one.
 */
export const ngxRenderServiceProvider = {  
  provide: NgxRenderService,
  deps: [
    [new Optional(), new SkipSelf(), NgxRenderService],
    RendererFactory2,
  ],
  useFactory: ngxRenderServiceFactory,
};
