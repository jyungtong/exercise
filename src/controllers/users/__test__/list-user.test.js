// NPM modules
import test from 'ava'
import request from 'supertest'

// Helpers
import { beforeEach } from '../../../utils/test-utils'
import userStore from '../../../models/store/user.store'

test.beforeEach(beforeEach)

test('should list users', async t => {
  const { app } = t.context

  const response = await request(app)
    .get('/api/users/list')

  const { body } = response
  t.deepEqual(body, userStore)
})
