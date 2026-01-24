const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('demo1', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
})

module.exports = sequelize