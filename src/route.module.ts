import express, { Application } from 'express'
import { UserController } from './modules/user/user.controller'
// import UserController

type RouteModuleOptions = {
	prefix: string
	app: Application
}

export class RouteModule {
	static async forRootAsync({ prefix, app }: RouteModuleOptions) {
		try {
			const router = express.Router()
			router.use(new UserController().router)
			app.use(prefix, router)
		} catch (error) {
			console.error('[RouteModule]', error instanceof Error ? error.message : error)
		}
	}
}
