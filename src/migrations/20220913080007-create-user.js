'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },  
      email: {
        allowNull: false,
        type: Sequelize.STRING(45),
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      firstname: {
        type: Sequelize.STRING(45),
      },
      lastname: {
        type: Sequelize.STRING(45),
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING(45),
        defaultValue: 'active',
      },
      org_name: {
        type: Sequelize.STRING(100),
      },
      address: {
        type: Sequelize.TEXT,
      },
      fee: {
        type: Sequelize.INTEGER,
      },
      upper_cap_ammount: {
        type: Sequelize.INTEGER,
      },
      upper_cap_unit: {
        type: Sequelize.STRING,
      },
      api_key: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
      is_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      redirect_url: {
        type: Sequelize.TEXT,
      },
      hook:{
        type:Sequelize.TEXT,
      }
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('users');
  },
};
