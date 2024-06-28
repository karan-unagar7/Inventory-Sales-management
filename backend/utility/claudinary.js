const cloudinary = require("cloudinary").v2;


const fs = require("fs");
const { CLOUDNAME, CLOUDAPIKEY, CLOUDAPISECRET } = require("../config/config");

cloudinary.config({
  cloud_name: CLOUDNAME,
  api_key: CLOUDAPIKEY,
  api_secret: CLOUDAPISECRET,
});

const fileUpload = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response= await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

module.exports = { fileUpload};
