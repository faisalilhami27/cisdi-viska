/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('measurements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
      is_stanting: {
        type: Sequelize.BOOLEAN,
      },
      date: {
        type: Sequelize.DATEONLY,
      },
      body_weight: {
        type: Sequelize.FLOAT,
      },
      arm_circumference: {
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
