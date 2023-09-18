const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelize');

const msCarImage = sequelize.define('msCarImage', {
  // Model attributes are defined here
  carImageId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  carId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  carImage: {
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
  tableName: "msCarImage"
});

module.exports = msCarImage