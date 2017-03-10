/* eslint-disable import/prefer-default-export */
import { DllWebpackConfig } from './_webpack.dll';


const webpackConfig = new DllWebpackConfig().build();
export default webpackConfig;
