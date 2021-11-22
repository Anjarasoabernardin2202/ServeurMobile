'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Utlisateur extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Utlisateur.init({
    im: DataTypes.STRING,
    mdp: DataTypes.STRING,
    nom: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Utlisateur',
  });
  return Utlisateur;
};