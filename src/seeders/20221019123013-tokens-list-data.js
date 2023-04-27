'use strict';

module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('tokens_list', [
      {
        id: '03cb8b7d-3d7f-46b5-9278-a6bff7f88c66',
        name: 'Amrit Coin',
        blockchain_id: 'dc1d2942-b295-4081-88d7-c59ef088f3e3',
        symbol: 'AMRT',
        logo_url: 'www.google.com/new',
        contact_address: '123-sdef-344',
        updated_at: new Date(),
        created_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('tokens_list');
  },
};
