const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelize');
const msCarBookKeeping = require('./mscarbookkeeping');

const msCarBookKeepingPaymentTools = sequelize.define('msCarBookKeepingPaymentTools', {
  // Model attributes are defined here
  carBookKeepingPaymentToolsId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  carBookKeepingPaymentTools: {
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
  tableName: "msCarBookKeepingPaymentTools"
});

msCarBookKeepingPaymentTools.hasOne(msCarBookKeeping, {
  foreignKey: 'carBookKeepingPaymentToolsId', // Specify the foreign key column in the msShowroom table
});

msCarBookKeeping.belongsTo(msCarBookKeepingPaymentTools, {
  foreignKey: 'carBookKeepingPaymentToolsId', // Specify the foreign key column in the msShowroom table
});

module.exports = msCarBookKeepingPaymentTools