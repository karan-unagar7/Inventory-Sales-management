const express = require("express");
const { PORT } = require("./config/config");
const router = require("./router");
const cors = require("cors")
require("./models/index");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1' ,router)

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Server Start At ${PORT}`);
});
