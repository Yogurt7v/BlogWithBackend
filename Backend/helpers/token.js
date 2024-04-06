// import jwt from 'jsonwebtoken';
const jwt = require('jsonwebtoken');
const sign = process.env.JWT_SECRET;

module.exports= { generate(data) {
    return jwt.sign(data, sign, {expiresIn: '30d'})  // вообще непонятный кусок
},

 verify(token) {
    return jwt.verify(token, sign)
}
}
