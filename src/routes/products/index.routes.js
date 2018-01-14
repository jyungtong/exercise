// NPM modules
import express from 'express'

// Controllers
import productController from '../../controllers/products/index.controller'

const router = express.Router()

/*
 * GET /api/products/list
 * List all the current products
 */
router.get('/list', productController.list)

/*
 * POST /api/products/create
 * Create new product
 */
router.post('/create', productController.createProduct)

export default router
