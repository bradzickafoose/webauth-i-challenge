const bcrypt = require('bcryptjs');

const Users = require('../users/users-model');

function restricted(req, res, next) {
    const { username, password } = req.headers;

    if (username && password) {
        Users.findUser({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
            next();
            } else {
            res.status(401).json({ message: 'You shall not pass!' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
    } else {
        res.status(400).json({ message: 'You shall not paass!' });
    }
}

module.exports = restricted;