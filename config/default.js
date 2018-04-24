'use strict';
module.exports = {
    port: 8081,
    url: 'mongodb://localhost:27017/elm',
    session: {
        name: 'John',
        secret: 'John',
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 365 * 24 * 60 * 60 * 1000,
        }
    }
}