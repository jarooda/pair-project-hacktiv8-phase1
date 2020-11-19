const routes = require('express').Router()
const Controller = require('../controllers/controller')

routes.get('/', (req, res) => res.send('home'))

// ? menampilkan dahsboard
routes.get('/dashboard/:id', Controller.showDashboard)

// ? menampilkan movie
routes.get('/showMovie/:id', Controller.showMovie)

// ? post saat menambahkan berat badan baru
routes.post('/dashboard/:id', Controller.addWeight)

// ? menampilkan edit user
routes.get('/dashboard/edit/:id', Controller.formEditUser)

// ? post edit user
routes.post('/dashboard/edit/:id', Controller.editUser)

// ? add program
routes.post('/dashboard/addProgram/:id', Controller.addProgram)

// ? delete weight
routes.get('/dashboard/delete/:user/:id', Controller.deleteWeight)

module.exports = routes