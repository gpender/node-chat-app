const path = require('path');
const http =require('http');    
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);

var io = socketIO(server);

io.on('connection',(socket)=>{
    console.log('New client connected');
    socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
    socket.broadcast.emit('newMessage',generateMessage('Admin','New User joined'));

    socket.on('createMessage',(newMessage,callback)=>{
        console.log('createMessage',newMessage);


        io.emit('newMessage',generateMessage(newMessage.from,newMessage.text));
        callback('Received message OK');
        // socket.broadcast.emit('newMessage',{
        //         from:newMessage.from,
        //         text:newMessage.text,
        //         createdAt:new Date().getTime()
        //     });
    });

    socket.on('disconnect',()=>{
        console.log('Client disconnected');
    });
});

app.use(express.static(publicPath));

server.listen(port,()=>{
    console.log(`Server started on port ${port}`);
})
//const express = require('express');
