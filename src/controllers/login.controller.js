const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../db'); // Conexión a la base de datos

const loginUsuario = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        console.log('Datos recibidos:', { username, password });
        // Buscar el usuario por username o email
        const result = await pool.query(
            'SELECT * FROM usuarios WHERE username = $1 OR email = $2',
            [username, username]
        );
        console.log('Resultado de la consulta:', result.rows);

        // Verificar si el usuario existe
        if (result.rows.length === 0) {
            console.log('Usuario no encontrado');
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }

        const user = result.rows[0];
        console.log('Usuario encontrado:', user);

        // Comparar la contraseña ingresada con la almacenada
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('¿Contraseña coincide?:', isMatch);

        if (!isMatch) {
            console.log('Contraseña incorrecta');
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }

        // Generar un token JWT
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET || 'secret', // Clave secreta para firmar el token
            { expiresIn: '1h' } // El token expira en 1 hora
        );
        console.log('Token generado:', token);

        // Login exitoso
        return res.json({
            message: 'Login exitoso',
            token, // Devuelve el token si usas JWT
            user: { id: user.id, username: user.username, role: user.role }
        });
    } catch (error) {
        console.error('Error validando login:', error); // Imprime el error completo
        res.status(500).json({
            message: 'Ocurrió un error interno en el servidor',
            error: error.message // Devuelve el mensaje del error para depuración
        });
    }
};

const logoutUsuario = (req, res) => {
    // Opcional: Si usas una lista de tokens revocados, agrega el token a la lista aquí
    return res.json({ message: 'Sesión cerrada exitosamente' });
};

// Exportar ambos controladores
module.exports = { loginUsuario, logoutUsuario };