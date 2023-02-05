const { createServer } = require('http');
const fs = require('fs');
const { Server } = require("socket.io");
require('dotenv').config()

const port = process.env.PORT || 3000;

const httpServer = createServer((req, res) => {
  fs.readFile('html/index.html', 'utf-8', (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('404: File Not Found');
      return res.end();
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    return res.end();
  });

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