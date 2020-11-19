const route = require('express').Router();
const UserController = require('../controllers/userController')


route.get('/register', UserController.register)
route.post('/register', UserController.registerPost)

route.get('/login', UserController.loginGet)
route.post('/login', UserController.loginPost)

module.exports = route