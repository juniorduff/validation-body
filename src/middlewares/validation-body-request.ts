import { sanitize } from 'class-sanitizer';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
/**
 * @author Valmir junior and Jardesson Eduardo <valmir.junior@mblabs.com.br>
 */
const goThroughBreadth = (node: ValidationError ) => {
    const frontier = [node];
    const explored: ValidationError[] = [];

    while (frontier.length) {
      // @ts-ignore
      node = frontier.pop();
      explored.push(node);

      // @ts-ignore
      for (const child of node.children) {
        if (!explored.includes(node)) {
          frontier.push(child);
        }
      }
    }


    if(!explored[0].constraints) return;
    // @ts-ignore
  return explored.map((item) => Object.values(item.constraints)[0]);
  };

  export function validateBodyRequest(type: any, skipMissingProperties = false) {

    return async (req: Request, res: Response, next: NextFunction): Promise<Response | NextFunction | void> => {

      const dtoObj = plainToInstance(type, req.body);
      const errors = await validate(dtoObj, { skipMissingProperties });
      console.log("errors",errors);
      if (errors.length && errors[0].constraints) {
        let dtoErrors: string[] = [];
        for (const error of errors) {
          dtoErrors = dtoErrors.concat(goThroughBreadth(error));
        }
        return res.status(400).json({
            message: 'invalid Body',
            errors: dtoErrors.filter(error => error !== undefined && error !== null),
        });

        }
      sanitize(dtoObj);
      req.body = dtoObj;
      return next();
    };
  }
