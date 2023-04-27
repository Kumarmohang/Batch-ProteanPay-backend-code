'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable(
      'tokens_list',{
         id:{
          primaryKey: true,
          type:Sequelize.UUID,
          allowNull: false,
          defaultValue:Sequelize.UUIDV4
         },
         name:{
          type:Sequelize.STRING,
         },
         blockchianId:{
          field:'blockchain_id',
          type:Sequelize.UUID,
          references:{
            model:'blockchain_data',
            key:'id'
          },
         },
         symbol:{
          type:Sequelize.STRING
         },
         logoUrl:{
          field:'logo_url',
          type:Sequelize.STRING
         },
         contactAddress:{
          field:'contact_address',
          type:Sequelize.STRING,
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
     await queryInterface.dropTable('tokens_list')
  }
};
