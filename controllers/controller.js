const {User, Weight, Workout, UserWorkout} = require('../models')
const CheckFitness = require('../helpers/fitnes-npm')
const bcrypt = require('bcryptjs');

class Controller {
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
            birth_year: req.body.birth_year,
            gender: req.body.gender,
            email: req.body.email,
            height: req.body.height,
            current_weight: req.body.current_weight,
            activities_level: req.body.activities_level,
            goal: req.body.goal
        }
        // res.send(obj)
        User.create(obj)
            .then(data => {
                const dataWeight = {
                    weight: data.current_weight,
                    UserId: data.id
                }
                return Weight.create(dataWeight)
            })
            .then(data => {
                res.redirect('/login')
            })
            .catch(err => {
                res.send(err.message)
            })
    }

    static loginGet(req, res) {
        res.render('login')
    }

    static loginPost(req, res) {
        const username = req.body.username
        const password = req.body.password
        User.findOne({ where: { username: username}})
        .then(data => {
            //bcrypt.compareSync("B4c0/\/", hash)
            if (bcrypt.compareSync(password, data.password)) {
                req.session.username = data.username
                res.redirect('/dashboard')
                // res.send(data)
            } else {
                res.send('Username atau password salah')
            }
        })
        .catch(err => res.send(err.message))
    }

    static showDashboard(req, res) {
        const username = req.session.username
        const label = []
        const dataset = []
        User.findOne({
            where: {
                username
            },
            include: [Workout, 
                {
                model: Weight
                }
            ],
            order: [[Weight, 'createdAt', 'ASC']]
        })
            .then(data => {
                for (let i = 0; i < data.Weights.length; i++) {
                    const element = data.Weights[i];
                    dataset.push(element.weight)
                    label.push(element.createdAt.toLocaleDateString())
                }
                // res.send(data)
                res.render('dashboard', {data, dataset, label, CheckFitness, User})
            })
            .catch(err => res.send(err.message))
    }

    static addWeight(req, res) {
        const username = req.session.username
        const inputUser = {
            current_weight: req.body.newWeight
        }
        let id
        User.findOne({where: {username}})
         .then(data => {
             id = data.id
             return User.update(inputUser, {
                where: {
                    id
                }
            })
         })
            .then(data => {
                const inputWeight = {
                    weight: req.body.newWeight,
                    UserId: id
                }
                return Weight.create(inputWeight, {
                    where: {
                        id
                    }
                })
            })
            .then(data => res.redirect(`/dashboard`))
            .catch(err => res.send(err.message))
    }

    static showMovie(req, res) {
        const id = req.params.id
        Workout.findOne({
            where: {
                id
            }
        })
            // .then(data => res.send(data))
            .then(data => res.render('movie', {data}))
            .catch(err => res.send(err.message))
    }

    static formEditUser(req, res) {
        const username = req.session.username
        let user
        User.findOne({
            where: {
                username
            },
            include: [Workout, 
                {
                model: Weight
                }
            ],
            order: [[Weight, 'createdAt', 'DESC']]
        })
            .then(data => {
                user = data
                return Workout.findAll()
            })
            .then(workout => res.render('edit-user', {workout, user}))
            .catch(err => res.send(err.message))
    }

    static editUser(req, res) {
        const username = req.session.username
        const input = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            gender: req.body.gender,
            email: req.body.email,
            birth_year: req.body.birth_year,
            height: req.body.height,
            activities_level: req.body.activities_level,
            goal: req.body.goal
        }

        User.update(input, {
            where: {
                username
            },
            individualHooks: true
        })
            .then(data => res.redirect(`/dashboard`))
            .catch(err => res.send(err.message))
    }

    static addProgram(req, res) {
        const id = req.params.id

        const input = {
            UserId: id,
            WorkoutId: req.body.WorkoutId
        }

        UserWorkout.create(input)
            .then(data => res.redirect(`/dashboard`))
            .catch(err => res.send(err.message))
    }

    static deleteWeight(req, res) {
        const userId = req.params.user
        const id = req.params.id
        Weight.destroy({
            where: {id}
        })
            .then(data => res.redirect(`/dashboard/edit`))
            .catch(err => res.send(err.message))
    }

    static logout(req, res) {
        req.session.destroy(err => {
            if (err) {
                res.send(err)
            } else {
                res.redirect('/')
            }
        })
    }
}

module.exports = Controller