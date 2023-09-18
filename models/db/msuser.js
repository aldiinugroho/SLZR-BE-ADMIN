const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelize');
const msShowroom = require('./msshowroom');
const msCar = require('./mscar');
// const msAuth = require('./msauth');
// const msAccountDetailAddress = require('./msaccountdetailaddress');
// const msAccountDetailPhone = require('./msaccountdetailphone');

const msUser = sequelize.define('msUser', {
  // Model attributes are defined here
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userEmail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userPassword: {
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
  tableName: "msUser"
});

msUser.hasMany(msShowroom, {
  foreignKey: 'userId', // Specify the foreign key column in the msShowroom table
});

msShowroom.belongsTo(msUser, {
  foreignKey: 'userId', // Specify the foreign key column in the msShowroom table
});

msUser.hasMany(msCar, {
  foreignKey: 'userId', // Specify the foreign key column in the msShowroom table
});

msCar.belongsTo(msUser, {
  foreignKey: 'userId', // Specify the foreign key column in the msShowroom table
});

// msCart.belongsTo(msAccount, {
//   foreignKey: 'accountId', // Specify the foreign key column in the msCart table
// });

// msAccount.hasOne(msAuth, {
//   foreignKey: 'accountId', // Specify the foreign key column in the msCart table
// });
// msAuth.belongsTo(msAccount, {
//   foreignKey: 'accountId', // Specify the foreign key column in the msCart table
// });

// msAccount.hasMany(msAccountDetailAddress, {
//   foreignKey: 'accountId', // Specify the foreign key column in the msCart table
// });
// msAccountDetailAddress.belongsTo(msAccount, {
//   foreignKey: 'accountId', // Specify the foreign key column in the msCart table
// });

// msAccount.hasMany(msAccountDetailPhone, {
//   foreignKey: 'accountId', // Specify the foreign key column in the msCart table
// });
// msAccountDetailPhone.belongsTo(msAccount, {
//   foreignKey: 'accountId', // Specify the foreign key column in the msCart table
// });


module.exports = msUser