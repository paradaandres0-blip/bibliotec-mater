const { Usuario } = require('../models');

exports.getAll = async () => {
  return await Usuario.findAll({
    order: [['nombre', 'ASC']]
  });
};

exports.getById = async (id) => {
  return await Usuario.findByPk(id);
};

exports.create = async (usuario) => {
  return await Usuario.create({
    nombre: usuario.nombre,
    correo: usuario.correo
  });
};

exports.update = async (id, datos) => {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) {
    return null;
  }
  usuario.nombre = datos.nombre;
  usuario.correo = datos.correo;
  await usuario.save();
  return usuario;
};

exports.delete = async (id) => {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) {
    return null;
  }
  await usuario.destroy();
  return true;
};