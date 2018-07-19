'use strict'

module.exports = function(sequelize, DataTypes) {
  const temp = sequelize.define("temp", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    temperature: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return temp;
};