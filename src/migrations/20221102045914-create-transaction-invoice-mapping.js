'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable(
      'transaction_invoice_mapping',{
         id:{
          primaryKey: true,
          type:Sequelize.UUID,
          allowNull: false,
          defaultValue:Sequelize.UUIDV4
         },
         transactionId:{
          field: "transaction_id",
          type:Sequelize.UUID,
          references: {
            model: 'transaction',
            key: 'id',
          },
         },
         invoiceId:{
          field: "invoice_id",
          type:Sequelize.UUID,
          references: {
            model: 'invoices',
            key: 'id',
          },
         },
         createdAt: {
          field: 'created_at',
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          field: 'updated_at',
          allowNull: false,
          type: Sequelize.DATE,
        },
      }
    )
  },

  async down(queryInterface, _Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('transaction_invoice_mapping');
  }
};
