'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable(
      'blockchain_data',{
         id:{
          primaryKey: true,
          type:Sequelize.UUID,
          allowNull: false,
          defaultValue:Sequelize.UUIDV4
         },
         name:{
          type:Sequelize.STRING,
         },
         type:{
          type:Sequelize.STRING,
         },
         symbol:{
          type:Sequelize.STRING
         },
         logoUrl:{
          field:'logo_url',
          type:Sequelize.STRING
         },
         chainId:{
          field:'chain_id',
          type:Sequelize.UUID,
          allowNull: false,
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
     await queryInterface.dropTable('blockchain_data')
  }
};
