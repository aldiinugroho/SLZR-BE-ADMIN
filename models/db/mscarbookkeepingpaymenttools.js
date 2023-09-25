const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelize');

const msCarBookKeepingPaymentTools = sequelize.define('msCarBookKeepingPaymentTools', {
  // Model attributes are defined here
  carBookKeepingPaymentToolsId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  carBookKeepingPaymentTools: {
    type: DataTypes.DECIMAL,
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
  tableName: "msCarBookKeepingPaymentTools"
});

module.exports = msCarBookKeepingPaymentTools