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

    getFullName() {
      let fullname = `${this.first_name} ${this.last_name}`
      return fullname
    }

    static getAge(birthyear) {
      let currentYear = new Date().getFullYear()
      let age = Number(currentYear) - Number(birthyear)
      return age
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please enter your username'
        },
        notNull: {
          msg: 'Please enter your username'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please enter your password'
        },
        notNull: {
          msg: 'Please enter your password'
        }
      }
    },
    membership: DataTypes.STRING,
    first_name: {
      type: DataTypes.STRING
    },
    last_name: DataTypes.STRING,
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please enter your gender'
        },
        notNull: {
          msg: 'Please enter your gender'
        }
      }
    },
    birth_year: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate: {
        notEmpty: {
          msg: 'Birth year required'
        },
        notNull: {
          msg: 'Birth year required'
        },
        len: {
          args: [4,4],
          msg: `Year Invalid`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please enter your email'
        },
        notNull: {
          msg: 'Please enter your email'
        }
      }
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Height Required'
        },
        notNull: {
          msg: 'Height Required'
        },
        min: {
          args: 1,
          msg: `Height cannot below 1kg`
        }
      }
    },
    current_weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Weight required'
          },
          notNull: {
            msg: 'Weight required'
          },
          min: {
            args: 1,
            msg: `Weight cannot below 1kg`
          }
        }
    },
    activities_level: DataTypes.STRING,
    goal: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((instance, option) => {
    if (!instance.last_name || instance.last_name.trim() == '') {
      instance.last_name = instance.first_name
    }
    instance.membership = 'Standard'
  })

  User.beforeUpdate((instance, option) => {
    if (!instance.last_name || instance.last_name.trim() == '') {
      instance.last_name = instance.first_name
    }
  })
  return User;
};