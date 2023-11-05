const users = require('../data/users');

async function getAllUsers(pageSize, page){    
    return users.getAllUsers(pageSize, page);
}

module.exports = {getAllUsers};