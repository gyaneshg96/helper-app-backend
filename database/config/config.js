require('dotenv').config();

module.exports = {
  /*development: {
    "username": "postgres",
    "password": "sallubhai",
    "database": "postgres",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },*/
  development: {
    "username": "admin",
    "password": "password",
    "database": "helper_app",
    "host": "localhost",
    "dialect": "postgres"
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres'
  },
  production: {
    "username": "admin",
    "password": "password",
    "database": "helper_app",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
};
