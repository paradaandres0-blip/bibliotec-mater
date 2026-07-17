const usuarioService = require('../services/usuario.service');

exports.getAll = async (req, res, next) => {
  try {
    const usuarios = await usuarioService.getAll();
    res.json(usuarios);
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const usuario = await usuarioService.getById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const usuario = await usuarioService.create(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const usuarioActualizado = await usuarioService.update(req.params.id, req.body);
    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json(usuarioActualizado);
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const usuario = await usuarioService.delete(req.params.id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    next(error);
  }
};