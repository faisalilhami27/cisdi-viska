const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Baby extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Parent, {
        foreignKey: 'parent_id',
        as: 'parent',
      });

      this.hasMany(models.Measurement, {
        foreignKey: 'baby_id',
        as: 'measurements',
      });
    }
  }
  Baby.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    parent_id: DataTypes.BIGINT,
    name: DataTypes.STRING(100),
    birth_date: DataTypes.DATEONLY,
    photo: DataTypes.STRING(255),
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
    modelName: 'Baby',
    tableName: 'babies',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  });
  return Baby;
};
