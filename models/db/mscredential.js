const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelize');

const msCredential = sequelize.define('msCredential', {
  // Model attributes are defined here
  credentialId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  credentialType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  credentialValue: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
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
  tableName: "msCredential"
});

module.exports = msCredential