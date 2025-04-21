import { NextFunction, Request, RequestHandler, Response } from "express";
import { exceptionFilter } from "../filter/exception.filter";
/**
 * @decorator
 * @param filterFn
 * @returns
 */
export function UseFilter(filterFn?: typeof exceptionFilter) {
  return function (
    target: any,
    property: any,
    descriptor: TypedPropertyDescriptor<any>
  ) {
    try {
      exceptionFilter(descriptor.value);
    } catch (error) {
      console.log(error);
    }
    // console.log(target);
    // console.log(filterFn);
    // console.log("\n\n\n");
  };
}
