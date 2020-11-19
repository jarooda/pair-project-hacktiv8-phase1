const {User, Weight, Workout, UserWorkout} = require('../models')
const CheckFitness = require('../helpers/fitnes-npm')

class Controller {
    static showDashboard(req, res) {
        const id = req.params.id
        const label = []
        const dataset = []
        User.findOne({
            where: {
                id
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
            .catch(err => res.send(err))
    }

    static addWeight(req, res) {
        const id = req.params.id
        const inputUser = {
            current_weight: req.body.newWeight
        }
        const inputWeight = {
            weight: req.body.newWeight,
            UserId: id
        }
        User.update(inputUser, {
            where: {
                id
            }
        })
            .then(data => {
                return Weight.create(inputWeight, {
                    where: {
                        id
                    }
                })
            })
            .then(data => res.redirect(`/dashboard/${id}`))
            .catch(err => res.send(err))
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
            .catch(err => res.send(err))
    }

    static formEditUser(req, res) {
        const id = req.params.id
        let user
        User.findOne({
            where: {
                id
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
            .catch(err => res.send(err))
    }

    static editUser(req, res) {
        const id = req.params.id
        const input = {
            username: req.body.username,
            password: req.body.password,
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
                id
            }
        })
            .then(data => res.redirect(`/dashboard/${id}`))
            .catch(err => res.send(err.message))
    }

    static addProgram(req, res) {
        const id = req.params.id

        const input = {
            UserId: id,
            WorkoutId: req.body.WorkoutId
        }

        UserWorkout.create(input)
            .then(data => res.redirect(`/dashboard/${id}`))
            .catch(err => res.send(err))
    }

    static deleteWeight(req, res) {
        const userId = req.params.user
        const id = req.params.id
        Weight.destroy({
            where: {id}
        })
            .then(data => res.redirect(`/dashboard/edit/${userId}`))
            .catch(err => res.send(err))
    }
}

module.exports = Controller