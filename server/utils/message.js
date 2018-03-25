var moment = require('moment');

var generateMessage = function(from,text){
    return {
        from:from,
        text:text,
        createAt: moment().valueOf()
    };
};
var generateLocationMessage = function(from,latitude,longitude){
    return {
        from:from,
        url:`https://www.google.com/maps?q=${latitude},${longitude}`,
        createAt: moment().valueOf()
    };
};
module.exports = {generateMessage,generateLocationMessage};
