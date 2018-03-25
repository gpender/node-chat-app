const expect = require('expect');

const {Users} = require('./Users');

describe('Users',()=>{
    var users;
    beforeEach(()=>{
        users = new Users();
        users.users = [{
            id:'1',
            name:'Mike',
            room:'Room1'
        },
        {
            id:'2',
            name:'Fred',
            room:'Room2'
        },
        {
            id:'3',
            name:'John',
            room:'Room1'
        }];
    })
    it('should add a new user',()=>{
        var id = 12345;
        var name = 'Guy';
        var room = 'Room1';
        var users = new Users();

        var newUser = users.addUser(id,name,room);
        expect(users.users[0]).toEqual(newUser);
        expect(newUser.id).toBe(id);
        expect(newUser.name).toBe(name);
        expect(newUser.room).toBe(room);
    });

    it('should remove a user',()=>{
        var originalLength = users.users.length;
        var idToRemove = users.users[0].id;
        var userRemoved = users.removeUser(idToRemove);
        expect(userRemoved.id).toBe(idToRemove);
        expect(users.users.length).toBe(originalLength-1);
    });

    it('should NOT remove a user',()=>{
        var originalLength = users.users.length;
        var idToRemove = 33;
        var userRemoved = users.removeUser(idToRemove);
        expect(userRemoved).toBeFalsy();
        expect(users.users.length).toBe(originalLength);
    });

    it('should find user',()=>{
        var idToFind = users.users[0].id;
        var userFound = users.getUser(idToFind);
        expect(userFound.id).toBe(idToFind);
    })
    it('should NOT find user',()=>{
        var idToFind = 99;
        var userFound = users.getUser(idToFind);
        expect(userFound).toBeFalsy;
    })

    it('should return the names for Room1',()=>{
        var userList = users.getUserList('Room1');
        expect(userList).toEqual(['Mike','John']);
    });
    it('should return the names for Room2',()=>{
        var userList = users.getUserList('Room2');
        expect(userList).toEqual(['Fred']);
    });


})