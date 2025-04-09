const pool = require('../db');

// Obtener todas las tareas
const getAllEmpleados = async (req, res, next) => {
    try {
        const allEmpleados = await pool.query('SELECT * FROM empleados ORDER BY id DESC');
        return res.json(allEmpleados.rows);
    } catch (error) {
        console.error('Error obteniendo todos los empleados:', error);
        next(error); // Manejo de errores global
    }
};

// Obtener un cargo individual
const getEmpleado = async (req, res, next) => { 
    try {
        const { id } = req.params; // Extraer el id de los parámetros
        const result = await pool.query('SELECT * FROM empleados WHERE id = $1', [id]);

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

// Crear un nuevo cargo
const createEmpleado = async (req, res, next) => {
    const { cedula, nombre, apellido, contacto, profesion, cargo } = req.body; // Extraer datos del cuerpo
    try {
        const result = await pool.query(
           'INSERT INTO empleados (cedula, nombre, apellido, contacto, profesion, cargo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [cedula, nombre, apellido, contacto, profesion, cargo]
        );
        return res.status(201).json(result.rows[0]); // Devuelve el cargo creado con código 201
    } catch (error) {
        console.error('Error creando un nuevo empleado:', error);
        next(error); // Manejo de errores global
    }
};

// Actualizar un cargo existente
const updateEmpleado = async (req, res, next) => {
    const { id } = req.params; // Extraer id de los parámetros
    const { cedula, nombre, apellido, contacto, profesion , cargo } = req.body; // Extraer datos del cuerpo

    try {
        const result = await pool.query(
            'UPDATE empleados SET cedula = $1, nombre = $2, apellido = $3, contacto = $4, profesion = $5, cargo = $6 WHERE id = $7 RETURNING *',
            [cedula, nombre, apellido, contacto, profesion, cargo, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'ERROR 404: El empleado no existe o es imposible de encontrar',
            });
        }
        return res.json(result.rows[0]); // Devuelve el cargo actualizado
    } catch (error) {
        console.error(`Error actualizando el empleado ${id}:`, error);
        next(error); // Manejo de errores global
    }
};

// Eliminar un cargo
const deleteEmpleado = async (req, res, next) => {
    const { id } = req.params; // Extraer id de los parámetros

    try {
        const result = await pool.query('DELETE FROM empleados WHERE id = $1', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: 'ERROR 404: El empleado no existe o es imposible de encontrar',
            });
        }
        return res.sendStatus(204); // Devuelve código 204 (sin contenido)
    } catch (error) {
        console.error(`Error eliminando el empleado ${id}:`, error);
        next(error); // Manejo de errores global
    }
};

// Exportar los controladores
module.exports = {
    getAllEmpleados,
    getEmpleado,
    createEmpleado,
    updateEmpleado,
    deleteEmpleado
};
