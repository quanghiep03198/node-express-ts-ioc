import { RequestHandler } from 'express'
import createHttpError, { HttpError } from 'http-errors'
import HttpStatus from '../constant/http-status'

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
