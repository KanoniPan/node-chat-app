const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
// console.log(__dirname + '/../public'); or like this(way slower)
// console.log(publicPath);

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
const port = process.env.PORT || 3000;
// app.get('/',function(req,res){
//
//      res.sendFile(publicPath + '/index.html');
//
// }); or use like this
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log("New user connected");
  //
  // socket.emit('newMessage', {
  //   from: 'Kanoni',
  //   text: 'Hey wake up!!!!',
  //   createdAt: 1234
  // });

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', () => {
    console.log("User was disconnected")
  });
});
server.listen(port, () => {
  console.log(`Started on port ${port}`);
});
//
// module.exports = {app};
