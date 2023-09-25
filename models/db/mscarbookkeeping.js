const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelize');
const msCarLeasing = require('./mscarleasing');

const msCarBookKeeping = sequelize.define('msCarBookKeeping', {
  // Model attributes are defined here
  carBookKeepingId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  carId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  carBuyFromId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  carBookKeepingPaymentToolsId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  carBookKeepingName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  carBookKeepingPhone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  carBookKeepingKTP: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  carBookKeepingSoldPrice: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  carBookKeepingBookedFee: {
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
  tableName: "msCarBookKeeping"
});

msCarBookKeeping.hasOne(msCarLeasing, {
  foreignKey: 'carBookKeepingId', // Specify the foreign key column in the msShowroom table
});

msCarLeasing.belongsTo(msCarBookKeeping, {
  foreignKey: 'carBookKeepingId', // Specify the foreign key column in the msShowroom table
});

module.exports = msCarBookKeeping