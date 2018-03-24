var generateMessage = function(from,text){
    return {
        from:from,
        text:text,
        createAt: new Date().getTime()
    };
};
var generateLocationMessage = function(from,latitude,longitude){
    return {
        from:from,
        url:`https://www.google.com/maps?q=${latitude},${longitude}`,
        createAt: new Date().getTime()
    };
};
module.exports = {generateMessage,generateLocationMessage};
//www.googlemaps.com/maps?q=50.82296536934156,-0.47751036769027094
