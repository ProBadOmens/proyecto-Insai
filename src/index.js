const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const cargoRoutes = require('./routes/cargo.routes');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(cargoRoutes);

app.use((err, req, res, next) => {
    return res.json({message:'ERROR!!!!! Oye Algo No Cuadra'});
});

app.listen(4000)
console.log('Corriendo en el Puerto 4000');