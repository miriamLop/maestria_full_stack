const { where } = require('sequelize');
const { Tarea } = require('../models');

exports.obtenerTarea = async (req, res) => {
    const tareas = await Tarea.findAll();
    res.json(tareas);
};

exports.crearTarea = async (req, res) => {
    const tarea = await Tarea.create(req.body);
    res.status(201).json(tarea);
};

exports.actualizarTarea = async (req, res) => {
    const { id } = req.params;

    try {

        const tarea = await Tarea.findByPk(id);
        if (!tarea) {
            return res.status(404).json({ mensaje: "Tarea no encontrado" });
        }

        await tarea.update(req.body);
        const tarea2 = await Tarea.findByPk(id);
        res.status(201).json(tarea2);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.eliminarTarea = async (req, res) => {

    const { id } = req.params;

    try {

        const tarea = await Tarea.findByPk(id);
        if (!tarea) {
            return res.status(404).json({ mensaje: "Tarea no encontrado" });
        }

        await tarea.destroy();
        res.status(201).json({ mensaje: "tarea eliminada" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.buscarTareaId = async (req, res) => {
    const { id } = req.params;

    try {

        const tarea = await Tarea.findByPk(id);
        if (!tarea) {
            return res.status(404).json({ mensaje: "Tarea no encontrado" });
        }

        res.json(tarea);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }

};



