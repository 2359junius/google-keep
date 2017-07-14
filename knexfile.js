// This file is different from src/knex.js. 
// It is being used by the cli and its main purpose is to run migrations & seeds
var config = require('./config')

module.exports = {
    development: {
        migrations: {tableName: 'knex_migrations'},
        seeds: {tableName: './seeds'},
        client: config.db.client,
        connection: config.db.connection
    }
}
