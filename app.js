const express = require('express');
const app = express();
const morgan = require("morgan");

//bring in route
const {getPosts} = require('./routes/posts');


//bring in route
app.use(morgan("dev"));

app.get('/',getPosts);

const port = 8080;
app.listen(port,()=>(console.log(`a node js api is listening on port : ${port}`)))