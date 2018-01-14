// NPM modules
import express from 'express'

// Helpers
import config from './config'
import errorHandler from './utils/error-handler'

// Routes
import routes from './routes/index.routes'

const {
  port,
  isTest
} = config

const app = express()

app.use(express.json())

app.use('/api', routes)

app.use(errorHandler)

/*
 * Listen to random port when in test environment
 * To overcome port clashing issue during parallel test
 */
isTest
  ? app.listen()
  : app.listen(port, () => console.log(`app is connected to port ${port}`))

export default app
