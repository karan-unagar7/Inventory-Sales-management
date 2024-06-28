const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection.js");
const Joi = require("joi");
const { product } = require("./product.js");

const sale = sequelize.define(
  "sale",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      get() {
        return this.getDataValue("date").toLocaleDateString();
      },
      set(values) {
        this.setDataValue("date", values);
      },
    },
  },
  {
    tableName: "tbl_sale",
    timestamps: true,
  }
);

const saleItem = sequelize.define(
  "Saleitem",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      get() {
        return this.getDataValue("date").toLocaleDateString();
      },
      set(values) {
        this.setDataValue("date", values);
      },
    },
  },
  {
    tableName: "tbl_saleitem",
    timestamps: true,
  }
);

function validateDataForSale(datas) {
  const schema = Joi.object({
    name: Joi.string().required(),
    quantity: Joi.string().required(),
    price: Joi.string().required(),
  });
  return schema.validate(datas);
}

sale.belongsToMany(product, { through: saleItem });
product.belongsToMany(sale, { through: saleItem });

module.exports = { sale, saleItem, validateDataForSale };
