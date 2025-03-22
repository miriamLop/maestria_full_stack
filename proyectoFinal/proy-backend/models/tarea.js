'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  const Tarea = sequelize.define("Tarea",{
    titulo: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    estado: DataTypes.STRING,
    flimite: DataTypes.DATE,
    usuarioId: DataTypes.INTEGER
    
  });

    Tarea.associate = (models) => {
    Tarea.belongsTo(models.Usuario, { foreignKey: "usuarioId" });
  };

  // class Tarea extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  /* static associate(models) {
     // define association here
   }
 }
 Tarea.init({
   titulo: DataTypes.STRING,
   descripcion: DataTypes.STRING,
   estado: DataTypes.STRING,
   flimite: DataTypes.DATE,
   usuarioId: DataTypes.INTEGER
 }, {
   sequelize,
   modelName: 'Tarea',
 });*/
  return Tarea;
};