const express = require('express');
const router = express.Router();
const controller = require('../controllers/bookings');
const { auth } = require('../middleware/auth');
const jwtDecode = require("jwt-decode");

router.delete('/delete/:id', auth, async (req, res) => {

  try {
    const jwtInfo = jwtDecode(req.header("Token"));
    const user_id = jwtInfo._id;
    const myBooking = req.body;
    const result = await controller.findBookingForCreateId(user_id);
    if (result.acknowledged) {
      const result = await controller.deleteBooking(myBooking);
      res.send(result);
    } else {
      res.status(400).send(error);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }

  //res.send(await controller.deleteBooking(req.params.id));
});

router.get('/', async (req, res) => {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize): 0;
    const page = req.query.page ? parseInt(req.query.page): 0;
    res.json(await controller.getAllBookings(pageSize, page));
});

router.post('/create/', auth, async(req, res) => {
    try {
      const jwtInfo = jwtDecode(req.header("Token"));
      const user_id = jwtInfo._id;
      const newBooking = req.body;
      newBooking.user_id = user_id;
      const result = await controller.addBooking(newBooking);
      if (result.acknowledged) {
        res.send(result);
      } else {
        res.status(400).send(error);
      }
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
});

module.exports = router;