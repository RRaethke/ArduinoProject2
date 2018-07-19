require('dotenv').config()

var config = {
  "development": {
    "username": "root",
    "password": process.env.MYSQL_KEY,
    "database": "sequelize_passport",
    "host": "127.0.0.1",
    "port": 3306,
    "dialect": "mysql",
    pool: {
      max: 5,
      min: 0,
      idle: 20000,
      acquire: 20000
      }
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "port": 3306,
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "port": 3306,
    "dialect": "mysql"
  }
}


module.exports = config;