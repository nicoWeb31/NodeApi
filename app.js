const express = require('express');
const app = express();

app.get('/', (req,res)=>{
    res.send('hello world from node.JS')
})

const port = 8080;
app.listen(port,()=>(console.log(`a node js api is listening on port : ${port}`)))