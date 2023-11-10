const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');

router.get('/', async (req, res) => {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize): 0;
    const page = req.query.page ? parseInt(req.query.page): 0;
    console.log("prueba")
    res.json(await controller.getAllUsers(pageSize, page));
});

router.post('/register/', async(req, res) => {
    try {
      const newUser = req.body;
      const result = await controller.addUser(newUser);
      res.send(result);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  });

module.exports = router;