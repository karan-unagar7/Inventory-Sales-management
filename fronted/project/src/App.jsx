import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import NoPage from "./components/NoPage";
import LayOut from "./components/Layout";
import Dashboard from "./components/product/Dashboard";
import Profile from "./components/Profile";
import AddProduct from "./components/product/AddProduct";
import Product from "./components/product/Product";
import EditProduct from "./components/product/EditProduct";
import Sale from "./components/sale/Sale";
import AddSale from "./components/sale/AddSale";
import ViewSaleProducts from "./components/sale/ViewSaleProduct";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<NoPage />} />
        <Route path="/" element={<LayOut />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/product/product" element={<Product />} />
          <Route path="/product/addproduct" element={<AddProduct />} />
          <Route path="/product/editproduct" element={<EditProduct />} />
          <Route path="/sale/sale" element={<Sale />} />
          <Route path="/sale/addsale" element={<AddSale />} />
          <Route path="/sale/viewsaleproduct" element={<ViewSaleProducts />} />
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
