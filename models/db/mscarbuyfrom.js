const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelize');
const msCarBookKeeping = require('./mscarbookkeeping');

const msCarBuyFrom = sequelize.define('msCarBuyFrom', {
  // Model attributes are defined here
  carBuyFromId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  carBuyFrom: {
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
  tableName: "msCarBuyFrom"
});

msCarBuyFrom.hasOne(msCarBookKeeping, {
  foreignKey: 'carBuyFromId', // Specify the foreign key column in the msShowroom table
});

msCarBookKeeping.belongsTo(msCarBuyFrom, {
  foreignKey: 'carBuyFromId', // Specify the foreign key column in the msShowroom table
});

module.exports = msCarBuyFrom