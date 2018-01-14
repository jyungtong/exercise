import _ from 'lodash'
import test from 'ava'
import request from 'supertest'

import { beforeEach } from '../utils/test-utils'

test.beforeEach(beforeEach)

test.serial('Add a new user', async t => {
  const { app } = t.context

  await request(app)
    .post('/api/users/create')
    .send({
      username: 'testuser1',
      password: 'testuser1'
    })

  const response = await request(app)
    .get('/api/users/testuser1/get')

  const { body } = response
  t.is(body.username, 'testuser1')
})

test.serial('Add products to user cart', async t => {
  const { app } = t.context

  /*
   * Add 4 classic product
   */
  await request(app)
    .post('/api/carts/add')
    .send({
      product_id: 'classic',
      add: 6
    })
    .set({
      'x-auth-username': 'testuser1',
      'x-auth-password': 'testuser1'
    })

  /*
   * Add 6 standout product
   */
  await request(app)
    .post('/api/carts/add')
    .send({
      product_id: 'standout',
      add: 6
    })
    .set({
      'x-auth-username': 'testuser1',
      'x-auth-password': 'testuser1'
    })

  /*
   * Add 8 premium product
   */
  await request(app)
    .post('/api/carts/add')
    .send({
      product_id: 'premium',
      add: 8
    })
    .set({
      'x-auth-username': 'testuser1',
      'x-auth-password': 'testuser1'
    })

  /*
   * Remove 2 premium product
   */
  await request(app)
    .post('/api/carts/reduce')
    .send({
      product_id: 'premium',
      reduce: 2
    })
    .set({
      'x-auth-username': 'testuser1',
      'x-auth-password': 'testuser1'
    })

  const response = await request(app)
    .get('/api/carts/get')
    .set({
      'x-auth-username': 'testuser1',
      'x-auth-password': 'testuser1'
    })

  const { body: result } = response
  const classic = _.find(result.products, ['product_id', 'classic'])
  t.is(classic.count, 6)

  const standout = _.find(result.products, ['product_id', 'standout'])
  t.is(standout.count, 6)

  const premium = _.find(result.products, ['product_id', 'premium'])
  t.is(premium.count, 6)
})

test.serial('Checkout without any discount', async t => {
  const { app } = t.context

  const response = await request(app)
    .post('/api/carts/checkout')
    .set({
      'x-auth-username': 'testuser1',
      'x-auth-password': 'testuser1'
    })

  const { body: result } = response
  const classic = _.find(result.products, ['product_id', 'classic'])
  t.is(classic.subtotal, 1619.94)

  const standout = _.find(result.products, ['product_id', 'standout'])
  t.is(standout.subtotal, 1937.94)

  const premium = _.find(result.products, ['product_id', 'premium'])
  t.is(premium.subtotal, 2369.94)
})

test.serial('Add discount to new user', async t => {
  const { app } = t.context

  /*
   * Add '5-for-3' discount for classic product
   */
  await request(app)
    .post('/api/users/discounts/add')
    .send({
      username: 'testuser1',
      product_id: 'classic',
      type: 'x-for-y',
      x: 5,
      y: 3
    })

  /*
   * Add '4 or more' discount for classic product
   */
  await request(app)
    .post('/api/users/discounts/add')
    .send({
      username: 'testuser1',
      product_id: 'standout',
      type: 'equal-or-more',
      x: 5,
      price: 200
    })

  /*
   * Add '8 or more' discount for premium product
   */
  await request(app)
    .post('/api/users/discounts/add')
    .send({
      username: 'testuser1',
      product_id: 'premium',
      type: 'equal-or-more',
      x: 8,
      price: 300
    })

  const response = await request(app)
    .get('/api/users/testuser1/get')

  const { body: result } = response

  const classicDiscount = _.find(result.discounts, ['product_id', 'classic'])
  t.is(classicDiscount.type, 'x-for-y')

  const standoutDiscount = _.find(result.discounts, ['product_id', 'standout'])
  t.is(standoutDiscount.type, 'equal-or-more')

  const premiumDiscount = _.find(result.discounts, ['product_id', 'premium'])
  t.is(premiumDiscount.type, 'equal-or-more')
})

test.serial('Checkout with applied discount', async t => {
  const { app } = t.context

  const response = await request(app)
    .post('/api/carts/checkout')
    .set({
      'x-auth-username': 'testuser1',
      'x-auth-password': 'testuser1'
    })

  const { body: result } = response
  const classic = _.find(result.products, ['product_id', 'classic'])
  t.is(classic.subtotal, 1079.96)

  const standout = _.find(result.products, ['product_id', 'standout'])
  t.is(standout.subtotal, 1200)

  const premium = _.find(result.products, ['product_id', 'premium'])
  t.is(premium.subtotal, 2369.94)
})
