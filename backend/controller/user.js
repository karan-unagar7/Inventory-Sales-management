const { validateDataForUser } = require("../models/user");
const { createUser, findByEmail, findById } = require("../services/user");
const { fileUpload } = require("../utility/claudinary");
const { generateToken } = require("../utility/generateToken");
const { userMsg, errorMsg } = require("../utility/message");

const signUp = async (req, res) => {
  try {
    const { error } = validateDataForUser(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: errorMsg.imageRequired });
    }

    const { name, email, password, gender, phone, address } = req.body;
    const userDetail = await findByEmail(email);
    if (userDetail) {
      return res
        .status(400)
        .json({ success: false, message: errorMsg.userAlreadyExicts });
    }
    const { secure_url } = await fileUpload(req.file?.path);

    await createUser(name, email, password, gender, secure_url, phone, address);
    return res.status(201).json({ success: true, message: userMsg.signUp });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: errorMsg.fieldRequired });
    }

    const userDetail = await findByEmail(email);

    if (!userDetail) {
      return res
        .status(404)
        .json({ success: false, message: errorMsg.userNotFound });
    }

    const isMatchPassword = await userDetail.checkPassword(password);

    if (!isMatchPassword) {
      return res
        .status(400)
        .json({ success: false, message: errorMsg.invalidCredintial });
    }

    const userData = await findById(userDetail.id);

    const token = generateToken({ id: userData.id });

    return res.status(200).json({
      success: true,
      data: userData,
      token: token,
      message: userMsg.signIn,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const profile = async (req, res) => {
  try {
    return res
      .status(200)
      .json({ success: true, data: req.user, message: userMsg.getProfile });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  signUp,
  signIn,
  profile,
};
