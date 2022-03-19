const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('Client', {

      name: {
        type: DataTypes.STRING(100), 
        allowNull: false,
      },
      adress:{
        type: DataTypes.STRING(100),
        allowNull: false
      },
      dni:{
        type: DataTypes.STRING(9),
        allowNull: false
      },
      iva: {
        type: DataTypes.ENUM('A', 'B', 'C'),
        allowNull: false
      }
    });
  };