// NPM modules
import express from 'express'

// Controllers
import userController from '../../controllers/users/index.controller'

const router = express.Router()

/*
 * GET /api/users/list
 * List all the current users
 */
router.get('/list', userController.list)

/*
 * GET /api/users/get
 * Get single user with user id
 */
router.get('/:username/get', userController.getUser)

/*
 * POST /api/users/create
 * Create new user
 */
router.post('/create', userController.createUser)

/*
 * POST /api/users/discounts/add
 * Add new discount type to the user
 */
router.post('/discounts/add', userController.addDiscount)

/*
 * POST /api/users/discounts/add
 * Remove discount type to the user
 */
router.post('/discounts/remove', userController.removeDiscount)

export default router
