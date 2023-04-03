const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  User.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM,
      values: ['admin', 'user'],
    },
    created_at: {
      type: DataTypes.DATE,
      name: 'createdAt',
      field: 'created_at',
    },
    updated_at: {
      type: DataTypes.DATE,
      name: 'updatedAt',
      field: 'updated_at',
    },
    deleted_at: {
      type: DataTypes.DATE,
      name: 'deletedAt',
      field: 'deleted_at',
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  });
  return User;
};
