import { RequestHandler } from 'express'
import createHttpError, { HttpError } from 'http-errors'
import HttpStatus from '../constant/http-status'

/**
 * @decorator
 * @param validator
 * @returns {MethodDecorator}
 */
export function UseExceptionFilter(): MethodDecorator {
	return function (_target: Object, _property: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
		const originalMethod = descriptor.value
		descriptor.value = function (...args: Parameters<RequestHandler>) {
			try {
				originalMethod.apply(this, args)
			} catch (error) {
				return new AllExceptionFilter().catch(error as Error, args)
			}
		}
		return descriptor
	}
}

interface ExceptionFilter {
	catch: (error: Error | HttpError, args: Parameters<RequestHandler>) => unknown
}

export class AllExceptionFilter implements ExceptionFilter {
	catch(error: Error | HttpError, args: Parameters<RequestHandler>) {
		const [, res] = args
		if (createHttpError.isHttpError(error)) {
			return res.status(error.statusCode).json({
				message: error.message,
				statusCode: error.statusCode
			})
		} else {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).json({
				message: error.message,
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR.code
			})
		}
	}
}
