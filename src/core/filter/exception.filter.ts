// core/filter/exception.filter.ts
import { NextFunction, Request, RequestHandler, Response } from 'express'
import createHttpError from 'http-errors'

/**
 * @deprecated use `UseExceptionFilter` decorator instead
 * @param executionHandler
 * @returns
 */
export function exceptionFilter(
	executionHandler: (req: Request, res: Response, next?: NextFunction) => Promise<any>
): RequestHandler {
	console.log('handler :>>> ', executionHandler)
	return async (req, res, next) => {
		try {
			await executionHandler(req, res, next)

			if (!res.headersSent) {
				next()
			}
		} catch (error: any) {
			if (createHttpError.isHttpError(error)) {
				const statusCode = typeof error.statusCode === 'number' ? error.statusCode : 500
				res.status(statusCode).json({
					message: error.message,
					statusCode,
					stack: error.stack
				})
			}

			res.status(500).json({
				message: 'Internal server error',
				statusCode: 500
			})
			return
		}
	}
}
