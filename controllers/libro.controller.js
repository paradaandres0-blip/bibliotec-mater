const libroService = require('../services/libro.service');

exports.getAll = async (req, res, next) => {
  try {
    const libros = await libroService.getAll();
    res.json(libros);
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const libro = await libroService.getById(req.params.id);
    if (!libro) {
      return res.status(404).json({ mensaje: 'Libro no encontrado' });
    }
    res.json(libro);
  } catch (error) {
    next(error);
  }
};

exports.getByAutor = async (req, res, next) => {
  try {
    const libros = await libroService.getByAutor(req.params.autor);
    res.json(libros);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const libro = await libroService.create(req.body);
    res.status(201).json(libro);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const libroActualizado = await libroService.update(req.params.id, req.body);
    if (!libroActualizado) {
      return res.status(404).json({ mensaje: 'Libro no encontrado' });
    }
    res.json(libroActualizado);
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const libro = await libroService.delete(req.params.id);
    if (!libro) {
      return res.status(404).json({ mensaje: 'Libro no encontrado' });
    }
    res.json(libro);
  } catch (error) {
    next(error);
  }
};