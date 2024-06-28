const { findById } = require("../services/user");
const { verifyToken } = require("../utility/generateToken");
const { errorMsg } = require("../utility/message");

const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res
        .status(404)
        .json({ success: false, message: errorMsg.tokenNotFound });
    }
    const decodeToken = verifyToken(token);
    if (!decodeToken) {
      return res
        .status(401)
        .json({ success: false, message: errorMsg.unAuthorizedUser });
    }

    const userDetail = await findById(decodeToken?.id);

    if (!userDetail) {
      return res.status(404).json({ message: errorMsg.userNotFound });
    }
    req.user = userDetail;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = verifyUser;
