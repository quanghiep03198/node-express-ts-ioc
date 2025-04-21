import { Request, RequestHandler, Response } from 'express'
import createHttpError from 'http-errors'
import mongoose from 'mongoose'
import HttpStatus from '../../core/constant/http-status'
import { UseExceptionFilter } from '../../core/decorators/exception-filter.decorator'
import { UseZodValidationPipe } from '../../core/decorators/zod-validation.decorator'
import { createUserDTO, CreateUserDTO } from './dto/create-user.dto'
import { UserService } from './user.service'

export class UserController {
	@UseExceptionFilter()
	static async getAllUsers(_req: Request, res: Response) {
		const users = await UserService.getAll()
		if (users.length === 0) throw createHttpError.NotFound('No user is available')
		res.status(HttpStatus.OK.code).json({
			message: HttpStatus.OK.text,
			data: users
		})
	}

	@UseExceptionFilter()
	static async getUserById(req: Request, res: Response): Promise<ReturnType<RequestHandler>> {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) throw createHttpError.BadRequest('Invalid id format')

		const id = new mongoose.Types.ObjectId(req.params.id)
		const user = await UserService.getById(id)
		res.status(HttpStatus.OK.code).json({
			message: HttpStatus.OK.text,
			data: user
		})
	}

	@UseZodValidationPipe(createUserDTO)
	@UseExceptionFilter()
	static async createUser(req: Request<Record<string, unknown>, CreateUserDTO>, res: Response) {
		console.log('req.body :>>> ', req.body)
		const user = await UserService.create(req.body)
		res.status(HttpStatus.CREATED.code).json({
			message: HttpStatus.CREATED.text,
			data: user
		})
	}

	static async updateUser(req: Request, res: Response) {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) throw createHttpError.BadRequest('Invalid id format')

		const id = new mongoose.Types.ObjectId(req.params.id)
		const user = await UserService.update(id, req.body)
		return res.status(HttpStatus.CREATED.code).json({
			message: HttpStatus.CREATED.text,
			data: user
		})
	}

	static async deleteUser(req: Request, res: Response) {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) throw createHttpError.BadRequest('Invalid id format')

		const id = new mongoose.Types.ObjectId(req.params.id)
		await UserService.delete(id)
		return res.status(HttpStatus.NO_CONTENT.code).json({
			message: HttpStatus.NO_CONTENT.text
		})
	}
}
