const Usuario = require('./Usuario');
const Libro = require('./Libro');
const Prestamo = require('./Prestamo');
const User = require('./User');
const Rol = require('./Rol');
const Permiso = require('./Permiso');
const RolPermiso = require('./RolPermiso');

// Relaciones Usuario - Prestamo
Usuario.hasMany(Prestamo, {
  foreignKey: 'usuario_id'
});
Prestamo.belongsTo(Usuario, {
  foreignKey: 'usuario_id'
});

// Relaciones Libro - Prestamo
Libro.hasMany(Prestamo, {
  foreignKey: 'libro_id'
});
Prestamo.belongsTo(Libro, {
  foreignKey: 'libro_id'
});

// Relaciones User - Rol
User.belongsTo(Rol, {
  foreignKey: 'rol_id'
});
Rol.hasMany(User, {
  foreignKey: 'rol_id'
});

// Relaciones Rol - Permiso (muchos a muchos)
Rol.belongsToMany(Permiso, {
  through: RolPermiso,
  foreignKey: 'rol_id',
  otherKey: 'permiso_id'
});
Permiso.belongsToMany(Rol, {
  through: RolPermiso,
  foreignKey: 'permiso_id',
  otherKey: 'rol_id'
});

module.exports = {
  Usuario,
  Libro,
  Prestamo,
  User,
  Rol,
  Permiso,
  RolPermiso
};