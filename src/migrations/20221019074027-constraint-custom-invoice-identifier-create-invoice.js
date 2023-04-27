'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('invoices', 'custom_invoice_identifier',{
      type:Sequelize.STRING,
      allowNull: false,
      unique: true
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.changeColumn('invoices','custom_invoice_identifier',{
      type:Sequelize.STRING,
    })
  }
};
