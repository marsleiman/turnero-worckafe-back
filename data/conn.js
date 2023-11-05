require('dotenv').config();
const mongoclient = require('mongodb').MongoClient;
const uri = process.env.MONGODB;
//const client = new mongoclient(uri);
const client = new mongoclient('mongodb+srv://turnero-worckafe:turnero-worckafe@cluster0.lrdtjnb.mongodb.net/?retryWrites=true&w=majority');

let instance = null;

async function getConnection(){
    if(instance == null){
        instance = await client.connect();
    }
    return instance;
}

module.exports = {getConnection};