const pool = require('../db');
const bcrypt = require('bcrypt');

// Obtener todas las tareas
const getAllUsuarios = async (req, res, next) => {
    try {
        const allUsuarios = await pool.query('SELECT * FROM usuarios ORDER BY id DESC');
        return res.json(allUsuarios.rows);
    } catch (error) {
        console.error('Error obteniendo todos los Usuarios:', error);
        next(error); // Manejo de errores global
    }
};

// Obtener un usuario individual
const getUsuario = async (req, res, next) => { 
    try {
        const { id } = req.params; // Extraer el id de los parámetros
        const result = await pool.query('SELECT * FROM usuarios WHERE username = $1 OR email = $2', [req.params.id, req.params.id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'ERROR 404: El empleado no existe o es imposible de encontrar',
            });
        }
        return res.json(result.rows[0]);
    } catch (error) {
        console.error(`Error obteniendo el empleado con id ${req.params.id}:`, error);
        next(error); // Manejo de errores global
    }
};

// Crear un nuevo usuario
const createUsuario = async (req, res, next) => {
    const { username, password, email, role } = req.body; // Extraer datos del cuerpo
    try {
        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
           'INSERT INTO usuarios (username, password, email, role) VALUES ($1, $2, $3, $4) RETURNING *',
            [username, hashedPassword, email, role ||'user']
        );

        return res.status(201).json(result.rows[0]); // Devuelve el cargo creado con código 201
    } catch (error) {
        console.error('Error creando un nuevo usuario:', error);
        next(error); // Manejo de errores global
    }
};

// Actualizar un usuario existente
const updateUsuario = async (req, res, next) => {
    const { id } = req.params; // Extraer id de los parámetros
    const { username, password, email, role } = req.body; // Extraer datos del cuerpo

    try {

        let hashedPassword = null;

        if (password) {
            // Encriptar la nueva contraseña si se proporciona
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const result = await pool.query(
            'UPDATE usuarios SET username = $1, password = $2, email = $3, role = $4 WHERE id = $5 RETURNING *',
            [username, hashedPassword || null, email, role, id]
        );

        if (result.rows.length === 0) { // Devuelve el usuario actualizado
            return res.status(404).json({
                message: 'ERROR 404: El usuario no existe o es imposible de encontrar',
            });
        }
        return res.json(result.rows[0]); // Devuelve el cargo actualizado
    } catch (error) {
        console.error(`Error actualizando el usuario ${id}:`, error);
        next(error); // Manejo de errores global
    }
};

// Eliminar un usuario
const deleteUsuario = async (req, res, next) => {
    const { id } = req.params; // Extraer id de los parámetros

    try {
        const result = await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: 'ERROR 404: El usuario no existe o es imposible de encontrar',
            });
        }
        return res.sendStatus(204); // Devuelve código 204 (sin contenido)
    } catch (error) {
        console.error(`Error eliminando el usuario ${id}:`, error);
        next(error); // Manejo de errores global
    }
};

// Exportar los controladores
module.exports = {
    getAllUsuarios,
    getUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario
};
