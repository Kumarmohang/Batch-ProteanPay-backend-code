'use strict';

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('role_permission', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      roleId: {
        field: 'role_id',
        type: DataTypes.UUID,
        allowNull: false,
      },
      permissionId: {
        field: 'permission_id',
        type: DataTypes.UUID,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('role_permission');
  },
};
