import Product from '../../models/product.model'

function list (req, res) {
  return res.json(Product.listProducts())
}

function createProduct (req, res, next) {
  const {
    id,
    name,
    price
  } = req.body

  try {
    Product.createProduct({ id, name, price })
    return res.send('OK')
  } catch (err) {
    console.log('something wrong', err.message)
    return next(err)
  }
}

export default {
  list,
  createProduct
}
