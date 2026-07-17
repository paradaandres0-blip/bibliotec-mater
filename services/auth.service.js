const bcrypt = require('bcrypt');
const User = require('../models/User');
const Rol = require('../models/Rol');
const Permiso = require('../models/Permiso');
const { generateToken } = require('../utils/jwt.util');

const register = async ({ username, email, password, rol_id }) => {
  const existingUser = await User.findOne({
    where: { email }
  });
  if (existingUser) {
    throw new Error('El correo ya está registrado');
  }

  const newUser = await User.create({
    username,
    email,
    password,
    rol_id
  });

  const { password: _, ...userWithoutPassword } = newUser.toJSON();
  return userWithoutPassword;
};

const login = async ({ email, password }) => {
  const user = await User.findOne({
    where: { email }
  });

  if (!user) {
    throw new Error('Credenciales inválidas');
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error('Credenciales inválidas');
  }

  // Obtener el rol y permisos del usuario
  const usuarioConRol = await User.findByPk(user.id, {
    include: [{
      model: Rol,
      include: [{
        model: Permiso,
        as: 'permisos'
      }]
    }]
  });

  const permisos = usuarioConRol.Rol.permisos.map(p => p.nombre);

  return generateToken({
    id: user.id,
    username: user.username,
    rol: usuarioConRol.Rol.nombre,
    permisos
  });
};

module.exports = {
  register,
  login
};