const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User, Personality, Product, sequelize } = require("../models");

require("dotenv").config();

class Controller {

  static async test(req, res, next) {
    try {
      res.json("hello");
    } catch (error) {
      next(err);
    }
  }

  static async loginUser(req,res,next){
    try {
      const access_token = await sequelize.transaction(async (t) => {
        const { email, password } = req.body;
        console.log(req.body,"server")
        if (!email || !password) throw { name: "Invalid Credential" };
        const user = await User.findOne({ where: { email } });
        if (!user) throw { name: "Invalid Credential" };
        const isPassword = comparePassword(password, user.password);
        if (!isPassword) throw { name: "Invalid Credential" };
        const access_token = createToken({ id: user.id });
        return access_token;
      });
      res.json({ access_token });
    } catch (err) {
      next(err);
    }
  }
  static async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw { name: "Invalid Credential" };
      const user = await User.findOne({ where: { email } });
      if (!user) throw { name: "Invalid Credential" };
      const isPassword = comparePassword(password, user.password);
      if (user.role !== "user") throw { name: "No Access" };
      if (!isPassword) throw { name: "Invalid Credential" };
      const access_token = createToken({ id: user.id });
      res.json({ access_token, username: user.firstName }); // Menambahkan username ke respons
    } catch (err) {
      next(err);
    }
  }

  static async loginAdmin(req,res,next){
    try {
      const access_token = await sequelize.transaction(async (t) => {
        const { email, password } = req.body;
        if (!email || !password) throw { name: "Invalid Credential" };
        const user = await User.findOne({ where: { email } });
        if (!user) throw { name: "Invalid Credential" };
        if (user.role !== "admin") throw { name: "No Access" };
        const isPassword = comparePassword(password, user.password);
        if (!isPassword) throw { name: "Invalid Credential" };
        const access_token = createToken({ id: user.id });
        return access_token;
      });
      res.json({ access_token });
    } catch (err) {
      next(err);
    }
  }

  static async registerUser(req, res, next) {
    try {
      const user = await sequelize.transaction(async (t) => {
        const { firstName, lastName, email, password, phoneNumber, birthDay } =
          req.body;
          console.log(req.body)
        const user = await User.create(
          { firstName, lastName : "tes", email, password, phoneNumber:"08876734", birthDay },
          { transaction: t }
        );

        return user;
      });
      res.status(201).json({ msg: `${user.email} successfully created` });
    } catch (err) {
      next(err);
    }
  }

  static async registerAdmin(req, res, next) {
    try {
      const user = await sequelize.transaction(async (t) => {
        const { email, password } =
          req.body;
        const user = await User.create(
          {
            firstName: "admin",
            lastName: "admin",
            email,
            password,
            role: "admin",
            phoneNumber : "081234543123",
            birthDay: "6-3-1999",
          },
          { transaction: t }
        );

        return user;
      });
      res.status(201).json({ msg: `${user.email} successfully created` });
    } catch (err) {
      console.log(err)
      next(err);
    }
  }

  static async getUserPersonality(req, res, next) {
    try {
      const user = req.user;
      const birthday = new Date(user.birthDay);
      const day = birthday.getDate();
      const month = birthday.getMonth() + 1;
      const year = birthday.getFullYear();
      const sumOfDigits = (number) => {
        return number.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
      };
      const sumOfDay = sumOfDigits(day);
      const sumOfMonth = sumOfDigits(month);
      const sumOfYear = sumOfDigits(year);
      const sumOfYearDigits = sumOfDigits(sumOfYear);
      const sumOfABD = sumOfDay + sumOfMonth + sumOfYearDigits;  
      const sumOfE = sumOfDigits(sumOfABD);
      const sumOfF = sumOfDigits(sumOfE);
      const finalResult = [11, 22, 33].includes(sumOfE) ? sumOfE : sumOfF;
      const foundPersonalities = await Personality.findAll({
        where: {
          score: finalResult,
        },
      });
      const result = foundPersonalities.map(
        (personality) => personality.dataValues.character
      );
      res.status(200).json(result);
    } catch (err) {
      next(err);
      console.error(err);
    }
  }

  static async findPersonality(req, res, next) {
    try {
      const user = req.body;
      console.log(user,"<< reqbody")
      const birthday = new Date(user.birthDay);
      const day = birthday.getDate();
      const month = birthday.getMonth() + 1;
      const year = birthday.getFullYear();
      const sumOfDigits = (number) => {
        return number.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
      };
      const sumOfDay = sumOfDigits(day);
      const sumOfMonth = sumOfDigits(month);
      const sumOfYear = sumOfDigits(year);
      const sumOfYearDigits = sumOfDigits(sumOfYear);
      const sumOfABD = sumOfDay + sumOfMonth + sumOfYearDigits;  
      const sumOfE = sumOfDigits(sumOfABD);
      const sumOfF = sumOfDigits(sumOfE);
      const finalResult = [11, 22, 33].includes(sumOfE) ? sumOfE : sumOfF;
      const foundPersonalities = await Personality.findAll({
        where: {
          score: finalResult,
        },
      });
      const result = foundPersonalities.map(
        (personality) => personality.dataValues.character
      );
      res.status(200).json(result);
    } catch (err) {
      next(err);
      console.error(err);
    }
  }
}
module.exports = Controller