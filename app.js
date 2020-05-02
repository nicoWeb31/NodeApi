const express = require('express');
const app = express();
const mongoose =require('mongoose');
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const expressValidator = require("express-validator");
dotenv.config();

//bring in route
const postRoutes = require('./routes/PostRouter');


//bdd 
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true,useUnifiedTopology: true })
.then(()=> console.log('db connected'))
//other methode
mongoose.connection.on("error",err =>{
    console.log(`BD CONNECTION ERROR :${err.message}`);
});


//midlware
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use('/',postRoutes);
app.use(expressValidator());

const port = process.env.PORT || 8080;
app.listen(port,()=>(console.log(`a node js api is listening on port : ${port}`)))