import { RequestHandler } from 'express'
import { z } from 'zod'
import HttpStatus from '../constant/http-status'

/**
 * @decorator
 * @param validator
 * @returns {MethodDecorator}
 */
export function UseZodValidationPipe<T extends z.ZodEffects<z.AnyZodObject> | z.AnyZodObject>(
	validator: T
): MethodDecorator {
	return function (_target: Object, _property: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
		const originalMethod = descriptor.value

		descriptor.value = async function (...args: Parameters<RequestHandler>) {
			const [req, res, next] = args
			try {
				const result = await validator.parseAsync(req.body)
				if (result) req.body = result
				originalMethod.apply(this, [req, res, next])
			} catch (error) {
				if (error instanceof z.ZodError) {
					return res.status(HttpStatus.UNPROCESSABLE_ENTITY.code).json({
						message: error.issues[0].message,
						statusCode: HttpStatus.UNPROCESSABLE_ENTITY.code,
						stack: error.issues
					})
				}
			}
		}

		return descriptor
	}
}
