const pool = require('../db')

//solicitar todas las tareas
const getAllCargos = async (req, res, next) => {
    try {
        
        const allCargos = await pool.query('SELECT * FROM cargo ORDER BY id  DESC');
        res.json(allCargos.rows);
    
    } catch (error) {
        next(error)
    }
};

// solicitar individualmente
const getCargo = async (req, res, next) => { 
    try {
        const {idcargo} = req.params
        
        const result = await pool.query('SELECT * FROM cargo WHERE idcargo = $1', [idcargo])
        
        if(result.rows.length === 0) return res.status(404).json({
        message: 'ERROR 404 --> Solicitud no existe o es imposible de encontrar <--'       
    });
        res.json(result.rows[0]);
    } catch (error) {
        next(error)
    }
};

//Crear
const createCargo =  async (req, res, next) => {
    const {nombre, descripcion} = req.body;
        try {
            const  result = await pool.query(
            'INSERT INTO cargo (nombre, descripcion) VALUES ($1, $2) RETURNING *',
            [nombre, descripcion]
        ) ; res.json(result.rows[0]);
    
    } catch (error) {
        next(error) 
    }
};

// Actualizar
const updateCargo = async (req, res, next) => { 

try {
    const { idcargo } = req.params;
    const { nombre, descripcion} = req.body;
    
    const result = await pool.query(
        'UPDATE cargo SET nombre = $1, descripcion = $2 WHERE idcargo = $3 RETURNING *', [nombre, descripcion, idcargo]
    );
    if(result.rows.length === 0)
        return res.status(404).json({
        message: 'ERROR 404 --> Solicitud no existe o es imposible de encontrar <--',
        });
        return res.json(result.rows[0])
    } catch (error) {
    next(error)
    }
};


//Eliminar 
const deleteCargo = async (req, res, next) => { 

    const { idcargo } = req.params;
    try {
    const result = await pool.query('DELETE FROM cargo WHERE idcargo = $1', [idcargo]);
    if(result.rowCount === 0) return res.status(404).json({
        message: 'ERROR 404 --> Solicitud no existe o es imposible de encontrar <--',
    });
    return res.sendStatus(204);
    
    } catch (error) {
        next(error)
    }
};
    


module.exports = {
    getAllCargos,
    getCargo,
    createCargo,
    updateCargo,
    deleteCargo
}

 // codigo se utiliza para verificar si estamos conectados con la base de datos
    // const result = await pool.query('SELECT NOW()') 
    // console.log(result)
    // res.json(result.rows[0].now)