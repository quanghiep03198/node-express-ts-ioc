import { Request, Response, NextFunction, RequestHandler } from "express";
import { ZodType, ZodError } from "zod";
import HttpStatus from "../constant/http-status";

export class ZodValidation<T> {
  private schema: ZodType<T>;

  constructor(schema: ZodType<T>) {
    this.schema = schema;
  }

  validator() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const parsed = await this.schema.parseAsync(req.body);
        req.body = parsed;
        return next();
      } catch (error) {
        if (error instanceof ZodError) {
          res.status(HttpStatus.UNPROCESSABLE_ENTITY.code).json({
            message: "Validation failed",
            error: error.errors,
          });
        }

        res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).json({
          message: "Validation failed",
          error: error instanceof Error ? error.message : error,
        });
      }
    };
  }
}
