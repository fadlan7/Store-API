const { hashPassword } = require('../helpers/bcrypt');

('use strict');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password = '123456';
    const hashedPassword = hashPassword(password);

    await queryInterface.bulkInsert(
      'Users',
      [
        {
          full_name: 'Admin',
          email: 'admin@gmail.com',
          password: hashedPassword,
          gender: 'male',
          role: 1,
          balance: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
