const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelize');

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

module.exports = msShowroom