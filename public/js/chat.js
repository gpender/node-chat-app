var socket = io();

function scrollToBottom(){
    // Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    
    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if((clientHeight+scrollTop+newMessageHeight + lastMessageHeight) >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect',function(){
    var params = jQuery.deparam(window.location.search);
    socket.emit('join',params, function(error){
        if(error){
            alert(error);
            window.location.href='/';
        }else{
            console.log('Joined Room');
        }
    });
});
socket.on('disconnect',function(){
    console.log('Disconnected from server');
});

socket.on('updateUsersList',function(users){
    var ol = jQuery('<ol></ol>');
    users.forEach(function(user){
        ol.append(jQuery('<li></li>').text(user));        
    });
    jQuery('#users').html(ol);
    console.log('updateUsersList');
    console.log(users);
})

socket.on('newMessage',function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template,{
        text:message.text,
        from:message.from,
        createdAt:formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
    // var formattedTime = moment(message.createdAt).format('h:mm a');
    // var li = jQuery('<li></li>');
    // li.text(`${formattedTime} ${message.from}: ${message.text}`)
    // jQuery('#messages').append(li);
    // console.log('New Message',message);
});
socket.on('newLocationMessage',function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template,{
        url:message.url,
        from:message.from,
        createdAt:formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">My current location</a>');
    // li.text(`${formattedTime} ${message.from}: `);
    // a.attr('href',message.url);
    // li.append(a);
    // jQuery('#messages').append(li);
    // console.log('New Message',message);
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