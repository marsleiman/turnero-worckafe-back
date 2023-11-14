const { ObjectId } = require('mongodb');
const conn = require('./conn');
const DATABASE = 'sample_mflix';
const BOOKINGS = 'reservas';


async function getAllBookings(pageSize, page){
    const connectiondb = await conn.getConnection();
    const bookings = await connectiondb
                        .db(DATABASE)
                        .collection(BOOKINGS)
                        .find({}).limit(pageSize).skip(pageSize * page)
                        .toArray();    
    return bookings;
}


async function addBooking(booking){
  
    const connection = await conn.getConnection();
    const result = await connection.db(DATABASE).collection(BOOKINGS).insertOne(booking);
    return result;
}

async function deleteBooking(_id) {
    const connection = await conn.getConnection();
    await connection.db(DATABASE).collection(BOOKINGS).deleteOne({_id});
    console.log("Se eliminó la reserva con id" , _id);
}


module.exports = {getAllBookings, addBooking, deleteBooking};