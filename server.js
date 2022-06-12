const express = require('express');

const server = express();


server.all('/', (req, res)=>{

   res.setHeader('Content-Type', 'text/html');

   res.end("hi")
})


function keepAlive(){

   server.listen(5000, ()=>{console.log("Server is online!")});

}


module.exports = keepAlive;
