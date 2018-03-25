[{
    id:'hjkjhkj',
    name:'Andrew',
    room:'Room1'
}]

// addUser(id,name,room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users{

    constructor(){
        this.users = [];
    }
    addUser(id,name,room){
        var user = { id,name,room };
        this.users.push(user);
        return user;
    }
    removeUser(id){
        var user = this.getUser(id);
        if(user){
            this.users = this.users.filter((user)=>{
                return user.id !== id;
            });
        }
        return user;
    }
    getUser(id){
        var userToFind = this.users.filter((user)=>{
            return user.id === id;
        });
        return userToFind[0];
    }
    getUserList(room){
        var users = this.users.filter((user)=>{
            return user.room === room;
        });
        var namesArray = users.map((user)=>{
            return user.name;
        });
        return namesArray;
    }

}

module.exports = {Users};
// class Person {
//     constructor(name,room){
//         this.name = name;
//         this.room = room;
//     }
//     getUserDecription(){
//         return ``
//     }
// }

// var me = new Person();