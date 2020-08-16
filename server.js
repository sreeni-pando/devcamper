const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const colors = require('colors');
const errorHandler = require('./middleware/error');
dotenv.config({path:'../config/config.env'});

connectDB();
const bootcamps = require('./routes/bootcamps');
const app = express();

app.use(express.json());

const logger = require('./middleware/logger');

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'));
}
app.use(logger);

app.use('/api/bootcamps', bootcamps);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = 
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} port ${PORT}`.yellow));

process.on('unhandledReject',(err, promise) =>{
    console.log(`${err.message}`);
    server.close(()=>process.exit(1));
})