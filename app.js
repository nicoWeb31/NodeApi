const express = require('express');
const app = express();

//bring in route
const {getPosts} = require('./routes/posts');


app.get('/',getPosts);

const port = 8080;
app.listen(port,()=>(console.log(`a node js api is listening on port : ${port}`)))