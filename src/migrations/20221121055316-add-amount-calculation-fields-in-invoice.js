'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     Promise.all([ 
      queryInterface.addColumn(
      'invoices',
      'tax_percent',
      {
      type: Sequelize.DOUBLE,
      allowNull: false
      }
    ),
    queryInterface.addColumn(
      'invoices',
      'tax_amount',
      {
      type: Sequelize.DOUBLE,
      allowNull: false,
      }
    ),
    queryInterface.addColumn(
      'invoices',
      'discount_percent',
      {
      type: Sequelize.DOUBLE,
      allowNull: false
      }
    ),
    queryInterface.addColumn(
      'invoices',
      'discount_amount',
      {
      type: Sequelize.DOUBLE,
      allowNull: false
      }
    ),
    queryInterface.addColumn(
      'invoices',
      'total_amount',
      {
      type: Sequelize.DOUBLE,
      allowNull: false
      }
    ),
    queryInterface.removeColumn(
      'invoices',
      'total_token_amount',
    )])
  },

  async down(queryInterface, _Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     Promise.all([queryInterface.removeColumn(
      'invoices',
      'tax_percent',
      {
      type: Sequelize.DOUBLE,
      }
    ),
     queryInterface.removeColumn(
      'invoices',
      'tax_amount',
      {
      type: Sequelize.DOUBLE,
      }
    ),
     queryInterface.removeColumn(
      'invoices',
      'discount_percent',
      {
      type: Sequelize.DOUBLE,
      }
    ),
    queryInterface.removeColumn(
      'invoices',
      'discount_amount',
      {
      type: Sequelize.DOUBLE,
      }
    ),
    queryInterface.removeColumn(
      'invoices',
      'total_amount',
      {
      type: Sequelize.DOUBLE,
      }
    ),
    queryInterface.addColumn(
      'invoices',
      'total_token_amount',
      {
        type:Sequelize.FLOAT,
        allowNull: false,
      }
    )]);
  }
};