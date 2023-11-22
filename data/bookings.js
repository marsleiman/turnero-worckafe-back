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
    console.log('db user_id', booking.user_id);
    const newBooking = {
        dia: booking.dia,
        user_id: booking.user_id,
        room_id: booking.room_id,
        capacity: booking.capacity
    }
    const result = await connection
        .db(DATABASE)
        .collection(BOOKINGS)
        .insertOne(newBooking);
    return result;
}

async function deleteBooking(_id) {
    const connection = await conn.getConnection();
    await connection.db(DATABASE).collection(BOOKINGS).deleteOne({'_id': new ObjectId(_id)});
}

async function findBookingForCreateId(_id) {
    const connection = await conn.getConnection();
    const findOneQuery = { _id: new ObjectId(_id) };
    const result = await connection
        .db(DATABASE)
        .collection(BOOKINGS)
        .findOne({_id});
        console.log('---------------------', result);
    return result;
}

module.exports = {getAllBookings, addBooking, deleteBooking, findBookingForCreateId};