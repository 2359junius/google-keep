// This file is different from knexfile.js
// This is used to connect our server with the database
var config = require('./config')

module.exports = require('knex')(config.db)

