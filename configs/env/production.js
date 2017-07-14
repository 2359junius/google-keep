console.log('yo oooooo')
module.exports = {
    db: {
        client: 'mysql',
        connection: process.env.CLEARDB_DATABASE_URL
    }
}