const moment = require('moment')

/** @param { import('express').Express} app */
module.exports = app => {
  app.get('/', (req, res) => {
    console.log('Server is running!')
    res.json({status: 'Server is running!'})
  })


}
