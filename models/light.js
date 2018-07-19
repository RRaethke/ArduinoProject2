'use strict'

module.exports = function(sequelize, DataTypes) {
  const light = sequelize.define("light", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
  });
  return light;
};