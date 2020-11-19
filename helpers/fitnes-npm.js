const calculate = require('fitness-health-calculations');

class CheckFitness {
    static getIdealBody(height, gender) {
        return calculate.idealBodyWeight(height, gender)
    }

    static findCalory(gender, age, height, weight, activity_level, goal) {
        let newAge = Number(age)
        let newHeight = Number(height)
        let newWeight = Number(weight)
        let calory = calculate.caloricNeeds(gender, newAge, newHeight, newWeight, activity_level, goal)
        return calory
    }
}

module.exports = CheckFitness