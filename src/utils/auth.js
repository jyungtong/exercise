import User from '../models/user.model'

export default function authUser (req, res, next) {
  const {
    'x-auth-username': username,
    'x-auth-password': password
  } = req.headers

  try {
    const user = User.login({ username, password })
    req.user = user
    return next()
  } catch (err) {
    return next(err)
  }
}
