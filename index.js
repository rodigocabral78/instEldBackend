require('dotenv').config()
const express = require('express')
const consign = require('consign')
const db = require('./config/database')

const app = express()

app.disable('x-powered-by')

if (process.env.APP_ENV === 'local') {
  const logger = require('morgan')
  app.use(logger('dev'))
}

consign({
  // cwd: 'app',
  cwd: process.cwd(),
  // cwd: process.cwd() + 'app',
  locale: process.env.APP_LOCALE || 'en-us',
  // logger: console,
  verbose: process.env.APP_DEBUG === 'true' || false,
  extensions: ['.js', '.json', '.node']
  // loggingType: 'debug'
})
// consign()
  .include('./config/middlewares/globals')
.then('routes')
.then('app')
.into(app)

app.db = db

const port = process.env.APP_PORT || 3000

app.listen(port, () => {
  console.log(`=> Servidor rodando! app listening at http://localhost:${port}`)
})
