const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelize');

const msCarOtherPrice = sequelize.define('msCarOtherPrice', {
  // Model attributes are defined here
  carOtherPriceId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  carId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  carOtherPriceName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  carOtherPrice: {
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
  tableName: "msCarOtherPrice"
});

module.exports = msCarOtherPrice