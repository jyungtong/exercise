// NPM modules
import test from 'ava'
import request from 'supertest'

// Helpers
import { beforeEach } from '../../../utils/test-utils'
import cartStore from '../../../models/store/cart.store'

test.beforeEach(beforeEach)

test('CartController:listCarts', async t => {
  const { app } = t.context

  const response = await request(app)
    .get('/api/carts/list')

  const { body } = response
  t.deepEqual(body, cartStore)
})

test('CartController:getCart', async t => {
  const { app } = t.context

  const response = await request(app)
    .get('/api/carts/get')
    .set('x-auth-username', 'apple')
    .set('x-auth-password', 'apple')

  const { body } = response
  t.deepEqual(body, cartStore[1])
})
