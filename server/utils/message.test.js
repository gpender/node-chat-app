var expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage',()=>{
    it('should generate the correct message object',()=>{
        var from  = 'Guy';
        var text = 'Message Text';
        var message = generateMessage(from,text);
        expect(message).toMatchObject({from,text});
        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
        expect(typeof(message.createAt)).toBe('number');
    });
});
describe('generateLocationMessage',()=>{
    it('should generate the correct message object',()=>{
        var from  = 'Guy';
        var latitude = 50;
        var longitude = 80;
        var url = 'https://www.google.com/maps?q=50,80';
        var message = generateLocationMessage(from,latitude,longitude);
        console.log(message);
        expect(message).toMatchObject({from,url});
        expect(message.from).toBe(from);
        expect(message.url).toBe(url);
        expect(typeof(message.createAt)).toBe('number');
    });
});