const jwt = require('jsonwebtoken');

const generateToken = id => {
    return jwt.sign({id}, 'anykey', {expiresIn:'1d'});
};

module.exports = generateToken;