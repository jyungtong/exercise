// NPM modules
import _ from 'lodash'
import Joi from 'joi'

// Data store
import userStore from './store/user.store'

export const userSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required()
})

export const discountSchema = Joi.object().keys({
  product_id: Joi.string().required(),
  type: Joi.string().required().valid(['x-for-y', 'equal-or-more']),
  x: Joi.number().integer().required(),
  y: Joi.number().integer().when('type', {
    is: 'x-for-y',
    then: Joi.required()
  }),
  price: Joi.number().when('type', {
    is: 'equal-or-more',
    then: Joi.required()
  })
})

class User {
  listUsers () {
    return userStore
  }

  getUser ({ username }) {
    const user = _.find(userStore, { username })
    if (!user) throw new Error('not found')

    return user
  }

  createUser ({ username, password }) {
    const { error, value } = Joi.validate({ username, password }, userSchema)
    if (error) throw error

    userStore.push({
      id: userStore.length + 1,
      ...value
    })
  }

  login ({ username, password }) {
    const { error } = Joi.validate({ username, password }, userSchema)
    if (error) throw error

    /*
     * Look up user with given username and password
     */
    const user = _.find(userStore, { username, password })
    if (!user) throw new Error('wrong username or password')

    return user
  }

  addDiscount ({ discount, username }) {
    const { error, value } = Joi.validate(discount, discountSchema)
    if (error) throw error

    const user = this.getUser({ username })

    if (user) {
      const { discounts: userDiscounts } = user
      if (userDiscounts && Array.isArray(userDiscounts)) {
        /*
         * Pull the existing discount to replace later
         */
        _.pullAllBy(userDiscounts, [{ 'product_id': discount.product_id }], 'product_id')

        userDiscounts.push(value)
      } else {
        user.discounts = [value]
      }
    }
  }

  removeDiscount ({ product_id, username }) {
    const user = this.getUser({ username })

    if (user) {
      const { discounts: userDiscounts } = user
      if (userDiscounts && Array.isArray(userDiscounts)) {
        /*
         * Pull the existing discount
         */
        _.pullAllBy(userDiscounts, [{ 'product_id': product_id }], 'product_id')
      }
    }
  }
}

/*
 * Singleton design pattern
 * This is to keep only one instance of the model.
 * When data has changed, the data remain persistent.
 */
const instance = new User()

export default instance
