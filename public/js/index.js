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


            //the term broadcasting is something we'll look into now... IT IS A WAY OF EMITTING AN EVENT TO EVERYONE EXCEPT ONE PERSON
        });
        socket.on('newMessage', function (message) {
            var formattedTime = moment(message.createdAt).format('h:mm a');
            var template = jQuery('#message-template').html();
            var html = Mustache.render(template, {
                text: message.text,
                from: message.from,
                createdAt: formattedTime
            });
            jQuery('#messages').append(html);
            //console.log(JSON.stringify(message, undefined, 2));

            //var li = jQuery('<li></li>');
            //li.text(`${message.from} [${formattedTime}]: ${message.text}`);

            //jQuery('#messages').append(li);
        
        });

socket.on('newLocationMessage', function (coords) {
    var formattedTime = moment(coords.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        url: coords.url,
        from: coords.from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
    //var li = jQuery('<li></li>');
    //var a = jQuery('<a target="_blank">My current location<\a>') //the _blank tag tells the browser to open the link in a new tab, not the current tab
    //li.text(`${coords.from} [${formattedTiem}]: `);
    //a.attr('href', coords.url); //you can add and fetch to jQuery
    //li.append(a);
    //jQuery('#messages').append(li);

});
//adding a third argument that is the acknowledgement!
        jQuery('#message-form').on('submit', function (e) {
            e.preventDefault();

            var messageTextbox = jQuery('[name=message]');
            socket.emit('createMessage', {
                from: 'User',
                text: messageTextbox.val()
            }, function () {
                messageTextbox.val('');
                });
        });
var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }
    locationButton.attr('disabled', 'disabled').text('Sending Location...');
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch location');
        });
});

//socket.on('newEmail', function (result) { //the data that is emmitted is a data that can be the first argument in the callback
//    console.log("New email.", JSON.stringify(result, undefined, 2));
//});

