/* eslint-disable require-jsdoc */
'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('invoices', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      customDirectoryIdentifier: {
        field: 'custom_directory_identifier',
        type: Sequelize.STRING,
        allowNull: false,
      },
      customInvoiceIdentifier: {
        field: 'custom_invoice_identifier',
        type: Sequelize.STRING,
        allowNull: false,
      },
      projectId:{
        field:'project_id',
        type: Sequelize.UUID,
        allowNull: false,
      },
      merchantId:{
        field:'merchant_id',
        type: Sequelize.UUID,
        allowNull: false,
      },
      creationDate: {
        field: 'creation_date',
        type: Sequelize.DATE,
        allowNull: false,
      },
      from: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      to: {
        type: Sequelize.TEXT,
      },
      tags: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
      },
      memo: {
        type: Sequelize.TEXT,
      },
      extraData: {
        field: 'extra_data',
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
      tokenSymbol: {
        field: 'token_symbol',
        allowNull: false,
        type: Sequelize.STRING,
      },
      tokenName:{
        field: 'token_name',
        type: Sequelize.STRING,
        allowNull: false,
      },
      tokenId:{
        field: 'token_id',
        type:Sequelize.UUID,
        allowNull: false,
      },
      totalTokenAmount:{
        field: 'total_token_amount',
        type:Sequelize.INTEGER,
        allowNull: false,
      },
      blockChainId:{
        field: 'blockchain_id',
        type:Sequelize.UUID,
        allowNull: false,
      },
      finalPaymentAmonut:{
        field: 'final_payment_amount',
        type: Sequelize.INTEGER,
      },
      finalPaymentCurrency:{
        field: 'final_payment_currency',
        type: Sequelize.STRING,
      },
      allowedPaymentCurrency:{
        field: 'allowed_payment_currency',
        type: Sequelize.STRING,
      },
      status:{
        type: Sequelize.ENUM("pending","approved","processing","paid","rejected"),
        allowNull: false,
        defaultValue:'pending',
      },
      isDeleted:{
        field:'is_deleted',
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      transactionId:{
        field: 'transaction_id',
        type: Sequelize.UUID,
        allowNull: false,
      },
      destinationPublicAddress: {
        field: 'destination_public_address',
        allowNull: false,
        type: Sequelize.STRING,
      },
      payer:{
        allowNull: false,
        type: Sequelize.JSON,
      },
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('invoices');
  },
};



