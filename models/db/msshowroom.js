const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelize');
const msCar = require('./mscar');

const msShowroom = sequelize.define('msShowroom', {
  // Model attributes are defined here
  showroomId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  showroomName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  showroomAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  showroomPhone: {
    type: DataTypes.STRING,
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
  tableName: "msShowroom"
});

msShowroom.hasMany(msCar, {
  foreignKey: 'showroomId', // Specify the foreign key column in the msShowroom table
});

msCar.belongsTo(msShowroom, {
  foreignKey: 'showroomId', // Specify the foreign key column in the msShowroom table
});

module.exports = msShowroom