import { DllWebpackConfig } from './_webpack.dll';


const webpackConfig = new DllWebpackConfig().build();
// tslint:disable-next-line: no-default-export
export default webpackConfig;
