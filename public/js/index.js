var socket = io();
socket.on('connect',function(){
    console.log('Connected to server');
});
socket.on('disconnect',function(){
    console.log('Disconnected from server');
});
socket.on('newMessage',function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = jQuery('<li></li>');
    li.text(`${formattedTime} ${message.from}: ${message.text}`)
    jQuery('#messages').append(li);
    console.log('New Message',message);
});
socket.on('newLocationMessage',function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');
    li.text(`${formattedTime} ${message.from}: `);
    a.attr('href',message.url);
    li.append(a);
    jQuery('#messages').append(li);
    console.log('New Message',message);
});

// socket.emit('createMessage',{
//     from:'fred',
//     text:'hello'
//     },
//     function(message){
//         console.log(message);
//     }
// );
jQuery('#message-form').on('submit',(e)=>{
    e.preventDefault();
    var messageTextBox = jQuery('[name=message]');
    socket.emit('createMessage',{
        from:'fred',
        text:messageTextBox.val()
        },
        function(message){
            messageTextBox.val('');
            console.log(message);
        }
    );
});

var locationButton = jQuery('#send-location');
locationButton.on('click',()=>{
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser');
    }
    locationButton.attr('disabled','disabled').text('Sending location .......');

    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send location');
        console.log(position);
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        });
    },function(){
        alert('Unable to fetch location');
        locationButton.removeAttr('disabled').text('Send location');
    });
})
//www.googlemaps.com/maps?q=50.82296536934156,-0.47751036769027094