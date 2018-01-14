// NPM modules
import _ from 'lodash'
import test from 'ava'
import request from 'supertest'

// Helpers
import { beforeEach } from '../../../utils/test-utils'

test.beforeEach(beforeEach)

test('ProductController:createProduct', async t => {
  const { app } = t.context

  const response = await request(app)
    .post('/api/products/create')
    .send({
      id: 'newproduct',
      name: 'New Product',
      price: 1000
    })

  t.is(response.text, 'OK')
})

test('ProductController:listProducts', async t => {
  const { app } = t.context

  const response = await request(app)
    .get('/api/products/list')

  const { body } = response
  t.true(!!_.find(body, ['id', 'newproduct']))
})
