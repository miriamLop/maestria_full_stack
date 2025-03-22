const { Usuario,Tarea } = require('../models');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.obtenerUsuarios = async (req, res) => {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
};

exports.crearUsuario = async (req, res) => {
    const usuario = await Usuario.create(req.body);
    res.status(201).json(usuario);
};

exports.registrarUsuario = async (req, res) => {

    const { nombre, email, password } = req.body;

    console.log('Password: ', password);
    // Encriptar la contraseña antes de guardarla
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    console.log('Password2: ', hashedPassword);

    const usuario = await Usuario.create({ nombre, email, "password": hashedPassword });
    res.status(201).json(usuario);
};

exports.buscarUsuarioId = async (req, res) => {

    const { id } = req.params;
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Objeto no encontrado' });
        }
        res.json(usuario);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor' });

    }


};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ where: { email } });

    console.log("Login: ", email, "  ", password);
    if (!usuario) {
        return res.status(400).json({ message: 'Correo o contraseña incorrectos.' });
    }

    /*const isMatch = await bcrypt.compare(password, usuario.password);

    console.log("Auth: ", isMatch);
    if (!isMatch) {
        return res.status(400).json({ message: 'Correo o contraseña incorrectos.' });
    }*/

    try {
        const isMatch = await bcrypt.compare(password, usuario.password);
        console.log("Auth: ", isMatch);
        if (!isMatch) {
            return res.status(200).json({ 
                status: 'error',
                message: 'Correo o contraseña incorrectos.' 
            });
        }
        const SECRET_KEY = "secreto123";
        //PORT=3000
        const TOKEN_EXPIRATION = "2h";

        // Crear un token JWT
        const token = jwt.sign(
            { id: usuario.id, nombre: usuario.nombre },
            SECRET_KEY,
            { expiresIn: TOKEN_EXPIRATION }

        );

        res.json({ 
            status: 'ok',
            id: usuario.id,
            token 
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor' });

    }

    /*const SECRET_KEY = "secreto123";
    //PORT=3000
    const TOKEN_EXPIRATION = "2h";

    // Crear un token JWT
    const token = jwt.sign(
        { id: usuario.id, nombre: usuario.nombre },
        SECRET_KEY,
        { expiresIn: TOKEN_EXPIRATION }

    );

    res.json({ token });*/
};

exports.login2 = async (req, res) => {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ where: { email } });

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('Password2: ', hashedPassword);

    if (!usuario) {
        return res.status(400).json({ message: 'Correo o contraseña incorrectos.' });
    }

    //const isMatch = await bcrypt.compare(hashedPassword, usuario.password);

    //if (!isMatch) {
    //    return res.status(400).json({ message: 'Correo o contraseña incorrectos.' });
    //}

    const SECRET_KEY = "secreto123";
    //PORT=3000
    const TOKEN_EXPIRATION = "2h";

    // Crear un token JWT
    const token = jwt.sign(
        { id: usuario.id, nombre: usuario.nombre },
        SECRET_KEY,
        { expiresIn: TOKEN_EXPIRATION }
    );

    res.json({ token });
};

//buscar tareas por un determinado idUsuario

exports.listaTareasId = async (req, res) => {
    const { id } = req.params;
    console.log('id:',id);
    try {

        /*
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Objeto no encontrado' });
        }
        */


        const usuario = await Usuario.findByPk(id);
        console.log("Usuario: " , usuario);
/*const usuario = await Usuario.findByPk(usuarioId);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }*/

        const tareas = await Tarea.findAll({
            where: {
                usuarioId: id,
            },
        });

        res.json(tareas);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }

};