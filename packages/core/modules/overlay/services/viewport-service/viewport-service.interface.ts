export interface INgxViewportService {
  getViewportRect (clientRect?: ClientRect): ClientRect;

  getViewportPosition (clientRect?: ClientRect): { top: number, left: number };

  cacheViewportRect (clientRect?: ClientRect): void;
}
