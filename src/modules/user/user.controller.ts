import { Request, Response, Router } from 'express'
import createHttpError from 'http-errors'
import mongoose from 'mongoose'
import HttpStatus from '../../core/constant/http-status'
import { Controller, Delete, Get, Patch, Post } from '../../core/decorators/controller.decorator'
import { UseExceptionFilter } from '../../core/decorators/exception-filter.decorator'
import { UseZodValidationPipe } from '../../core/decorators/zod-validation.decorator'
import { BaseControllerInterface } from '../../interfaces'
import { createUserDTO, CreateUserDTO } from './dto/create-user.dto'
import { UserService } from './user.service'

/**
 * Should be implemented {@link BaseControllerInterface}
 * @controller
 * @implements {BaseControllerInterface}
 *
 */

@Controller
export class UserController implements BaseControllerInterface {
	private __router__: Router

	constructor() {
		this.__router__ = this.constructor.prototype.router
	}

	public get router(): Router {
		return this.__router__
	}

	@Get('/users')
	@UseExceptionFilter()
	async getAllUsers(_req: Request, res: Response) {
		const users = await UserService.getAll()
		if (users.length === 0) throw createHttpError.NotFound('No user is available')
		res.status(HttpStatus.OK.code).json({
			message: HttpStatus.OK.text,
			data: users
		})
	}

	@Get('/users/:id')
	@UseExceptionFilter()
	async getUserById(req: Request, res: Response) {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) throw createHttpError.BadRequest('Invalid id format')
		const id = new mongoose.Types.ObjectId(req.params.id)
		const user = await UserService.getById(id)
		res.status(HttpStatus.OK.code).json({
			message: HttpStatus.OK.text,
			data: user
		})
	}

	@Post('/users')
	@UseZodValidationPipe(createUserDTO)
	@UseExceptionFilter()
	async createUser(req: Request<Record<string, unknown>, CreateUserDTO>, res: Response) {
		const user = await UserService.create(req.body)
		res.status(HttpStatus.CREATED.code).json({
			message: HttpStatus.CREATED.text,
			data: user
		})
	}

	@Patch('/users/:id')
	@UseExceptionFilter()
	async updateUser(req: Request, res: Response) {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) throw createHttpError.BadRequest('Invalid id format')

		const id = new mongoose.Types.ObjectId(req.params.id)
		const user = await UserService.update(id, req.body)
		return res.status(HttpStatus.CREATED.code).json({
			message: HttpStatus.CREATED.text,
			data: user
		})
	}

	@Delete('/users/:id')
	@UseExceptionFilter()
	async deleteUser(req: Request, res: Response) {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) throw createHttpError.BadRequest('Invalid id format')

		const id = new mongoose.Types.ObjectId(req.params.id)
		await UserService.delete(id)
		return res.status(HttpStatus.NO_CONTENT.code).json({
			message: HttpStatus.NO_CONTENT.text
		})
	}
}
