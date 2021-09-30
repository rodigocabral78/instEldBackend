const moment = require('moment')

/** @param { import('express').Express} app */
module.exports = app => {
  app.get('/categories', (req, res) => {
    app.db('categories')

    res.json('Você foi logado com sucesso!')
  })
}
