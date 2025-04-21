// user.route.ts
import express from 'express'
import { UserController } from './user.controller'

class UserRoute {
	static register() {
		const router = express.Router()

		router.get('/users', UserController.getAllUsers)
		router.get('/users/:id', UserController.getUserById)
		router.post(
			'/users',

			UserController.createUser
		)
		return router
	}
}

export default UserRoute
