import app from '../index'

export const beforeEach = async t => {
  t.context.app = app
}
