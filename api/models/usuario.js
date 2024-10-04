'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      usuario.belongsToMany(models.roles, {
        through: models.usuarios_roles,
        as: 'usuario_roles',
        foreignKey: 'usuario_id'
      });
      usuario.belongsToMany(models.permissoes, {
        through: models.usuarios_permissoes,
        as: 'usuario_permissoes',
        foreignKey: 'usuarios_id'
      })
    }
  }
  usuario.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'usuario',
    tableName: 'usuarios',
    defaultScope: {
      attributes: {
        exclude: ['senha']
      }
    }
  });
  return usuario;
};