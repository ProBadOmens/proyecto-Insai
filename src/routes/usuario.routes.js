const { Router } = require('express');

const { 
    getAllUsuarios, 
    getUsuario, 
    createUsuario, 
    updateUsuario, 
    deleteUsuario 
} = require('../controllers/usuario.controller');

const verificarToken = require('../verificarToken'); // Importar el middleware
const pool = require('../db');

const router = Router();
// router.get('/', (req, res) => {
//     res.send('Ruta funcionando correctamente');
// });

// Rutas para los empleados
router
    .route('/')
    .get(getAllUsuarios) // Obtener todos los usuarios
    .post(createUsuario); // Crear un usuario

router
    .route('/:id')
    .get(getUsuario)      // Obtener un usuario por id
    .put(updateUsuario)   // Actualizar un usuario
    .delete(deleteUsuario); // Eliminar un usuario

    // Ruta protegida para obtener el usuario autenticado
// router.get('/me', verificarToken, async (req, res, next) => {
//     try {
//         const userId = req.user.id;
//         const result = await pool.query('SELECT id, username, email, role FROM usuarios WHERE id = $1', [userId]);

//         if (result.rows.length === 0) {
//             return res.status(404).json({ message: 'Usuario no encontrado' });
//         }

//         return res.json(result.rows[0]);
//     } catch (error) {
//         console.error('Error obteniendo el usuario autenticado:', error);
//         next(error);
//     }
// });

module.exports = router;
