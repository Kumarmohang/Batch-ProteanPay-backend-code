'use strict';

module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('blockchain_data', [
      {
        id: 'dc1d2942-b295-4081-88d7-c59ef088f3e3',
        name: 'Ethereum',
        type: 'crypto',
        symbol: 'ETH',
        logo_url: 'www.google.com/new/1',
        chain_id: '659836a4-fb3c-4f4f-984d-ecad187e4122',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('blockchain_data');
  },
};
