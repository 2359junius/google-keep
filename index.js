const Hapi = require('hapi')
const Knex = require('./configs/knex')
const jwt = require('jsonwebtoken')

const server = new Hapi.Server()

server.connection({ port: process.env.PORT || 8888 })

server.register(require('hapi-auth-jwt2'), function(err) {
    if (err) {
        console.log(err)
    }
    
    server.auth.strategy('jwt-auth', 'jwt', {
        // This is a private key which is used to sign and verify the jwt signature
        key: 'thisisasecretkey',
        validateFunc: function(decoded, request, callback) {
            // do your checks (In this case, there is no need for any checks)
            if (!decoded.id) {
              return callback(null, false);
            }
            else {
              return callback(null, true);
            } 
        },
        // We tell the library which algorithm to use for signature & verification
        verifyOptions: {algorithm: ['HS256']}
    })
    
    server.route({
        method: 'POST',
        path: '/api/users',
        config: {
            cors: true
        },
        handler: function(request, reply) {
            const insertOperation = Knex('user')
            .insert({
                username: request.payload.username,
                email: request.payload.email,
                password: request.payload.password
            })
            .then(function() {
                reply({
                    status:'ok'
                })
            })
            .catch(function(err) {
                reply(err)
            })
        }
    })

    server.route({
        method: 'POST',
        path: '/api/auth',
        config: {
            cors: true
        },
        handler: function(request, reply) {
            const getOperation = Knex('user')
            .where({
                email: request.payload.email
            })
            .select('id', 'password')
            .then(function(userArr) {
                var user = userArr[0]
                if (!user) {
                    return reply({
                        error: true,
                        errMessage: 'Please register for an account'
                    })
                }
                if (user.password === request.payload.password) {
                    var token = jwt.sign({
                        // we can add anything we want here
                        id: user.id,
                    },
                    'thisisasecretkey',
                    {
                        algorithm: 'HS256',
                        expiresIn: '1h'
                    })
                    return reply({
                        token: token,
                    })
                } else {
                    return reply({
                        error: true,
                        errMessage: 'Incorrect password'
                    })
                }
            })
            .catch(function(err) {
                reply(err)
            })
        }
    })
    
    server.route({
        method: 'GET',
        path: '/api/notes',
        config: {
            auth: {
                strategy: 'jwt-auth'
            },
            cors: true
        },
        handler: function(request, reply) {
            const id = request.auth.credentials.id
            const getOperation = Knex('note')
            .where({
                owner: request.auth.credentials.id
            })
            .select('id','title','description','updated_at')
            .then(function(noteArr) {
                reply(noteArr)
            })
            .catch(function(err) {
                reply(err)
            })
        }
    })
    
    server.route({
        method: 'POST',
        path: '/api/notes',
        config: {
            auth: {
                strategy: 'jwt-auth'
            },
            cors: true
        },
        handler: function(request, reply) {
            const id = request.auth.credentials.id
            
            const insertOperation = Knex('note')
            .insert({
                title: request.payload.title,
                description: request.payload.description || null,
                owner: id
            })
            .then(function() {
                reply({
                    status:'ok'
                })
            })
            .catch(function(err) {
                reply(err)
            })
        }
    })
    
    server.route({
        method: 'PATCH',
        path: '/api/notes/{noteId}',
        config: {
            auth: {
                strategy: 'jwt-auth'
            },
            cors: true
        },
        handler: function(request, reply) {
            const id = request.auth.credentials.id
            
            const updateOperation = Knex('note')
            .where({
                id: request.params.noteId,
                owner: id
            })
            .update({
                title: request.payload.title,
                description: request.payload.description || null,
            })
            .then(function(rows) {
                reply({
                    status: 'ok'
                })
            })
            .catch(function(err) {
                reply(err)
            })
        }
    })
    
    server.route({
        method: 'DELETE',
        path: '/api/notes/{noteId}',
        config: {
            auth: {
                strategy: 'jwt-auth'
            },
            cors: true
        },
        handler: function(request, reply) {
            const id = request.auth.credentials.id
            
            const updateOperation = Knex('note')
            .where({
                id: request.params.noteId,
                owner: id
            })
            .del()
            .then(function(rows) {
                reply({
                    status: 'ok'
                })
            })
            .catch(function(err) {
                reply(err)
            })
        }
    })
    
    server.start(function() {
        console.log('Server listening at: ', server.info.uri)
    })

})
