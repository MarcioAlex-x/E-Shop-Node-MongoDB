const { expressjwt } = require('express-jwt')

function authJwt(){
    const secret = process.env.SECRET
    const api = process.env.API_URL
    return expressjwt({
        secret,
        algorithms:['HS256'],
        isRevoked:isRevoked
    }).unless({
        path:[
            {url: /\/api\/v1\/products(.*)/, methods: ['GET','OPTIONS']},
            {url: /\/api\/v1\/categories(.*)/, methods: ['GET','OPTIONS']},
            `${api}/users/login` ,
            `${api}/users/register`
        ]
    })
}

async function isRevoked(req, payload, done) {
    if(!payload.isAdmin){
        return done(null, true)
    }

    return done(null, false)
}

module.exports = authJwt
