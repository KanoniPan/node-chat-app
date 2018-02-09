const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
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
  // socket.emit('newMessage', {
  //   from: 'Admin',
  //   text: 'Welcome to the chat app',
  //   createdAt: new Date().getTime()
  // });
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
  // socket.broadcast.emit('newMessage', {
  //   from: 'Admin',
  //   text: 'New User joined the chat app',
  //   createdAt: new Date().getTime()
  // })

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User joined'));

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    // io.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server.');
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('createLocationMessage', (coords) => {
    //`${coords.latitude},${coords.longitude}`
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  })

  socket.on('disconnect', () => {
    console.log("User was disconnected")
  });
});
server.listen(port, () => {
  console.log(`Started on port ${port}`);
});
//
// module.exports = {app};
