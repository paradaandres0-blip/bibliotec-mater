require('dotenv').config();
const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

const { logger } = require('./middlewares/logger');
app.use(logger);

// Ruta de prueba / health check (pública)
app.get('/', (req, res) => {
  res.json({
    mensaje: 'API Biblioteca funcionando',
    estado: 'OK',
    version: '1.0.0'
  });
});

// Importar rutas
const authRoutes = require('./routes/auth.routes');
const usuarioRoutes = require('./routes/usuario.routes');
const libroRoutes = require('./routes/libro.routes');
const prestamoRoutes = require('./routes/prestamo.routes');

// Usar rutas
app.use('/auth', authRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/libros', libroRoutes);
app.use('/prestamos', prestamoRoutes);

// Middleware de manejo global de errores (debe ir al final)
const { errorHandler } = require('./middlewares/errorHandler');
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});