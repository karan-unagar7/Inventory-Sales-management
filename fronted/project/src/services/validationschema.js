import * as Yup from "yup";

const signUpSchema = () => {
  return Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    gender: Yup.string().required("Gender is required"),
    image: Yup.string().required("Image is required"),
    password: Yup.string()
      .min(4, "Password must be at least 4 characters")
      .max(8, "Password must be not 8 or more characters")
      .required("Password is required"),
    phone: Yup.string().required("Phone No is required").length(10),
    address: Yup.string().required("Address is required"),
    terms: Yup.boolean().oneOf(
      [true],
      "Accept Terms and Conditions is required"
    ),
  });
};

const signInSchema = () => {
  return Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
};

const addProductSchema = () => {
  return Yup.object().shape({
    product_name: Yup.string().required("Product Name is required"),
    product_description: Yup.string().required(
      "Product description is required"
    ),
    product_category: Yup.string().required("Product category is required"),
    product_price: Yup.string().required("Product price is required"),
    product_quantity: Yup.string().required("Product quantity is required"),
    product_image: Yup.string().required("Product image is required"),
  });
};

const updateProductSchema = () => {
  return Yup.object().shape({
    product_name: Yup.string().required("Product Name is required"),
    product_description: Yup.string().required(
      "Product description is required"
    ),
    product_category: Yup.string().required("Product category is required"),
    product_price: Yup.string().required("Product price is required"),
    product_quantity: Yup.string().required("Product quantity is required"),
  });
};

const addSaleSchema = () => {
  return Yup.object().shape({
    name: Yup.string().required("Product Name is required"),
    productname: Yup.string().required("Product description is required"),
    price: Yup.string().required("Product price is required"),
    quantity: Yup.string().required("Product quantity is required"),
  });
};

export {
  signUpSchema,
  signInSchema,
  addProductSchema,
  updateProductSchema,
  addSaleSchema,
};
