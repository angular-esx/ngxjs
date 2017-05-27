import { Plugin } from 'webpack';

export = CleanWebpackPlugin;


declare class CleanWebpackPlugin implements Plugin {
  constructor (paths: string[], options?: any);
  apply (): void;
}