// NPM modules
import test from 'ava'
import _ from 'lodash'

// Helpers and fixtures
import { users, carts } from '../fixture'
import { checkout } from '../checkout'

test('should checkout with 3 for 2 discount', async t => {
  const user = users[0] // unilever
  const cart = carts[0] // unilever's cart

  const result = await checkout({ user, cart })
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

test('should checkout with flat rate', async t => {
  const user = users[1] // apple
  const cart = carts[1] // apple's cart

  const result = await checkout({ user, cart })
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

test('should checkout with 4 and above discount', async t => {
  const user = users[2] // nike
  const cart = carts[2] // nike's cart

  const result = await checkout({ user, cart })
  t.true(!!result, 'should have result of checkout')
  t.is(result.total, 1519.96)

  // check premium ads pricing without discount
  const premiumAds = _.find(result.products, ['product_id', 'premium'])
  t.true(!!premiumAds, 'should found premium ads in cart')
  t.is(premiumAds.count, 4)
  t.is(premiumAds.subtotal, 1519.96)
  t.is(premiumAds.discount, 60)
})

test('should checkout without discount when less than 4', async t => {
  const user = users[2] // nike
  const cart = {
    user_id: 3,
    products: [
      {
        product_id: 'premium',
        count: 3
      }
    ]
  }

  const result = await checkout({ user, cart })
  t.true(!!result, 'should have result of checkout')
  t.is(result.total, 1184.97)

  // check premium ads pricing without discount
  const premiumAds = _.find(result.products, ['product_id', 'premium'])
  t.true(!!premiumAds, 'should found premium ads in cart')
  t.is(premiumAds.count, 3)
  t.is(premiumAds.subtotal, 1184.97)
  t.is(premiumAds.discount, 0)
})

test('should checkout user ford with discount', async t => {
  const user = users[3] // ford
  const cart = carts[3]

  const result = await checkout({ user, cart })
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
