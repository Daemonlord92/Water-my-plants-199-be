const dotenv = require('dotenv').config('./.env');

module.exports = {

  development: {
    client: 'pg',
    connection: process.env.DB_URL,
    //searchPath: ['knex', 'public'],
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
  },

  staging: {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: {
      directory: './data/migrations'
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: {
      directory: './data/migrations'
    },
  }

};