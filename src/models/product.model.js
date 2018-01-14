// NPM modules
import Joi from 'joi'

// Data store
import productStore from './store/product.store'

export const createProductSchema = Joi.object().keys({
  id: Joi.string().required(),
  name: Joi.string().required(),
  price: Joi.number().required()
})

class Product {
  listProducts () {
    return productStore
  }

  createProduct ({ id, name, price }) {
    const { error, value } = Joi.validate({ id, name, price }, createProductSchema)
    if (error) throw error

    productStore.push(value)
  }
}

/*
 * Singleton design pattern
 * This is to keep only one instance of the model.
 * When data has changed, the data remain persistent.
 */
const instance = new Product()

export default instance
