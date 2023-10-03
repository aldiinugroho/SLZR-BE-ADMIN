const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelize');
const msCarBookKeeping = require('./mscarbookkeeping');

const msTransactionPayment = sequelize.define('msTransactionPayment', {
  // Model attributes are defined here
  transactionPaymentId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  midtransTransactionId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  transactionPaymentStatus: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  transactionPaymentBank: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  transactionPaymentAmount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  transactionPaymentVA: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  transactionPaymentExpiry: {
    type: DataTypes.DATE,
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
  tableName: "msTransactionPayment"
});

msTransactionPayment.hasOne(msCarBookKeeping, {
  foreignKey: 'transactionPaymentId', // Specify the foreign key column in the msShowroom table
});

msCarBookKeeping.belongsTo(msTransactionPayment, {
  foreignKey: 'transactionPaymentId', // Specify the foreign key column in the msShowroom table
});

module.exports = msTransactionPayment