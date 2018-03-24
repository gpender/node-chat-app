var socket = io();
socket.on('connect',function(){
    console.log('Connected to server');
});
socket.on('disconnect',function(){
    console.log('Disconnected from server');
});
socket.on('newMessage',function(message){
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`)
    jQuery('#messages').append(li);
    console.log('New Message',message);
});
socket.on('newLocationMessage',function(message){
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');
    li.text(`${message.from}: `);
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
    socket.emit('createMessage',{
        from:'fred',
        text:jQuery('[name=message]').val()
        },
        function(message){
            console.log(message);
        }
    );
});

var locationButton = jQuery('#send-location');
locationButton.on('click',()=>{
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser');
    }
    navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        });
    },function(){
        alert('Unable to fetch location');
    });
})
//www.googlemaps.com/maps?q=50.82296536934156,-0.47751036769027094