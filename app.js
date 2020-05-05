const express = require('express');
const app = express();
const mongoose =require('mongoose');
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
const morgan = require("morgan");
const dotenv = require("dotenv");
const expressValidator = require("express-validator");
dotenv.config();

//bring in route
const postRoutes = require('./routes/PostRouter');
const authRoute = require('./routes/AuthRoute');
const userRoute = require('./routes/UserRoute');



//bdd 
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true,useUnifiedTopology: true })
.then(()=> console.log('db connected'))
//other methode
mongoose.connection.on("error",err =>{
    console.log(`BD CONNECTION ERROR :${err.message}`);
});


//midlware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send('invalid token...');
    }
  });


app.use('/',postRoutes);
app.use("/",authRoute);
app.use("/",userRoute);


const port = process.env.PORT || 8080;
app.listen(port,()=>(console.log(`a node js api is listening on port : ${port}`)))