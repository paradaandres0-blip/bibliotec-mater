const express = require('express');
const router = express.Router();
const controller = require('../controllers/libro.controller');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

// Rutas protegidas - cualquier usuario autenticado puede consultar
router.get('/', authenticate, authorize('ver_libros'), controller.getAll);
router.get('/:id', authenticate, authorize('ver_libros'), controller.getById);
router.get('/autor/:autor', authenticate, authorize('ver_libros'), controller.getByAutor);

// Rutas protegidas - solo administradores pueden modificar
router.post('/', authenticate, authorize('crear_libro'), controller.create);
router.put('/:id', authenticate, authorize('editar_libro'), controller.update);
router.delete('/:id', authenticate, authorize('eliminar_libro'), controller.delete);

module.exports = router;