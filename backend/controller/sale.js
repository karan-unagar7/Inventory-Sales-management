const { findById } = require("../services/product");
const {
  getSales,
  addSale,
  addSaleItem,
  getSaleProducts,
  getFindById,
} = require("../services/sale");

const add = async (req, res) => {
  try {
    const { name, address, items } = req.body;
    let total = 0;
    const saleItems = [];

    for (const item of items) {
      const product = await findById(item.productId);
      if (product.product_quantity < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Max Quantity is ${product.product_quantity}`,
        });
      }

      product.product_quantity -= item.quantity;
      await product.save();

      total += product.product_price * item.quantity;
      saleItems.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.product_price * item.quantity,
        product_name: product.product_name,
      });
    }
    const sale = await addSale(name, address, total);
    await addSaleItem(saleItems, name, address, sale.id);
    return res.status(201).json({ success: true, message: "Sell Created" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const view = async (req, res) => {
  try {
    const saleList = await getSales();
    return res.status(200).json({ success: true, data: saleList });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// get sales products api :-
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const salesData = await getSaleProducts(id);
    const { total } = await getFindById(id);
    return res.status(200).json({ success: true, data: [...salesData, total] });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = {
  add,
  view,
  getById,
};
