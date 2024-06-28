const sequelize = require("../database/connection.js");
(async () => {
  try {
    await sequelize.sync({ alter: false });
    console.log(`Tables Created`);
  } catch (error) {
    console.log(error.message);
  }
})();

module.exports = sequelize;
