require('dotenv').config()

const knex = require('knex')({
  client: process.env.DB_CONNECTION || 'mysql',
  // version: process.env.DB_VERSION || '8.0',
  connection: {
    host : process.env.DB_HOST || '127.0.0.1',
    port : process.env.DB_PORT || 3306,
    database : process.env.DB_DATABASE || 'forge',
    user : process.env.DB_USERNAME || 'forge',
    password : process.env.DB_PASSWORD || ''
  }
})

module.exports = knex
