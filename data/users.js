const { ObjectId } = require('mongodb');
const conn = require('./conn');
const DATABASE = 'sample_mflix';
const USERS = 'users';

async function getAllUsers(pageSize, page){
    const connectiondb = await conn.getConnection();
    const users = await connectiondb
                        .db(DATABASE)
                        .collection(USERS)
                        .find({}).limit(pageSize).skip(pageSize * page)
                        .toArray();    
    return users;
}

module.exports = {getAllUsers};