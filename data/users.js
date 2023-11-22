const { ObjectId } = require('mongodb');
const conn = require('./conn');
const DATABASE = 'sample_mflix';
const USERS = 'users';
const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');

 async function getAllUsers(pageSize, page){
     const connectiondb = await conn.getConnection();
     const users = await connectiondb
                         .db(DATABASE)
                         .collection(USERS)
                         .find({}).limit(pageSize).skip(pageSize * page)
                         .toArray();    
     return users;
 }

async function findByCredentials(email, password){
    const connection = await conn.getConnection();
    const user = await connection
                        .db(DATABASE)
                        .collection(USERS)
                        .findOne({ email });

    // TODO: Sacar mesajes reveladores
    if(!user){
        throw new Error("Usuario no encontrado");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    // TODO: Sacar mesajes reveladores
    if(!isMatch){
        throw new Error("Password no corresponde a usuario");
    }

    return user;
}

function generateAuthToken(user){
    const token = Jwt.sign(
        {
            _id: user._id,
            email: user.email,
            username: user.username
        }, process.env.CLAVE_SECRETA
    );
    return token;
}

async function addUser(user){
    user.password  = await bcrypt.hash(user.password, 8);
    const connection = await conn.getConnection();
    const result = await connection.db(DATABASE).collection(USERS).insertOne(user);
    return result;
}

module.exports = {getAllUsers, findByCredentials, generateAuthToken, addUser};