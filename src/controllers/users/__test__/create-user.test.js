// NPM modules
import _ from 'lodash'
import test from 'ava'
import request from 'supertest'

// Helpers
import { beforeEach } from '../../../utils/test-utils'

test.beforeEach(beforeEach)

test('UserController:createUser', async t => {
  const { app } = t.context

  const response = await request(app)
    .post('/api/users/create')
    .send({
      username: 'normal',
      password: 'normal'
    })

  t.is(response.text, 'OK')
})

test('UserController:listUsers', async t => {
  const { app } = t.context

  const response = await request(app)
    .get('/api/users/list')

  const { body } = response
  t.true(!!_.find(body, ['username', 'normal']))
})
