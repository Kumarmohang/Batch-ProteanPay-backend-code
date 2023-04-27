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
      'transaction',{
         id:{
          primaryKey: true,
          type:Sequelize.UUID,
          allowNull: false,
          defaultValue:Sequelize.UUIDV4
         },
         status:{
          type: Sequelize.ENUM("initiated","complete","failed","pending"),
         },
         txHash:{
          field:'tx_hash',
          type:Sequelize.STRING,
         },
         callerAddress:{
          field:'caller_address',
          type:Sequelize.STRING
         },
         type:{
          type: Sequelize.ENUM("approval","payment"),
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
    await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('transaction');
  }
};
