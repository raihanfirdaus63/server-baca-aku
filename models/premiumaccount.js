'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PremiumAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PremiumAccount.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  PremiumAccount.init({
    userId: DataTypes.INTEGER,
    expirationDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'PremiumAccount',
  });
  return PremiumAccount;
};