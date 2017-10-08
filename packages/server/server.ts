import { enableProdMode } from '@angular/core';

import * as path from 'path';
import * as express from 'express';
import * as compression from 'compression';
import { ngExpressEngine } from '@ngx-universal/express-engine';

import { NgxServerAppModule } from 'ngx-application';


enableProdMode();

const CONTEXT = path.resolve(__dirname, '../../');
const DIST = '_dist/development';

const server: any = express();
server.use(compression());
/**
 * Set view engine
 */
server.engine('html', ngExpressEngine({
  bootstrap: NgxServerAppModule,
}));
server.set('view engine', 'html');
server.set('views', path.join(CONTEXT, DIST));
/**
 * Point static path to `public`
 */
server.use('/', (express as any).static(path.join(CONTEXT, DIST), { index: false }));
/**
 * Catch all routes and return the `index.html`
 */
server.get('*', (req, res) => {
  res.render(`${path.join(CONTEXT, DIST)}/index.html`, { req, res });
});
/**
 * Port & host settings
 */
const PORT = 8080;
const baseUrl = `http://localhost:${PORT}`;
server.set('port', PORT);
/**
 * Begin listening
 */
server.listen(server.get('port'), () => {
  console.log(`Express server listening on ${baseUrl}`);
});
