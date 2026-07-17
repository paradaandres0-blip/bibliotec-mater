const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuario.controller');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

// Rutas protegidas - cualquier usuario autenticado puede consultar
router.get('/', authenticate, authorize('ver_usuarios'), controller.getAll);
router.get('/:id', authenticate, authorize('ver_usuarios'), controller.getById);

// Rutas protegidas - solo administradores pueden modificar
router.post('/', authenticate, authorize('crear_usuario'), controller.create);
router.put('/:id', authenticate, authorize('editar_usuario'), controller.update);
router.delete('/:id', authenticate, authorize('eliminar_usuario'), controller.delete);

module.exports = router;