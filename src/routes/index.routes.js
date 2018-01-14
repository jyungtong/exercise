import express from 'express'

import userRouter from './users/index.routes'
import productRouter from './products/index.routes'
import cartRouter from './carts/index.routes'

const router = express.Router()

/*
 * GET /api/health-check
 */
router.get('/health-check', (req, res) => res.send('OK'))

/*
 * API /api/users
 */
router.use('/users', userRouter)

router.use('/products', productRouter)

router.use('/carts', cartRouter)

export default router
