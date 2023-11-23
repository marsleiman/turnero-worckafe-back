const express = require("express");
const router = express.Router();
const controller = require("../controllers/bookings");
const { auth } = require("../middleware/auth");
const jwtDecode = require("jwt-decode");

router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const jwtInfo = jwtDecode(req.header("Token"));
    const user_id = jwtInfo._id;
    const resultForId = await controller.findBookingForId(req.params.id);
    if (resultForId && resultForId.user_id === user_id) {
      await controller.deleteBooking(req.params.id);
      res.render("index", { title: "BORRADO" });
    } else {
      console.log("El ID no coincide o no hay reservas");
      res.status(404);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.get("/find/:id", auth, async (req, res) => {
  res.json(await controller.findBookingForId(req.params.id));
});

router.get("/find-for-user", auth, async (req, res) => {
  try {
    const jwtInfo = jwtDecode(req.header("Token"));
    const user_id = jwtInfo._id;
    const result = await controller.findBookingForCreateId(user_id);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  res.json(await controller.getAllBookings(pageSize, page));
});

router.post("/create/", auth, async (req, res) => {
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
