const { User, Weight } = require('../models')

class UserController {
    static home(req, res) {
        res.render('home')
    }

    static register(req, res) {
        res.render('register')
    }
    static registerPost(req, res) {
        const obj = {
            username: req.body.username,
            password: req.body.password,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            gender: req.body.gender,
            email: req.body.email,
            height: req.body.height,
            current_weight: req.body.current_weight,
            activities_level: req.body.activities_level,
            goal: req.body.goal
        }  
        User.create(obj)
            .then(data => {
                const dataWeight = {
                    weight: data.current_weight,
                    UserId: data.id
                }
                return Weight.create(dataWeight)
            })
            .then(data => {
                res.redirect('/')
            })
            .catch(err => {
                res.send(err.message)
            })
    }
    static loginGet(req, res) {
        res.render('login')
    }
    static loginPost(req, res) {
        User.findOne({ where: { username: req.body.username}})
        .then(data => {
            req.session.username = data.username 
            res.redirect('/')

        })
    }
}

module.exports = UserController