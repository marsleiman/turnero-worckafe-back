const Jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const token = req.header("Token");
    console.log('TOKE_----', token);
    console.log('process.env.CLAVE_SECRETA----', process.env.CLAVE_SECRETA);
    Jwt.verify(token, process.env.CLAVE_SECRETA);
    next();
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
}


module.exports = { auth };