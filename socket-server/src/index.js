const express = require('express')
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

//connect to

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

const port = 4155 || process.env.PORT;
server.listen(port, () => console.log(`socket.io server is listening on port ${port}`));