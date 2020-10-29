const bcrypt = require('bcryptjs');

const users = [
    {
        name: 'Cluster',
        email: 'cluster@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'John Holy',
        email: 'john@example.com',
        password: bcrypt.hashSync('123456', 10)
    },
    {
        name: 'Hartvez',
        email: 'hartvez@example.com',
        password: bcrypt.hashSync('123456', 10)
    }
]

module.exports = users;