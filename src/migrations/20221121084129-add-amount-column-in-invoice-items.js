'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addColumn(
      'invoice_items',
      'amount',
      {
      type: Sequelize.DOUBLE,
      allowNull: false
      }
    );
  },

  async down(queryInterface, _Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.removeColumn(
      'invoice_items',
      'amount',
      {
      type: Sequelize.DOUBLE,
      }
    );
  }
};
