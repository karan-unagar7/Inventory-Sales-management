const { Router } = require("express");
const { add, view, getById } = require("../controller/sale");
const verifyUser = require("../middleware/auth");

const router = Router();

router.use(verifyUser);
router.post("/", add);
router.get("/", view);
router.get("/:id", getById);

module.exports = router;
