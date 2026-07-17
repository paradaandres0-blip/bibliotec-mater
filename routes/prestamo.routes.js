const express = require('express');
const router = express.Router();
const controller = require('../controllers/prestamo.controller');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

// Rutas protegidas - cualquier usuario autenticado puede consultar
router.get('/', authenticate, authorize('ver_prestamos'), controller.getAll);
router.get('/usuario/:usuarioId', authenticate, authorize('ver_prestamos'), controller.getByUsuario);

// Rutas protegidas - solo administradores pueden registrar/devolver préstamos
router.post('/', authenticate, authorize('registrar_prestamo'), controller.create);
router.put('/devolver/:id', authenticate, authorize('registrar_devolucion'), controller.devolver);

module.exports = router;