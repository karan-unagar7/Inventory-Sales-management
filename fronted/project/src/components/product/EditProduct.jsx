import toast from "react-hot-toast";
import GenericForm from "../common/Form";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetProductApi, UpdateProductApi } from "../../services/apicall";
import { updateProductSchema } from "../../services/validationschema";

function EditProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [product, setProduct] = useState({
    product_name: "",
    product_description: "",
    product_category: "",
    product_quantity: "",
    product_price: "",
  });

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await GetProductApi(state);
        const { data } = response.data;
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductDetails();
  }, [state]);

  const initialProductData = {
    product_name: product.product_name,
    product_description: product.product_description,
    product_category: product.product_category,
    product_quantity: product.product_quantity,
    product_price: product.product_price,
  };

  const onSubmit = async (values) => {
    try {
      const response = await UpdateProductApi(product.id, values);
      toast.success(response.data.message);
      setTimeout(() => navigate("/product/product"), 700);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response.data.message);
    }
  };

  const fields = {
    title: "Edit Your Product",
    items: [
      {
        type: "input",
        labelName: "Your Product Name",
        inputType: "text",
        inputName: "product_name",
      },
      {
        type: "input",
        labelName: "Category",
        inputType: "text",
        inputName: "product_category",
      },
      {
        type: "input",
        labelName: "Quantity",
        inputType: "number",
        inputName: "product_quantity",
      },
      {
        type: "input",
        labelName: "Price",
        inputType: "text",
        inputName: "product_price",
      },
      {
        type: "textarea",
        name: "product_description",
        labelName: "Your Product Description",
      },
    ],
    btnDis: false,
    submitButtonText: "Submit",
    footerText: "Need help? Contact support.",
    acceptingText: false,
  };

  return (
    <GenericForm
      initialValues={initialProductData}
      validationSchema={updateProductSchema()}
      onSubmit={onSubmit}
      fields={fields}
    />
  );
}

export default EditProduct;
