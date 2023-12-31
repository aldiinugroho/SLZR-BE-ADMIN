const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelize');
const msCar = require('./mscar');

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

msCarBrand.hasMany(msCar, {
  foreignKey: 'carBrandId', // Specify the foreign key column in the msShowroom table
});

msCar.belongsTo(msCarBrand, {
  foreignKey: 'carBrandId', // Specify the foreign key column in the msShowroom table
});

module.exports = msCarBrand