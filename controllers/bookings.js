const bookings = require('../data/bookings');


async function addBooking(booking){    
    return bookings.addBooking(booking);
}

async function getAllBookings(pageSize, page){    
    return bookings.getAllBookings(pageSize, page);
}

async function deleteBooking(id) {
    return bookings.deleteBooking(id);
}

async function findBookingForCreateId(_id) {
    return bookings.findBookingForCreateId(_id);
}

module.exports = {getAllBookings, addBooking, deleteBooking, findBookingForCreateId};