import Joi from 'joi'

/*
 * Schema to validate environment variable from process.env
 */
const envSchema = Joi.object().keys({
  PORT: Joi.number().default(8080),

  NODE_ENV: Joi.string().default('development')
}).unknown()

const { error, value: env } = Joi.validate(process.env, envSchema)
if (error) {
  throw error
}

/*
 * Export validated env
 */
export default {
  port: env.PORT,
  env: env.NODE_ENV,
  isTest: env.NODE_ENV === 'test'
}
