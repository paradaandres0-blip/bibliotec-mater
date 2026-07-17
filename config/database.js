const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_DATABASE || 'biblioteca',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || '123456',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: false
  }
);

module.exports = sequelize;