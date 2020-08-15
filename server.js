const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');

dotenv.config({path:'../config/config.env'});

connectDB();
const bootcamps = require('./routes/bootcamps');
const app = express();

const logger = require('./middleware/logger');

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'));
}
app.use(logger);

app.use('/api/bootcamps', bootcamps);


const PORT = process.env.PORT || 5000;

const server = 
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} port ${PORT}`))