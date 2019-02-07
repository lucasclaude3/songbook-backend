require('dotenv').config();

module.exports = {
  client: process.env.DB_CLIENT,
  connection: process.env.DB_CONNECTION_STRING,
  migrations: {
    tableName: 'migrations',
  },
  ssl: process.env.DB_SSL,
};
