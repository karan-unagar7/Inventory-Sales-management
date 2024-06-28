const { Router } = require("express");

const upload = require("../utility/multer");
const {
  add,
  view,
  updateById,
  deleteById,
  getById,
  getProductList,
} = require("../controller/product");
const verifyUser = require("../middleware/auth");

const router = Router();

router.use(verifyUser);
router.post("/", upload.single("product_image"), add);
router.get("/", view);
router.put("/:id", updateById);
router.delete("/:id", deleteById);
router.get("/pid/:id", getById);
router.get("/getproductlist", getProductList);

module.exports = router;
