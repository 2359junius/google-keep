// This file is different from src/knex.js. 
// It is being used by the cli and its main purpose is to run migrations & seeds
module.exports = {
    development: {
        migrations: {tableName: 'knex_migrations'},
        seeds: {tableName: './seeds'},
        client: 'mysql',
        connection: {
            host: '127.0.0.1', 
            user: 'root',
            password: 'Juniusmedia',
            database: 'googlekeep',
            charset: 'utf8'
        }
    }
}

// Change my password