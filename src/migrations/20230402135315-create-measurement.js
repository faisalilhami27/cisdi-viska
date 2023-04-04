/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('measurements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      date: {
        type: Sequelize.DATEONLY,
      },
      baby_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'babies',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      last_weight: {
        type: Sequelize.FLOAT,
      },
      last_height: {
        type: Sequelize.INTEGER,
      },
      last_arm_circumference: {
        type: Sequelize.FLOAT,
      },
      created_by: {
        type: Sequelize.BIGINT,
        references: {
          model: 'users',
          key: 'id',
          onUpdate: 'cascade',
          onDelete: 'cascade',
        },
      },
      updated_by: {
        type: Sequelize.BIGINT,
        references: {
          model: 'users',
          key: 'id',
          onUpdate: 'cascade',
          onDelete: 'cascade',
        },
      },
      created_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('measurements');
  },
};
