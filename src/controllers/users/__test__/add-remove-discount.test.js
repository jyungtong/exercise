// NPM modules
// import _ from 'lodash'
import test from 'ava'
import request from 'supertest'

// Helpers
import { beforeEach } from '../../../utils/test-utils'

// Data store
import userStore from '../../../models/store/user.store'

test.beforeEach(t => {
  beforeEach(t)

  userStore.push({
    id: userStore.length + 1,
    username: 'newuser',
    password: 'newuser'
  })
})

test.serial('UserController:addDiscount', async t => {
  const { app } = t.context

  await request(app)
    .post('/api/users/discounts/add')
    .send({
      product_id: 'classic',
      type: 'x-for-y',
      x: 5,
      y: 2,
      username: 'newuser'
    })

  const response = await request(app)
    .get('/api/users/newuser/get')

  const { body: result } = response
  const discount = result.discounts[0]
  t.is(discount.product_id, 'classic')
  t.is(discount.type, 'x-for-y')

  /*
   * Add classic product to the user
   */
  await request(app)
    .post('/api/carts/add')
    .send({
      product_id: 'classic',
      add: 5
    })
    .set('x-auth-username', 'newuser')
    .set('x-auth-password', 'newuser')

  /*
   * Test for the price checkout
   */
  const checkoutResp = await request(app)
    .post('/api/carts/checkout')
    .set('x-auth-username', 'newuser')
    .set('x-auth-password', 'newuser')

  const { body: checkoutResult } = checkoutResp
  t.true(!!checkoutResult, 'should have result of checkout')
  t.is(checkoutResult.total, 539.98)
})

test('UserController:removeDiscount', async t => {
  const { app } = t.context

  await request(app)
    .post('/api/users/discounts/remove')
    .send({
      product_id: 'classic',
      username: 'newuser'
    })

  const response = await request(app)
    .get('/api/users/newuser/get')

  const { body: result } = response
  t.is(result.discounts.length, 0)

  /*
   * Test for the price checkout
   */
  const checkoutResp = await request(app)
    .post('/api/carts/checkout')
    .set('x-auth-username', 'newuser')
    .set('x-auth-password', 'newuser')

  const { body: checkoutResult } = checkoutResp
  t.true(!!checkoutResult, 'should have result of checkout')
  t.is(checkoutResult.total, 1349.95)
})
