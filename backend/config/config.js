const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;
const DATABASE = process.env.DATABASE;
const USERNAME = process.env.USER_NAME;
const PASSWORD = process.env.PASSWORD;
const HOST = process.env.HOST;
const DIALECT = process.env.DIALECT;
const CLOUDNAME = process.env.CLOUDNAME;
const CLOUDAPIKEY = process.env.APIKEY;
const CLOUDAPISECRET = process.env.APISECRET;
const SECRETKEY = process.env.SECRET_KEY;

module.exports = {
  PORT,
  DATABASE,
  USERNAME,
  PASSWORD,
  HOST,
  DIALECT,
  CLOUDNAME,
  CLOUDAPIKEY,
  CLOUDAPISECRET,
  SECRETKEY,
};
