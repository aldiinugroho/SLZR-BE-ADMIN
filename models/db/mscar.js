const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelize');
const msCarImage = require('./mscarimage');
const msCarOtherPrice = require('./mscarotherprice');

const msCar = sequelize.define('msCar', {
  // Model attributes are defined here
  carId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  showroomId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  carBrandId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  carPlate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  carName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  carDescription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  carTransmission: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  carYear: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  carFuel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  carTax: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  carSTNK: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  carBPKB: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  carSellPrice: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  carBuyPrice: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  softdelete: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
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
  tableName: "msCar"
});

msCar.hasMany(msCarImage, {
  foreignKey: 'carId', // Specify the foreign key column in the msShowroom table
});

msCarImage.belongsTo(msCar, {
  foreignKey: 'carId', // Specify the foreign key column in the msShowroom table
});

msCar.hasMany(msCarOtherPrice, {
  foreignKey: 'carId', // Specify the foreign key column in the msShowroom table
});

msCarOtherPrice.belongsTo(msCar, {
  foreignKey: 'carId', // Specify the foreign key column in the msShowroom table
});


module.exports = msCar