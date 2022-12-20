import "reflect-metadata";

import bodyParser from "body-parser";
import { Container } from "inversify";
import { getRouteInfo, InversifyExpressServer } from "inversify-express-utils";

import "./validation.controller";

let container = new Container();
let server = new InversifyExpressServer(container);
server.setConfig((app) => {
  // add body parser
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());
});

let app = server.build();
const routeInfo = getRouteInfo(container);
app.listen(3000);
