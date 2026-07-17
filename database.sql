-- ============================================
-- SCRIPT PARA CREAR LA BASE DE DATOS BIBLIOTECA
-- ============================================

CREATE DATABASE biblioteca;

-- Conectar a la base de datos biblioteca y ejecutar:

CREATE TABLE usuarios(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE libros(
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    autor VARCHAR(150) NOT NULL,
    anio INTEGER
);

CREATE TABLE prestamos(
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    libro_id INTEGER NOT NULL,
    fecha_prestamo DATE NOT NULL,
    fecha_devolucion DATE,
    FOREIGN KEY(usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY(libro_id) REFERENCES libros(id)
);

-- ============================================
-- TABLAS PARA SISTEMA DE AUTENTICACIÓN Y AUTORIZACIÓN
-- ============================================

-- Tabla de roles
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL
);

-- Tabla de permisos
CREATE TABLE permisos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL,
    descripcion TEXT
);

-- Tabla intermedia rol_permisos (muchos a muchos)
CREATE TABLE rol_permisos (
    rol_id INTEGER NOT NULL,
    permiso_id INTEGER NOT NULL,
    PRIMARY KEY (rol_id, permiso_id),
    FOREIGN KEY (rol_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (permiso_id) REFERENCES permisos(id) ON DELETE CASCADE
);

-- Tabla de usuarios del sistema (autenticación JWT)
CREATE TABLE "Users" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol_id INTEGER NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    FOREIGN KEY (rol_id) REFERENCES roles(id)
);

-- ============================================
-- DATOS DE PRUEBA - ROLES Y PERMISOS
-- ============================================

-- Insertar roles
INSERT INTO roles(nombre) VALUES ('Administrador'), ('Bibliotecario'), ('Cliente');

-- Insertar permisos base
INSERT INTO permisos(nombre, descripcion) VALUES
('ver_usuarios', 'Ver listado de usuarios'),
('crear_usuario', 'Crear nuevos usuarios'),
('editar_usuario', 'Editar usuarios existentes'),
('eliminar_usuario', 'Eliminar usuarios'),
('ver_libros', 'Ver listado de libros'),
('crear_libro', 'Crear nuevos libros'),
('editar_libro', 'Editar libros existentes'),
('eliminar_libro', 'Eliminar libros'),
('ver_prestamos', 'Ver préstamos'),
('registrar_prestamo', 'Registrar préstamos de libros'),
('registrar_devolucion', 'Registrar devolución de libros');

-- Asignar permisos a Administrador (todos los permisos)
INSERT INTO rol_permisos(rol_id, permiso_id)
SELECT 1, id FROM permisos;

-- Asignar permisos a Bibliotecario (puede gestionar libros y préstamos)
INSERT INTO rol_permisos(rol_id, permiso_id)
SELECT 2, id FROM permisos WHERE nombre IN (
  'ver_usuarios',
  'ver_libros',
  'crear_libro',
  'editar_libro',
  'ver_prestamos',
  'registrar_prestamo',
  'registrar_devolucion'
);

-- Asignar permisos a Cliente (solo puede ver)
INSERT INTO rol_permisos(rol_id, permiso_id)
SELECT 3, id FROM permisos WHERE nombre IN (
  'ver_libros',
  'ver_prestamos'
);

-- ============================================
-- DATOS DE PRUEBA - TABLAS ORIGINALES
-- ============================================

INSERT INTO usuarios(nombre, correo)
VALUES
('Juan Pérez', 'juan@gmail.com'),
('María Gómez', 'maria@gmail.com'),
('Carlos López', 'carlos@gmail.com');

INSERT INTO libros(titulo, autor, anio)
VALUES
('Clean Code', 'Robert C. Martin', 2008),
('Java: How to Program', 'Deitel', 2017),
('Node.js Design Patterns', 'Mario Casciaro', 2022);

INSERT INTO prestamos(usuario_id, libro_id, fecha_prestamo)
VALUES
(1, 1, CURRENT_DATE),
(2, 2, CURRENT_DATE);