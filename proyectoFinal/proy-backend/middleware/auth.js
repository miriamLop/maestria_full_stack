//Este archivo es un middleware que se encargará de 
// verificar el token JWT en las solicitudes a rutas protegidas.

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const autenticar = (req, res, next) => {
 // const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
 const token = req.header('Authorization') ?.split(" ")[1];
  
  if (!token) {
    return res.status(403).json({ message: 'Acceso denegado. No hay token.' });
  }
  try {
    const decoded=jwt.verify(token,process.env.JWT_SECRET || "secreto123");
    req.usuario=decoded;
    next();
    
  } catch (error) {
    return res.status(401).json({ message: 'No autorizado' });
  }

 /* jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido.' });
    }
    req.user = user;
    next();
  });*/
};

module.exports = authenticar;