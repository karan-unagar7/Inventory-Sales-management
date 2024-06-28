import axios from "axios";
import {
  signUp,
  signIn,
  profile,
  addProduct,
  viewProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProductList,
  addSale,
  viewSale,
  viewSaleProducts,
} from "./apis";

const SignUpApi = async (formData) => {
  return await axios.post(signUp, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const signInApi = async (values) => {
  return await axios.post(signIn, values);
};

const ProfileApi = async () => {
  return await axios.get(profile, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const AddProductApi = async (formData) => {
  return await axios.post(addProduct, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const ViewProductApi = async (page, limit) => {
  return await axios.get(viewProduct, {
    params: { page, limit },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const UpdateProductApi = async (id, values) => {
  return axios.put(`${updateProduct}${id}`, values, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const DeleteProductApi = async (id) => {
  return axios.delete(`${deleteProduct}${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const GetProductApi = async (id) => {
  return await axios.get(`${getProduct}${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const GetProductListApi = async (id) => {
  return await axios.get(getProductList, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const AddSaleApi = async (items) => {
  return await axios.post(addSale, items, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const ViewSaleApi = async () => {
  return await axios.get(viewSale, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const viewSaleProductsApi = async (id) => {
  return await axios.get(`${viewSaleProducts}${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export {
  SignUpApi,
  signInApi,
  ProfileApi,
  AddProductApi,
  ViewProductApi,
  UpdateProductApi,
  DeleteProductApi,
  GetProductApi,
  GetProductListApi,
  AddSaleApi,
  ViewSaleApi,
  viewSaleProductsApi,
};
