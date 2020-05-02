const express = require('express');
const app = express();
const mongoose =require('mongoose');
const morgan = require("morgan");
const dotenv = require("dotenv");
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



//bring in route
app.use(morgan("dev"));

app.use('/',postRoutes);

const port = process.env.PORT || 8080;
app.listen(port,()=>(console.log(`a node js api is listening on port : ${port}`)))