const path = require('path');
const http =require('http');    
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);

var io = socketIO(server);
var users = new Users();

io.on('connection',(socket)=>{
    console.log('New client connected');
    // socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
    // socket.broadcast.emit('newMessage',generateMessage('Admin','New User joined'));

    socket.on('join',(params,callback)=>{
        console.log(params);
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room name are required');
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id,params.name,params.room);

        io.to(params.room).emit('updateUsersList',users.getUserList(params.room));
        socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin','New User ' + params.name + ' joined'));
        callback();
    });
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
    socket.on('createLocationMessage',(coords)=>{
        io.emit('newLocationMessage',generateLocationMessage('Fred',coords.latitude,coords.longitude));
    });
    socket.on('disconnect',()=>{
        var user = users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit('updateUsersList',users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left the room`));
        }
        console.log('Client disconnected');
    });
});

app.use(express.static(publicPath));

server.listen(port,()=>{
    console.log(`Server started on port ${port}`);
})
//const express = require('express');
