// user.route.ts
import express, { NextFunction, Request, Response } from "express";
import { exceptionFilter } from "../../core/filter/exception.filter";
import { UserController } from "./user.controller";
import { ZodValidation } from "../../core/pipes/zod-validation.pipe";
import { createUserDTO } from "./DTO/create-user.dto";

class UserRoute {
  static register() {
    const router = express.Router();

    router.get("/users", (req, res) => UserController.getAllUsers(req, res));
    router.get("/users/:id", exceptionFilter(UserController.getUserById));
    router.post(
      "/users",
      new ZodValidation(createUserDTO).validator(),
      exceptionFilter(UserController.createUser)
    );
    return router;
  }
}

export default UserRoute;
