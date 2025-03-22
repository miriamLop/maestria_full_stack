'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define("Usuario", {
    nombre: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  });

  Usuario.associate = (models) => {
    Usuario.hasMany(models.Tarea, { foreignKey: "usuarioId" });
    };

  // class Usuario extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  /* static associate(models) {
     // define association here
   }
 }
 Usuario.init({
   nombre: DataTypes.STRING,
   email: DataTypes.STRING,
   password: DataTypes.STRING
 }, {
   sequelize,
   modelName: 'Usuario',
 });*/

  return Usuario;
};