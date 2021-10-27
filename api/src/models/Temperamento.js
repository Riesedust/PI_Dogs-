const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('temperamento', {
    // idTemp: { type: DataTypes.INTEGER},
    name: {primaryKey: true,type: DataTypes.STRING},
  });
};
