'use strict';
const fs = require('fs');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = JSON.parse(fs.readFileSync('./data/personalities.json','utf-8')).map(el =>{
      el.createdAt = new Date();
      el.updatedAt = new Date();

      return el
    })
    await queryInterface.bulkInsert('Personalities',data, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Personalities', null, {});
  }
};
