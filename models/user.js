'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.PremiumAccount, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          msg: 'Firstname is required'
        },
        notNull:{
          msg: 'Firstname is required'
        }
      }
    },
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          msg: 'Email is required'
        },
        notNull:{
          msg: 'Email is required'
        },
        isEmail: {
          msg: "Must be in email format"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          msg: 'Password is required'
        },
        notNull:{
          msg: 'Password is required'
        },
        len:{
          args: [5],
          masg: 'Password must be a least 5 characters long'
        }
      }
    },
    phoneNumber:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          msg: 'Phone number is required'
        },
        notNull:{
          msg: 'Phone number is required'
        },
      }
    },
    birthDay: {
      type: DataTypes.DATE
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user"
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user)=>{
    user.password = hashPassword(user.password)
  })
  return User;
};