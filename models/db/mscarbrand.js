const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelize');

const msCarBrand = sequelize.define('msCarBrand', {
  // Model attributes are defined here
  carBrandId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  carBrandName: {
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
  tableName: "msCarBrand"
});

module.exports = msCarBrand