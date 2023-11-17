const express = require('express');
const router = express.Router();
const controller = require('../controllers/bookings');

// router.get('/hola'), async(req, res) => {
//   console.log("hola");
//   res.send(await controller.deleteBooking(req.params.id));
// }

router.delete('/delete/:id', async (req, res) => {
  console.log('-------------');
  res.send(await controller.deleteBooking(req.params.id));
});

router.get('/', async (req, res) => {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize): 0;
    const page = req.query.page ? parseInt(req.query.page): 0;
    res.json(await controller.getAllBookings(pageSize, page));
});

router.post('/create/', async(req, res) => {
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