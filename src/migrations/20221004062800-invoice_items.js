'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('invoice_items',{
         id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4,
        allowNull: false,
      },
      projectId: {
        field: 'project_id',
        type: Sequelize.UUID,
        allowNull: false,
      },
      invoiceId: {
        field: 'invoice_id',
        type: Sequelize.UUID,
        allowNull: false,
      },
      merchantId: {
        field: 'merchant_id',
        type: Sequelize.UUID,
        allowNull: false,
      },
      customDirectoryIdentifier: {
        field: 'custom_directory_identifier',
        type:Sequelize.STRING,
      },
      customInvoiceIdentifier: {
        field: 'custom_invoice_identifier',
        type:Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      rate: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      taxPercent: {
        field:'tax_percent',
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      extraData: {
        field:'extra_data',
        type: Sequelize.ARRAY(Sequelize.JSON),
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
    })
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('invoice_items')
  },
};
