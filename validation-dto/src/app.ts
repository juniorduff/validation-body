import {urlencoded,json} from 'body-parser';
import "reflect-metadata";
import { Container } from 'inversify';
import {   InversifyExpressServer} from 'inversify-express-utils';

// declare metadata by @controller annotation
import "./controllers/foo_controller";

// set up container
let container = new Container();

// set up bindings

// create server
let server = new InversifyExpressServer(container);
server.setConfig((app) => {
  // add body parser
  app.use( urlencoded({
    extended: true
  }));
  app.use(json());
});

let app = server.build();
app.listen(3000);
