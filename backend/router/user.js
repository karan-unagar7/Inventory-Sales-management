const { Router } = require("express");
const { signUp, signIn, profile } = require("../controller/user");
const upload = require("../utility/multer");
const verifyUser = require("../middleware/auth");

const router = Router();

router.post("/signup", upload.single("image"), signUp);
router.post("/signin", signIn);

router.use(verifyUser);
router.get("/profile", profile);

module.exports = router;
