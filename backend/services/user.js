const { user } = require("../models/user");

const findByEmail = async (email) => {
  return await user.findOne({ where: { email } });
};

const findById = async (id) => {
  return await user.findByPk(id);
};

const createUser = async (
  name,
  email,
  password,
  gender,
  image,
  phone,
  address
) => {
  return await user.create({
    name,
    email,
    password,
    gender,
    image,
    phone,
    address,
  });
};

module.exports = {
  findByEmail,
  createUser,
  findById,
};
