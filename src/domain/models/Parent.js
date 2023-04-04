const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Parent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Baby, {
        foreignKey: 'parent_id',
        as: 'babies',
      });
    }
  }
  Parent.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nik: DataTypes.STRING,
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      created_by: DataTypes.BIGINT,
      updated_by: DataTypes.BIGINT,
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
    },
    {
      sequelize,
      modelName: 'Parent',
      tableName: 'parents',
      timestamps: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    },
  );
  return Parent;
};
