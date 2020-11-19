'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Workout, {through: 'UserWorkout'})
      User.hasMany(models.Weight)
    }
  };
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    membership: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    gender: DataTypes.STRING,
    email: DataTypes.STRING,
    height: DataTypes.INTEGER,
    current_weight: DataTypes.INTEGER,
    activities_level: DataTypes.STRING,
    goal: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};