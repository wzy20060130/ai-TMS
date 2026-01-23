const sequelize = require("../db")
const { DataTypes } = require("sequelize")

const user = sequelize.define('user', {
  username: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  tableName: 'user',
  timestamps: false
})

module.exports = user