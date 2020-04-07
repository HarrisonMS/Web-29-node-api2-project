const express = require("express");


const server = express();

server.use(express.json())

server.get('/', (req, res) => {
  res.send({api: " server is up and running"})
})



module.exports = server;