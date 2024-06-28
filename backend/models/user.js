const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection.js");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const user = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("male", "female"),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "tbl_user",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["email"],
      },
    ],
    hooks: {
      beforeValidate: function (user) {
        for (const key in user.dataValues) {
          if (key === "password") continue;
          if (typeof user[key] === "string") {
            user[key] = user[key].toLowerCase();
          }
        }
      },
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.password && user.changed("password")) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

function validateDataForUser(datas) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(8).required(),
    gender: Joi.string().valid("male", "female").required(),
    phone: Joi.string().length(10).required(),
    address: Joi.string().required(),
  });
  return schema.validate(datas);
}

user.prototype.checkPassword = async function (inputPassword) {
  const isMatch = await bcrypt.compare(inputPassword, this.password);
  return isMatch;
};

module.exports = { user, validateDataForUser };
