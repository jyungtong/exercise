import test from 'ava'
import User from '../user.model'

test('UserModel:login:success', t => {
  const user = User.login({ username: 'apple', password: 'apple' })
  t.is(user.username, 'apple')
})

test('UserModel:login:fail', t => {
  const error = t.throws(() => {
    User.login({ username: 'apple', password: 'wrongpassword' })
  })

  t.is(error.message, 'wrong username or password')
})
