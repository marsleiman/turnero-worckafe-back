const express = require('express');
const router = express.Router();
const controller = require('../controllers/bookings');
const auth = require('../middleware/auth');

router.delete('/delete/:id', auth, async (req, res) => {
  res.send(await controller.deleteBooking(req.params.id));
});

router.get('/', async (req, res) => {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize): 0;
    const page = req.query.page ? parseInt(req.query.page): 0;
    res.json(await controller.getAllBookings(pageSize, page));
});

router.post('/create/', auth, async(req, res) => {
    try {
      const newBooking = req.body;
      const result = await controller.addBooking(newBooking);
      res.send(result);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
});

module.exports = router;