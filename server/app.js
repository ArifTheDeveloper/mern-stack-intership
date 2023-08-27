const express  = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const router = require('./Routes/router');
require('./db/conn');

//configure dotenv
dotenv.config();

//configure express to receive form data
app.use(express.json());

//configure cors
app.use(cors());


const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

//configure router 
app.use(router)

// make you server availble for static folder
app.use("/uploads",express.static("./uploads"));

app.listen(port,hostname,()=>{
   console.log(`server is running at http://${hostname}:${port}`);
});
