const { Prestamo, Usuario, Libro } = require('../models');
const { Op } = require('sequelize');

exports.getAll = async () => {
  return await Prestamo.findAll({
    include: [
      {
        model: Usuario,
        attributes: ['nombre']
      },
      {
        model: Libro,
        attributes: ['titulo']
      }
    ],
    order: [['id', 'ASC']]
  });
};

exports.getByUsuario = async (usuarioId) => {
  return await Prestamo.findAll({
    where: { usuario_id: usuarioId },
    include: [
      {
        model: Usuario,
        attributes: ['nombre']
      },
      {
        model: Libro,
        attributes: ['titulo']
      }
    ],
    order: [['id', 'ASC']]
  });
};

exports.create = async (prestamo) => {
  // Regla de negocio: Validar que el usuario existe
  const usuario = await Usuario.findByPk(prestamo.usuario_id);
  if (!usuario) {
    throw new Error('El usuario no existe.');
  }

  // Regla de negocio: Validar que el libro existe
  const libro = await Libro.findByPk(prestamo.libro_id);
  if (!libro) {
    throw new Error('El libro no existe.');
  }

  // Regla de negocio: Validar que el libro no esté ya prestado
  const prestado = await Prestamo.findOne({
    where: {
      libro_id: prestamo.libro_id,
      fecha_devolucion: null
    }
  });
  if (prestado) {
    throw new Error('El libro ya está prestado.');
  }

  // Regla de negocio: Validar que el usuario no tenga más de 5 préstamos activos
  const activos = await Prestamo.count({
    where: {
      usuario_id: prestamo.usuario_id,
      fecha_devolucion: null
    }
  });
  if (activos >= 5) {
    throw new Error('El usuario ya tiene el máximo de préstamos permitidos (5).');
  }

  return await Prestamo.create({
    usuario_id: prestamo.usuario_id,
    libro_id: prestamo.libro_id,
    fecha_prestamo: prestamo.fecha_prestamo
  });
};

exports.devolver = async (id) => {
  // Regla de negocio: Validar que el préstamo existe
  const prestamo = await Prestamo.findByPk(id);
  if (!prestamo) {
    throw new Error('El préstamo no existe.');
  }

  // Regla de negocio: Validar que el libro no haya sido devuelto ya
  if (prestamo.fecha_devolucion) {
    throw new Error('El préstamo ya fue devuelto.');
  }

  prestamo.fecha_devolucion = new Date().toISOString().split('T')[0];
  await prestamo.save();

  // Retornar con datos del usuario y libro
  return await Prestamo.findByPk(id, {
    include: [
      {
        model: Usuario,
        attributes: ['nombre']
      },
      {
        model: Libro,
        attributes: ['titulo']
      }
    ]
  });
};