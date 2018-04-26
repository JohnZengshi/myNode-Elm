'use strict';
module.exports = {
    port: 8081,
    url: 'mongodb://localhost:27017/elm',
    session: {
        'secret': 'ruidoc',
        'cookie': {
            'maxAge': 60 * 60 * 1000
        },
        'name': 'elm'
    }
}