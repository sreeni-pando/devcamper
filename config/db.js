const mongoose = require('mongoose');

const connectDb = async () => {
    const conn = await mongoose.connect('mongodb://localhost:27017/db_devcamper',{
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    });
    console.log(`mongoose connected: ${conn.connection.host}`);
}

module.exports = connectDb;