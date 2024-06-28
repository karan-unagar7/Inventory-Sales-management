const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection.js");
const Joi = require("joi");
const { user } = require("./user.js");

const product = sequelize.define(
  "product",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_description: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    product_category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_quantity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "tbl_product",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["product_name"],
      },
    ],
  }
);

function validateDataForProduct(datas) {
  const schema = Joi.object({
    product_name: Joi.string().required(),
    product_description: Joi.string().required(),
    product_category: Joi.string().required(),
    product_quantity: Joi.string().required(),
    product_price: Joi.string().required(),
  });
  return schema.validate(datas);
}

product.belongsTo(user, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

module.exports = { product, validateDataForProduct };
