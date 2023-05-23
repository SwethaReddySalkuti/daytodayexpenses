const Sequelize = require('sequelize');

const sequelize = new Sequelize('daytoday', 'root', 'password', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
