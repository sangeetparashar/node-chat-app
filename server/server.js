const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
var { generateMessage, generateLocationMessage } = require('./utils/message');

const port = process.env.PORT || 3000;
var app = express();
 //this is literally being created whenever we call app because that's how express was configured
var server = http.createServer(app);

var io = socketIO(server); //when you set up IO, you have an route that can accept the information and you also have access to javascript which is avaliable at: localhost:3000/socket.io/socket.io.js

////we are simply playing around with the event listeners to see what they exactly do
io.on('connection', (socket) => { //this socket represents the individual socket rather than all the sockets on the website
    console.log(`New user connected!`);

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user has joined the chat!'));
    //    socket.on('disconnect', () => {
    //        console.log("the client has disconnected! :( ");
    //    });

    //    socket.on('creatEmail', function (newEmail) {
    //        console.log('createEmail',newEmail);
    //    });
    //    socket.emit('newEmail', {
    //        from: 'mike@example.com',
    //        text: "HEY! I miss you, what's going on",
    //        createdAt: 123
    //    }); //by default we don't need to emit any data, the second argument is most commonly is your object that you want to sent
    //});


    // one massive difference between socket.emit and io.emit is that socket.emit does it to one connection while io emits it to EVERY single connection
    
   //adding acknowledgements!
    socket.on('createMessage', (message, callback) => {
        console.log(JSON.stringify(message, undefined, 2));
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback(); //we send data back by adding it in the callback 


        //in order to broadcast, lets look at what we have to do , 1) let the io know which individual socket we want to refrain emitting info to
        //its the same syntax, except that it will emit this event to everyone but the socket that the message emits from
        //socket.broadcast.emit('newMessage', {
        //    from: message.from,
        //    text: message.text,
        //    createdAt: new Date().getTime()
        //});
        
    });

    socket.on('createLocationMessage', (message) => {
        console.log(JSON.stringify(message, undefined, 2));
        io.emit('newLocationMessage', generateLocationMessage('Admin', message.latitude,message.longitude));
    });

});
//websockets are persistent networks - meaning that the client and the server keep the communication open as long as they want to

var publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));



server.listen(port, () => {
    console.log(`Listening on localhost:${port}`)
});

