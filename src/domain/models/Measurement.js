const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Measurement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Baby, {
        foreignKey: 'baby_id',
        as: 'baby',
      });
    }
  }
  Measurement.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    baby_id: DataTypes.STRING,
    is_stanting: DataTypes.BOOLEAN,
    body_weight: DataTypes.FLOAT,
    date: DataTypes.DATEONLY,
    arm_circumference: DataTypes.FLOAT,
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
  }, {
    sequelize,
    modelName: 'Measurement',
    tableName: 'measurements',
    paranoid: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  });
  return Measurement;
};
