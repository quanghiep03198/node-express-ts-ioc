import { Request, Response } from "express";
import { UserService } from "./user.service";
import HttpStatus from "../../core/constant/http-status";
import mongoose from "mongoose";
import createHttpError from "http-errors";
import { updateUserDTO } from "./DTO/update-user.dto";
import { CreateUserDTO } from "./DTO/create-user.dto";
import { UseFilter } from "../../core/decorators/exception-filter.decorator";
import { exceptionFilter } from "../../core/filter/exception.filter";

export class UserController {
  @UseFilter()
  static async getAllUsers(_req: Request, res: Response) {
    const users = await UserService.getAll();
    if (users.length === 0)
      throw createHttpError.NotFound("No user is available");
    return res.status(HttpStatus.OK.code).json({
      message: HttpStatus.OK.text,
      data: users,
    });
  }

  static async getUserById(req: Request, res: Response) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw createHttpError.BadRequest("Invalid id format");

    const id = new mongoose.Types.ObjectId(req.params.id);
    const user = await UserService.getById(id);
    return res.status(HttpStatus.OK.code).json({
      message: HttpStatus.OK.text,
      data: user,
    });
  }

  static async createUser(
    req: Request<Record<string, unknown>, CreateUserDTO>,
    res: Response
  ) {
    const user = await UserService.create(req.body.data);
    return res.status(HttpStatus.CREATED.code).json({
      message: HttpStatus.CREATED.text,
      data: user,
    });
  }

  static async updateUser(req: Request, res: Response) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw createHttpError.BadRequest("Invalid id format");

    const id = new mongoose.Types.ObjectId(req.params.id);
    const user = await UserService.update(id, req.body);
    return res.status(HttpStatus.CREATED.code).json({
      message: HttpStatus.CREATED.text,
      data: user,
    });
  }

  static async deleteUser(req: Request, res: Response) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw createHttpError.BadRequest("Invalid id format");

    const id = new mongoose.Types.ObjectId(req.params.id);
    await UserService.delete(id);
    return res.status(HttpStatus.NO_CONTENT.code).json({
      message: HttpStatus.NO_CONTENT.text,
    });
  }
}
