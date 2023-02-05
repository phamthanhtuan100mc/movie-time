const io = require('socket.io')();
require('dotenv').config()

const port = process.env.PORT || 3000;

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
  
  io.listen(port, () => {
    console.log(`Server listening on port: ` + port);
  });
