import User from '../../models/user.model'

function list (req, res) {
  return res.json(User.listUsers())
}

function getUser (req, res, next) {
  const {
    username
  } = req.params

  try {
    return res.json(User.getUser({ username }))
  } catch (err) {
    console.log('UserModel:getUser()', err.message)
    return next(err)
  }
}

function createUser (req, res, next) {
  const {
    username,
    password
  } = req.body

  try {
    User.createUser({ username, password })
    return res.send('OK')
  } catch (err) {
    console.log('something wrong', err.message)
    return next(err)
  }
}

function addDiscount (req, res, next) {
  const {
    product_id,
    type,
    x,
    y,
    price,
    username
  } = req.body

  try {
    User.addDiscount({
      discount: {
        product_id,
        type,
        x,
        y,
        price
      },
      username
    })

    return res.json({ message: 'OK' })
  } catch (err) {
    console.log('UserModel:addDiscount()', err.message)
    return next(err)
  }
}

function removeDiscount (req, res, next) {
  const {
    product_id,
    username
  } = req.body

  try {
    User.removeDiscount({
      product_id,
      username
    })

    return res.json({ message: 'OK' })
  } catch (err) {
    console.log('UserModel:removeDiscount()', err.message)
    return next(err)
  }
}

export default {
  list,
  getUser,
  createUser,
  addDiscount,
  removeDiscount
}
