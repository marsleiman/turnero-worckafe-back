const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');
const validateUser = require('../schemas/userSchema')

router.get('/', async (req, res) => {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize): 0;
    const page = req.query.page ? parseInt(req.query.page): 0;
    console.log("prueba")
    res.json(await controller.getAllUsers(pageSize, page));
});

router.post('/register/', async(req, res) => {
    try {
      const newUser = validateUser(req.body);
      const result = await controller.addUser(newUser);
      res.send(result);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  });

router.post('/login/', async (req, res) => {
  console.log('a ver el body', req.body);
    try {
      const user = await controller.findByCredentials(req.body.email, req.body.password);
      const token = await controller.generateAuthToken(user);
      console.log('token', token);
      res.send({token})
    } catch (error) {
      res.status(401).send("Autenticación fallida")
    }
})


module.exports = router;