/* eslint-disable require-jsdoc */
'use Strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'invoice_directories',
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
        },
        customDirectoryIdentifier: {
          field: 'custom_directory_identifier',
          type: Sequelize.STRING,
        },
        createdAt: {
          field: 'created_at',
          allowNull: false,
          type: Sequelize.DATE,
        },
        startDate: {
          field: 'start_date',
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        },
        endDate: {
          field: 'end_date',
          type: Sequelize.DATE,
        },
        updatedAt: {
          field: 'updated_at',
          allowNull: false,
          type: Sequelize.DATE,
        },
        merchantId: {
          field: 'merchant_id',
          type: Sequelize.UUID,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        status: {
          allowNull: false,
          type: Sequelize.STRING(45),
          defaultValue: 'active',
        },
      },
      {
        uniqueKeys: {
          compositeIdentifier: {
            fields: ['custom_directory_identifier', 'merchant_id'],
          },
        },
      },
    );
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('invoice_directories');
  },
};
