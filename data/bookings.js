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
    try {
        await connection.db(DATABASE).collection(BOOKINGS).deleteOne({'_id': new ObjectId(_id)});
        return console.log('borrado');
    } catch (error) {
        console.error("No hay reservas para este cliente:", error);
    }
}

async function findBookingForId(_id) {
    const connection = await conn.getConnection();
    try {
        const result = await connection
            .db(DATABASE)
            .collection(BOOKINGS)
            .findOne({'_id': new ObjectId(_id)})
        return result;
    } catch (error) {
        console.error("No hay reservas para este Id:", error);
    }
}

async function findBookingForCreateId(_id) {
    const connection = await conn.getConnection();
    const user_id = new ObjectId(_id);
    try {
        const result = await connection
            .db(DATABASE)
            .collection(BOOKINGS)
            .find({ 'user_id': _id })
            .toArray();
        return result;
    } catch (error) {
        console.error("No hay reservas para este cliente:", error);
    }
}

module.exports = {getAllBookings, addBooking, deleteBooking, findBookingForCreateId, findBookingForId};
