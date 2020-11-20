const routes = require('express').Router()
const Controller = require('../controllers/controller')

routes.get('/', Controller.home)

routes.get('/register', Controller.register)
routes.post('/register', Controller.registerPost)

routes.get('/login', Controller.loginGet)
routes.post('/login', Controller.loginPost)

let checkSession = (req, res, next) => {
    if (req.session.username) {
        next()
    } else {
        res.send(`Member Only!`)
    }
}

routes.use(checkSession)
// ? menampilkan dahsboard
routes.get('/dashboard/', Controller.showDashboard)

// ? menampilkan movie
routes.get('/showMovie/:id', Controller.showMovie)

// ? post saat menambahkan berat badan baru
routes.post('/dashboard', Controller.addWeight)

// ? menampilkan edit user
routes.get('/dashboard/edit', Controller.formEditUser)

// ? post edit user
routes.post('/dashboard/edit/:id', Controller.editUser)

// ? add program
routes.post('/dashboard/addProgram/:id', Controller.addProgram)

// ? delete weight
routes.get('/dashboard/delete/:user/:id', Controller.deleteWeight)

// ? logout
routes.get('/logout', Controller.logout)

module.exports = routes
