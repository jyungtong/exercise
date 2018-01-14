// NPM modules
import _ from 'lodash'
import Joi from 'joi'

// Models
import Product from './product.model'

// Helpers
import checkoutUtils from './utils/checkout'

// Data store
import cartStore from './store/cart.store'

export const addCartSchema = Joi.object().keys({
  product_id: Joi.string().required(),
  add: Joi.number().integer().required()
})

export const reduceCartSchema = Joi.object().keys({
  product_id: Joi.string().required(),
  reduce: Joi.number().integer().required()
})

class Cart {
  listCarts () {
    return cartStore
  }

  getCart ({ user_id: userId }) {
    return _.find(cartStore, ['user_id', userId])
  }

  async checkout ({ discounts, cart }) {
    const result = await checkoutUtils({
      discounts,
      cart,
      products: Product.listProducts()
    })

    return result
  }

  addProduct ({ user_id, product_id: productId, add }) {
    const { error } = Joi.validate({ product_id: productId, add }, addCartSchema)
    if (error) throw error

    let cart = this.getCart({ user_id })

    if (!cart) {
      /*
       * Create a new cart for user if cart is not found
       * and add the product count into the cart
       */
      cartStore.push({
        user_id,
        products: [
          {
            product_id: productId,
            count: add
          }
        ]
      })
    } else {
      /*
       * Proceed with existing cart if the user already has cart
       */
      let product = _.find(cart.products, ['product_id', productId])
      if (!product) {
        /*
         * If the product is not exist in the cart previously, create it
         */
        cart.products.push({
          product_id: productId,
          count: add
        })
      } else {
        /*
         * Else proceed to add the product count
         */
        product.count += add
      }
    }
  }

  reduceProduct ({ user_id, product_id: productId, reduce }) {
    const { error } = Joi.validate({ product_id: productId, reduce }, reduceCartSchema)
    if (error) throw error

    let cart = this.getCart({ user_id })

    /*
     * Do things only when cart of the user exists
     */
    if (cart) {
      let product = _.find(cart.products, ['product_id', productId])

      if (product) {
        const newCount = product.count - reduce
        if (newCount > 0) {
          product.count = newCount
        } else {
          /*
           * Remove the product from cart if the count is less than or equal 0
           */
          _.pullAllBy(cart.products, [{ 'product_id': productId }], 'product_id')
        }
      }
    }
  }
}

/*
 * Singleton design pattern
 * This is to keep only one instance of the model.
 * When data has changed, the data remain persistent.
 */
const instance = new Cart()

export default instance
