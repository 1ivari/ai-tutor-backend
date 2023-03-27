const { Sequelize } = require('sequelize');

const dbName = process.env.DB;
const username = process.env.DB_USERNAME;
const pw = process.env.DB_PW;
const host = process.env.DB_HOST;
const dialect = process.env.DB_DIALECT;
const port = process.env.DB_PORT;

const sequelize = new Sequelize(dbName, username, pw, {
  host: host,
  dialect: dialect,
  port: port,
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

testConnection();

module.exports = sequelize;
