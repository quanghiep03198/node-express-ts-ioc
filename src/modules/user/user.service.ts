import mongoose from "mongoose";
import { UserModel } from "./user.model";
import { IUser } from "./user.interface";
import createHttpError from "http-errors";
import { createUserDTO } from "./DTO/create-user.dto";
import { updateUserDTO } from "./DTO/update-user.dto";

export class UserService {
  static async getAll() {
    return await UserModel.find({});
  }

  static async getById(id: mongoose.Types.ObjectId) {
    const user: IUser | null = await UserModel.findById(id);
    if (!user) throw createHttpError.NotFound("User doesn't exist");
    return user;
  }

  static async create(data: createUserDTO) {
    return await UserModel.create(data);
  }

  static async update(id: mongoose.Types.ObjectId, data: updateUserDTO) {
    const user = await UserModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!user) throw createHttpError.NotFound("User not found");
  }

  static async delete(id: mongoose.Types.ObjectId) {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) throw createHttpError.NotFound("User not found");
    return user;
  }
}
