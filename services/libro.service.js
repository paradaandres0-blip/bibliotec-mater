const { Libro } = require('../models');

exports.getAll = async () => {
  return await Libro.findAll({
    order: [['titulo', 'ASC']]
  });
};

exports.getById = async (id) => {
  return await Libro.findByPk(id);
};

exports.getByAutor = async (autor) => {
  return await Libro.findAll({
    where: { autor }
  });
};

exports.create = async (libro) => {
  return await Libro.create({
    titulo: libro.titulo,
    autor: libro.autor,
    anio: libro.anio
  });
};

exports.update = async (id, datos) => {
  const libro = await Libro.findByPk(id);
  if (!libro) {
    return null;
  }
  libro.titulo = datos.titulo;
  libro.autor = datos.autor;
  libro.anio = datos.anio;
  await libro.save();
  return libro;
};

exports.delete = async (id) => {
  const libro = await Libro.findByPk(id);
  if (!libro) {
    return null;
  }
  await libro.destroy();
  return true;
};