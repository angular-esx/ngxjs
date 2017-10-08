import { IEnvironment } from './environment.interface';


if (!process.env.APP_ENVIRONMENT) {
 throw new Error('process.env.APP_ENVIRONMENT is not defined.');
}

export { IEnvironment };

export const environment = JSON.parse(JSON.stringify(process.env.APP_ENVIRONMENT)) as IEnvironment;

