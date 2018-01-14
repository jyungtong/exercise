// NPM modules
import _ from 'lodash'
import test from 'ava'
import request from 'supertest'

// Helpers
import { beforeEach } from '../../../utils/test-utils'

test.beforeEach(beforeEach)

test('CartController:checkout:unilever', async t => {
  const { app } = t.context

  const response = await request(app)
    .post('/api/carts/checkout')
    .set('x-auth-username', 'unilever')
    .set('x-auth-password', 'unilever')

  const { body: result } = response
  t.true(!!result, 'should have result of checkout')
  t.is(result.total, 934.97)

  // check classic ads 3 for 2 calculation
  const classicAds = _.find(result.products, ['product_id', 'classic'])
  t.true(!!classicAds, 'should found classic ads in cart')
  t.is(classicAds.subtotal, 539.98)
  t.is(classicAds.discount, 269.99)

  // check premium ads pricing without discount
  const premiumAds = _.find(result.products, ['product_id', 'premium'])
  t.true(!!premiumAds, 'should found premium ads in cart')
  t.is(premiumAds.subtotal, 394.99)
  t.is(premiumAds.discount, 0)
})

test('CartController:checkout:apple', async t => {
  const { app } = t.context

  const response = await request(app)
    .post('/api/carts/checkout')
    .set('x-auth-username', 'apple')
    .set('x-auth-password', 'apple')

  const { body: result } = response
  t.true(!!result, 'should have result of checkout')
  t.is(result.total, 1294.96)

  // check standout flat rate
  const standoutAds = _.find(result.products, ['product_id', 'standout'])
  t.true(!!standoutAds, 'should found standout ads in cart')
  t.is(standoutAds.count, 3)
  t.is(standoutAds.subtotal, 899.97)
  t.is(standoutAds.discount, 69)

  // check premium ads pricing without discount
  const premiumAds = _.find(result.products, ['product_id', 'premium'])
  t.true(!!premiumAds, 'should found premium ads in cart')
  t.is(premiumAds.count, 1)
  t.is(premiumAds.subtotal, 394.99)
  t.is(premiumAds.discount, 0)
})

test('CartController:checkout:nike', async t => {
  const { app } = t.context

  const response = await request(app)
    .post('/api/carts/checkout')
    .set('x-auth-username', 'nike')
    .set('x-auth-password', 'nike')

  const { body: result } = response
  t.true(!!result, 'should have result of checkout')
  t.is(result.total, 1519.96)

  // check premium ads pricing without discount
  const premiumAds = _.find(result.products, ['product_id', 'premium'])
  t.true(!!premiumAds, 'should found premium ads in cart')
  t.is(premiumAds.count, 4)
  t.is(premiumAds.subtotal, 1519.96)
  t.is(premiumAds.discount, 60)
})

test('CartController:checkout:ford', async t => {
  const { app } = t.context

  const response = await request(app)
    .post('/api/carts/checkout')
    .set('x-auth-username', 'ford')
    .set('x-auth-password', 'ford')

  const { body: result } = response
  t.true(!!result, 'should have result of checkout')
  t.is(result.total, 4799.84)

  // check premium ads pricing without discount
  const classicAds = _.find(result.products, ['product_id', 'classic'])
  t.true(!!classicAds, 'should found classic ads in cart')
  t.is(classicAds.count, 12)
  t.is(classicAds.subtotal, 2699.9)
  t.is(classicAds.discount, 539.98)

  // check premium ads pricing without discount
  const standoutAds = _.find(result.products, ['product_id', 'standout'])
  t.true(!!standoutAds, 'should found standout ads in cart')
  t.is(standoutAds.count, 3)
  t.is(standoutAds.subtotal, 929.97)
  t.is(standoutAds.discount, 39)

  // check premium ads pricing without discount
  const premiumAds = _.find(result.products, ['product_id', 'premium'])
  t.true(!!premiumAds, 'should found premium ads in cart')
  t.is(premiumAds.count, 3)
  t.is(premiumAds.subtotal, 1169.97)
  t.is(premiumAds.discount, 15)
})
