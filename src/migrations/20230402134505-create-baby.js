/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('babies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      parent_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'parents',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      name: {
        type: Sequelize.STRING(100),
      },
      birth_date: {
        type: Sequelize.DATEONLY,
      },
      photo: {
        type: Sequelize.STRING(255),
      },
      is_stunting: {
        type: Sequelize.BOOLEAN,
      },
      weight: {
        type: Sequelize.FLOAT,
      },
      height: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('babies');
  },
};
