const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Libro = sequelize.define(
  'Libro',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    autor: {
      type: DataTypes.STRING
    },
    anio: {
      type: DataTypes.INTEGER
    }
  },
  {
    tableName: 'libros',
    timestamps: false
  }
);

module.exports = Libro;