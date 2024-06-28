export const baseUrl = `http://localhost:3001/api/v1`;

// user Apis :-
const signUp = `${baseUrl}/user/signup`;
const signIn = `${baseUrl}/user/signin`;
const profile = `${baseUrl}/user/profile`;

// product Apis :-
const addProduct = `${baseUrl}/product`;
const viewProduct = `${baseUrl}/product`;
const updateProduct = `${baseUrl}/product/`;
const deleteProduct = `${baseUrl}/product/`;
const getProduct = `${baseUrl}/product/pid/`;
const getProductList = `${baseUrl}/product/getproductlist`;

// sale apis :- 
const addSale = `${baseUrl}/sale`;
const viewSale = `${baseUrl}/sale`;
const viewSaleProducts = `${baseUrl}/sale/`;

export {
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
  viewSaleProducts
};
