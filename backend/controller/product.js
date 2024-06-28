const { validateDataForProduct, product } = require("../models/product");
const {
  findById,
  addProduct,
  getProducts,
  editProduct,
  removeProduct,
  countProducts,
} = require("../services/product");
const { fileUpload } = require("../utility/claudinary");
const { productMsg, errorMsg } = require("../utility/message");

const add = async (req, res) => {
  try {
    const { id } = req.user;
    const { error } = validateDataForProduct(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: errorMsg.imageRequired });
    }
    const {
      product_name,
      product_description,
      product_category,
      product_quantity,
      product_price,
    } = req.body;
    const { secure_url } = await fileUpload(req.file?.path);

    await addProduct(
      product_name,
      product_description,
      product_category,
      product_quantity,
      product_price,
      secure_url,
      id
    );
    return res
      .status(201)
      .json({ success: true, message: productMsg.createProduct });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const view = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const pageCount = Number(page) || 1;
    const limitDoc = Number(limit) || 4;

    const totalProduct = await countProducts();
    
    const maxPage =
      totalProduct <= limitDoc ? 1 : Math.ceil(totalProduct / limitDoc);
    if (pageCount > maxPage) {
      return res
        .status(400)
        .json({ message: `There are only ${maxPage} page.` });
    }
    const skip = (pageCount - 1) * limitDoc;
    const productList = await getProducts(skip, limitDoc);
    return res.status(200).json({ success: true, data: productList, maxPage });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const productDetail = await findById(id);
    if (!productDetail) {
      return res
        .status(404)
        .json({ success: false, message: errorMsg.dataNotFound });
    }
    const {
      product_name,
      product_description,
      product_category,
      product_quantity,
      product_price,
    } = req.body;

    const updates = {};
    if (product_name) updates.product_name = product_name;
    if (product_description) updates.product_description = product_description;
    if (product_category) updates.product_category = product_category;
    if (product_quantity) updates.product_quantity = product_quantity;
    if (product_price) updates.product_price = product_price;

    await editProduct(updates, id);

    return res
      .status(200)
      .json({ success: true, message: productMsg.updateProduct });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const productDetail = await findById(id);
    if (!productDetail) {
      return res
        .status(404)
        .json({ success: false, message: errorMsg.dataNotFound });
    }
    await removeProduct(id);
    return res
      .status(200)
      .json({ success: true, message: productMsg.deleteProduct });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    console.log('hello');
    const { id } = req.params;
    const productDetail = await findById(id);
    if (!productDetail) {
      return res
        .status(404)
        .json({ success: false, message: errorMsg.dataNotFound });
    }
    return res.status(200).json({ success: true, data: productDetail });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getProductList = async (_, res) => {
  try {
    const productList = await product.findAll({
      attributes: ["id", "product_name", "product_price", "product_quantity"],
    });
    if (!productList) {
      return res
        .status(404)
        .json({ success: false, message: errorMsg.dataNotFound });
    }
    return res.status(200).json({ success: true, data: productList });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  add,
  view,
  deleteById,
  updateById,
  getById,
  getProductList,
};
