require('dotenv').config();

let connection;
if (process.env.DB_CONNECTION_STRING) {
  connection = process.env.DB_CONNECTION_STRING;
} else {
  connection = {
    host: 'localhost',
    user: 'root',
    password: 'superS0hcaht0@',
    database: 'songbook',
  };
}

module.exports = {
  client: process.env.DB_CLIENT,
  connection,
  migrations: {
    tableName: 'migrations',
  },
  ssl: process.env.DB_SSL,
};
