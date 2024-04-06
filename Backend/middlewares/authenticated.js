
const {verify} = require('jsonwebtoken')
const User = require('../models/User.js');

 module.exports = async function(req, res, next) {


  const tokenData = verify(req.cookies.token, "testtest");    

  const user = await User.findOne({ _id: tokenData.id });

  if (!user) {
    res.send({ error: "Аутентификация не пройдена" });
    return;
  }

  req.user = user;
  next();
}

// export default authenticated;
