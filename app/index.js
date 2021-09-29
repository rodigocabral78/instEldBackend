require('dotenv').config()
const express = require('express')
const cors = require('cors')
const compression = require('compression')

const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(compression())
app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.get('/', (_, res) => {
  res.send('Você chamou a rota raiz!')
})

app.listen(process.env.APP_PORT || 3000, () => {
  console.log('Servidor rodando!')
})
