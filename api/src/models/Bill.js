const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('Bill', {

      ClientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      billNumber:{
        type: DataTypes.INTEGER,
        allowNull: false
      },
      importe:{
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
  };