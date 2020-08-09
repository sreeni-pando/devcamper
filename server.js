const express = require('express');
const dotenv = require('dotenv');

dotenv.config({path:'./config.env'});

const bootcamps = require('./routes/bootcamps');
const app = express();

app.use('/api/bootcamps', bootcamps);


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} port ${PORT}`))