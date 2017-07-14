// This file is different from knexfile.js
// This is used to connect our server with the database
module.exports = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'Juniusmedia',
        database: 'googlekeep',
        charset: 'utf8'
    }
})

