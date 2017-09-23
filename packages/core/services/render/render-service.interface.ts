import { INgxRenderer } from './renderer.interface';


export interface INgxRenderService {
  createRenderer (nativeElement: any): INgxRenderer;

  listen (
    target: 'window' | 'document' | 'body' | any,
    eventName: string,
    callback: (event: any) => boolean | void
  ): () => void;
}
