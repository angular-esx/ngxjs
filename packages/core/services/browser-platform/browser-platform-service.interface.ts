export interface INgxBrowserPlatformService {
  readonly isBrowser: boolean;
  readonly isEdge: boolean;
  readonly isTrident: boolean;
  readonly isBlink: boolean;
  readonly isWebkit: boolean;
  readonly isFirefox: boolean;
  readonly isSafari: boolean;
  readonly isAndroid: boolean;
  readonly isIOS: boolean;
  readonly window: any;
  readonly document: any;
}
