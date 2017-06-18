const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
var app = express();
 //this is literally being created whenever we call app because that's how express was configured
var server = http.createServer(app);

var io = socketIO(server); //when you set up IO, you have an route that can accept the information and you also have access to javascript which is avaliable at: localhost:3000/socket.io/socket.io.js

//we are simply playing around with the event listeners to see what they exactly do
io.on('connection', (socket) => { //this socket represents the individual socket rather than all the sockets on the website
    console.log(`New user connected!`);

    socket.on('disconnect', () => {
        console.log("the client has disconnected! :( ");
    });
});

//websockets are persistent networks - meaning that the client and the server keep the communication open as long as they want to

var publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));



server.listen(port, () => {
    console.log(`Listening on localhost:${port}`)
});

