const { createServer } = require('http');
const express = require('express');
const fs = require('fs');
const { Server } = require("socket.io");
require('dotenv').config()

const app = express();
const httpServer = createServer(app);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/' + 'html'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/' + 'html' + 'index.html')
})

app.get('*', function(req, res){
  res.send('Sorry, this is an invalid URL.');
});

const io = new Server(httpServer);

io.on('connection', (client) => {
  console.log(client.rooms);
  console.log('New client joined.');
  console.log('Room count: ' + client.rooms.size + '\n');
  io.emit('welcome');

  client.on("test", () => {
    console.log("received test"); // not displayed
    io.emit("ok");
  })
  
  client.on("disconnect", () => {
      console.log('Client left. Current total: ' + client.rooms.size);

  });
});

httpServer.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});