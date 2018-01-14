import test from 'ava'
import request from 'supertest'

import { beforeEach } from '../../../utils/test-utils'
import productStore from '../../../models/store/product.store'

test.beforeEach(beforeEach)

test('ProductController:listProducts', async t => {
  const { app } = t.context

  const response = await request(app)
    .get('/api/products/list')

  const { body } = response
  t.deepEqual(body, productStore)
})
