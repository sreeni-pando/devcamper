const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const fileupload = require('express-fileupload');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const path = require('path');
const errorHandler = require('./middleware/error');
dotenv.config({path:'./config/config.env'});

connectDB();
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const reviews = require('./routes/reviews');
const authentication = require('./routes/auth');
const app = express();

app.use(express.json());

app.use(cookieParser());

const logger = require('./middleware/logger');

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'));
}
app.use(logger);
app.use(fileupload());
app.use(helmet());
app.use(mongoSanitize())
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/bootcamps', bootcamps);
app.use('/api/courses', courses);
app.use('/api/reviews', reviews);
app.use('/api', authentication );
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = 
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} port ${PORT}`.yellow));

process.on('unhandledReject',(err, promise) =>{
    console.log(`${err.message}`);
    server.close(()=>process.exit(1));
})