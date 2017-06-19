        var socket = io(); //this method is used to initiate the client connect to open up to the server . We need to store that in a variable
        socket.on('connect', function () {
            console.log('Connected to server');

            //    socket.emit('creatEmail', {
            //        to: 'shay@gmail.com',
            //        text: 'sangeet you mean the world to me, be my bf'

            //    });
            //});

            //socket.on('disconnect', function() {
            //    console.log('Disconnected from the server');
            //});

        });
        socket.on('newMessage', function (message) {
            console.log(JSON.stringify(message, undefined, 2));
        });
socket.on('newEmail', function (result) { //the data that is emmitted is a data that can be the first argument in the callback
    console.log("New email.", JSON.stringify(result, undefined, 2));
});

