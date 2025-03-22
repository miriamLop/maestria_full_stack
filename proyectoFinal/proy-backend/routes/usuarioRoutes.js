const express = require('express');
const router = express.Router();

const { obtenerUsuarios, crearUsuario, buscarUsuarioId, login, registrarUsuario, login2, listaTareasId } = require('../controllers/usuarioController');



router.get('/usuarios', obtenerUsuarios);
router.post('/usuarios', crearUsuario);
router.post('/registrar', registrarUsuario);
router.get('/usuarios/:id',buscarUsuarioId);
router.post('/login', login);
router.post('/login2', login2);
//linea adicionada
router.get('/usuarios/tarea/:id',listaTareasId);


module.exports = router;