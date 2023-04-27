'use strict';

module.exports = {
  async up (queryInterface, _Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     return queryInterface.removeColumn(
      'invoices',
      'transaction_id'
    );
     
  },

  async down(queryInterface, _Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     return queryInterface.addColumn(
      'invoices',
      'transaction_id',
      {
        type: Sequelize.UUID,
        allowNull: false,
      }
    );
  }
};
