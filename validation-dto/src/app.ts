import "reflect-metadata";

import bodyParser from "body-parser";
import { Container } from "inversify";
import * as prettyjson from "prettyjson";
import { getRouteInfo, InversifyExpressServer } from "inversify-express-utils";

import "./validation.controller";
import {NextFunction , Request, Response} from "express";
import {BodyValidation} from "./errors/body-validation";

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

    app.use(
        (err: Error, request: Request, response: Response, next: NextFunction) => {
            if (err instanceof BodyValidation) {
                console.log(err)
                return response.status(400).json({ message: err.message });
            }
            return response.status(500).json({
                status: "error",
                message: `Internal server error - ${err.message}`,
            });
        }
    );
});

let app = server.build();


const routeInfo = getRouteInfo(container);
console.log(prettyjson.render(routeInfo));
app.listen(3000);
