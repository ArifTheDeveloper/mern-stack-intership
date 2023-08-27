const mongoose = require('mongoose');
const dotenv = require('dotenv');
//configure dotenv
dotenv.config();

const DB = process.env.MONGODB;

const conn = mongoose.connect(DB,{
    useUnifiedTopology : true,
    useNewUrlParser : true
}).then(()=>console.log("Database connected successfully")).catch((error)=>console.log(error));

