const Sequelize = require("sequelize");
const secretKey = require("../constant/secretkey");

const Op = Sequelize.Op

const dbConfig = {
    database: secretKey.DB_NAME,
    username: secretKey.DB_USERNAME,
    password: secretKey.DB_PASSWORD,
    host: secretKey.DB_HOST,
    port: secretKey.DB_PORT || 3306,
    dialect: 'mysql',
};

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
        host: dbConfig.host,
        port: dbConfig.port,
        dialect: dbConfig.dialect,
        timezone: '+07:00',
        dialectOptions: {
            dateStrings: true, // Prevent Sequelize from serializing dates to UTC format
            typeCast: true, // Enable type casting for the date fields (optional, but may be needed)
        },
    }
);

const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = {
    sequelize,
    Op,
    connection
}
