const { Router } = require("express");
const userRouter = require("./user");
const productRouter = require("./product");
const saleRouter = require("./sale");

const router = Router();

router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/sale", saleRouter);

module.exports = router;
