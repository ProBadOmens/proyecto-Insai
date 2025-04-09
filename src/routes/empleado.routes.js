const { Router } = require('express');
const { 
    getAllEmpleados, 
    getEmpleado, 
    createEmpleado, 
    updateEmpleado, 
    deleteEmpleado 
} = require('../controllers/empleado.controller');

const router = Router();
// router.get('/', (req, res) => {
//     res.send('Ruta funcionando correctamente');
// });

// Rutas para los empleados
router
    .route('/')
    .get(getAllEmpleados) // Obtener todos los empleados
    .post(createEmpleado); // Crear un empleado

router
    .route('/:id')
    .get(getEmpleado)      // Obtener un empleado por id
    .put(updateEmpleado)   // Actualizar un empleado
    .delete(deleteEmpleado); // Eliminar un empleado

module.exports = router;
