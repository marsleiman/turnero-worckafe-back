const users = require('../data/users');

async function getAllUsers(pageSize, page){    
    return users.getAllUsers(pageSize, page);
}

async function addUser(user){    
    return users.addUser(user);
}


module.exports = {getAllUsers, addUser};