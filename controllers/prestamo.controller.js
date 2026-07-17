const prestamoService = require('../services/prestamo.service');

exports.getAll = async (req, res, next) => {
  try {
    const prestamos = await prestamoService.getAll();
    res.json(prestamos);
  } catch (error) {
    next(error);
  }
};

exports.getByUsuario = async (req, res, next) => {
  try {
    const prestamos = await prestamoService.getByUsuario(req.params.usuarioId);
    res.json(prestamos);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const prestamo = await prestamoService.create(req.body);
    res.status(201).json(prestamo);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

exports.devolver = async (req, res, next) => {
  try {
    const prestamo = await prestamoService.devolver(req.params.id);
    res.json(prestamo);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};