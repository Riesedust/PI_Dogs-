const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {primaryKey: true, type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    image: {type: DataTypes.STRING},
    altura: {type: DataTypes.STRING, allowNull: false},
    peso: {type: DataTypes.STRING, allowNull: false},
    vida: {type: DataTypes.STRING},
    temperamento: {type: DataTypes.STRING}
  });
};
