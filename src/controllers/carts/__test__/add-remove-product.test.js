// NPM modules
import _ from 'lodash'
import test from 'ava'
import request from 'supertest'

// Helpers
import { beforeEach } from '../../../utils/test-utils'

test.beforeEach(beforeEach)

test.serial('CartController:addProduct', async t => {
  const { app } = t.context

  /*
   * Add classic ads to the existing cart
   */
  await request(app)
    .post('/api/carts/add')
    .send({
      add: 2,
      product_id: 'classic'
    })
    .set('x-auth-username', 'unilever')
    .set('x-auth-password', 'unilever')

  /*
   * Add standout ads to the cart which is not in the cart yet
   */
  await request(app)
    .post('/api/carts/add')
    .send({
      add: 6,
      product_id: 'standout'
    })
    .set('x-auth-username', 'unilever')
    .set('x-auth-password', 'unilever')

  /*
   * Get user's cart and check the count
   */
  const response = await request(app)
    .get('/api/carts/get')
    .set('x-auth-username', 'unilever')
    .set('x-auth-password', 'unilever')

  const { body: result } = response
  const classicAds = _.find(result.products, ['product_id', 'classic'])
  t.is(classicAds.count, 5)

  const standoutAds = _.find(result.products, ['product_id', 'standout'])
  t.is(standoutAds.count, 6)
})

test.serial('CartController:reduceProduct', async t => {
  const { app } = t.context

  /*
   * Reduce classic ads count from existing cart
   */
  await request(app)
    .post('/api/carts/reduce')
    .send({
      reduce: 1,
      product_id: 'classic'
    })
    .set('x-auth-username', 'unilever')
    .set('x-auth-password', 'unilever')

  /*
   * Reduce standout ads from existing cart
   */
  await request(app)
    .post('/api/carts/reduce')
    .send({
      reduce: 7, // Reduce more than what in the cart will only remove from cart
      product_id: 'standout'
    })
    .set('x-auth-username', 'unilever')
    .set('x-auth-password', 'unilever')

  /*
   * Get user's cart and check the count
   */
  const response = await request(app)
    .get('/api/carts/get')
    .set('x-auth-username', 'unilever')
    .set('x-auth-password', 'unilever')

  const { body: result } = response
  const classicAds = _.find(result.products, ['product_id', 'classic'])
  t.is(classicAds.count, 4)

  const standoutAds = _.find(result.products, ['product_id', 'standout'])
  t.is(standoutAds, undefined)
})

test('CartController:checkout:unilever', async t => {
  const { app } = t.context

  const response = await request(app)
    .post('/api/carts/checkout')
    .set('x-auth-username', 'unilever')
    .set('x-auth-password', 'unilever')

  const { body: result } = response
  t.true(!!result, 'should have result of checkout')
  t.is(result.total, 1204.96)

  // check classic ads 3 for 2 calculation
  const classicAds = _.find(result.products, ['product_id', 'classic'])
  t.true(!!classicAds, 'should found classic ads in cart')
  t.is(classicAds.subtotal, 809.97)
  t.is(classicAds.discount, 269.99)

  // check premium ads pricing without discount
  const premiumAds = _.find(result.products, ['product_id', 'premium'])
  t.true(!!premiumAds, 'should found premium ads in cart')
  t.is(premiumAds.subtotal, 394.99)
  t.is(premiumAds.discount, 0)
})
