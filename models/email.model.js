const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Email = sequelize.define('Email', {
    to: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    from: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    html: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  return Email;
};