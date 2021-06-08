
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const postController = require('../controller/postController');

router.get("/", (req, res) => {
  res.send("hello");
});

router.post('/register', userController.registerValidations ,userController.register);

router.post('/login',userController.loginValidations,userController.login);

module.exports = router;
