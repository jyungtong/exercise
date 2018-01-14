import Cart from '../../models/cart.model'

function list (req, res) {
  return res.json(Cart.listCarts())
}

function getCart (req, res, next) {
  const {
    id: user_id
  } = req.user

  try {
    return res.json(Cart.getCart({ user_id }))
  } catch (err) {
    console.log('CartController:getCart():', err.message)
    return next(err)
  }
}

async function checkout (req, res, next) {
  const {
    id: user_id,
    discounts
  } = req.user

  try {
    const result = await Cart.checkout({
      discounts,
      cart: Cart.getCart({ user_id })
    })

    return res.json(result)
  } catch (err) {
    console.log('CartController:checkout():', err.message)
    return next(err)
  }
}

function addProduct (req, res, next) {
  const {
    id: user_id
  } = req.user

  const {
    add,
    product_id
  } = req.body

  try {
    Cart.addProduct({
      user_id,
      product_id,
      add
    })

    return res.json({ message: 'OK' })
  } catch (err) {
    console.log('CartController:addProduct():', err.message)
    return next(err)
  }
}

function reduceProduct (req, res, next) {
  const {
    id: user_id
  } = req.user

  const {
    reduce,
    product_id
  } = req.body

  try {
    Cart.reduceProduct({
      user_id,
      product_id,
      reduce
    })

    return res.json({ message: 'OK' })
  } catch (err) {
    console.log('CartController:reduceProduct():', err.message)
    return next(err)
  }
}

export default {
  list,
  getCart,
  checkout,
  addProduct,
  reduceProduct
}
