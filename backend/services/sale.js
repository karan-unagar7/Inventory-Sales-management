const { sale, saleItem } = require("../models/sale");

const addSale = async (name, address, total) => {
  return await sale.create({
    name,
    address,
    total,
  });
};

const addSaleItem = async (data, name, address, id) => {
  return await saleItem.bulkCreate(
    data.map((item) => ({
      ...item,
      saleId: id,
      name,
      address,
    }))
  );
};

const getSales = async () => {
  return await sale.findAll();
};

const getFindById = async (id) => {
  return await sale.findByPk(id);
};

const getSaleProducts = async (id) => {
  return await saleItem.findAll({ where: { saleId: id } });
};

module.exports = {
  addSale,
  addSaleItem,
  getSales,
  getSaleProducts,
  getFindById,
};
