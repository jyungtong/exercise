// NPM modules
import express from 'express'

// Controllers
import cartController from '../../controllers/carts/index.controller'

// Helpers
import authMiddleware from '../../utils/auth'

const router = express.Router()

/*
 * GET /api/carts/list
 * List all the current carts
 */
router.get('/list', cartController.list)

/*
 * GET /api/carts/get
 * Get user's cart
 */
router.get('/get', authMiddleware, cartController.getCart)

/*
 * POST /api/carts/add
 * Add product to cart
 */
router.post('/add', authMiddleware, cartController.addProduct)

/*
 * POST /api/carts/reduce
 * Reduce product count from cart
 */
router.post('/reduce', authMiddleware, cartController.reduceProduct)

/*
 * POST /api/carts/checkout
 * Checkout from cart
 */
router.post('/checkout', authMiddleware, cartController.checkout)

export default router
