const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelize');

const msCarLeasing = sequelize.define('msCarLeasing', {
  // Model attributes are defined here
  carLeasingId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  carBookKeepingId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  carLeasing: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  // Other model options go here
  tableName: "msCarLeasing"
});

module.exports = msCarLeasing