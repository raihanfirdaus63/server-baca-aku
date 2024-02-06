'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PersonalityUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PersonalityUser.belongsTo(models.User, { foreignKey: 'userId' });
      PersonalityUser.belongsTo(models.Personality, { foreignKey: 'personalityId' });
    }
  }
  PersonalityUser.init({
    userId: DataTypes.INTEGER,
    personalityId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PersonalityUser',
  });
  return PersonalityUser;
};