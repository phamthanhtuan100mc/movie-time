const io = require('socket.io')();

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
  
  io.listen(3000);