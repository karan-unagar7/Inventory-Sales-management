import toast from "react-hot-toast";
import GenericForm from "../common/Form";
import { useRef, useState } from "react";
import { addProductSchema } from "../../services/validationschema";
import { AddProductApi } from "../../services/apicall";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [btnDis, setBtnDis] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const initialValues = {
    product_name: "",
    product_description: "",
    product_category: "",
    product_quantity: "",
    product_price: "",
    product_image: null,
  };

  const fields = {
    title: "Create a Product",
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
        type: "file",
        name: "product_image",
        labelName: "Product Image",
        placeholder: "Enter image URL",
      },
      {
        type: "textarea",
        name: "product_description",
        labelName: "Your Product Description",
      },
    ],
    btnDis,
    setBtnDis,
    submitButtonText: "Create",
  };

  const onSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append("product_name", values.product_name);
    formData.append("product_category", values.product_category);
    formData.append("product_description", values.product_description);
    formData.append("product_quantity", values.product_quantity);
    formData.append("product_price", values.product_price);
    formData.append("product_image", values.product_image);
    try {
      setBtnDis(true);
      const response = await AddProductApi(formData);
      if (response.status === 201) {
        toast.success(response.data.message);
        setTimeout(() => navigate("/product/product"), 500);
      }
      resetForm();

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (e) {
      setBtnDis(true);
      toast.error(e.response.data.message);
    } finally {
      setBtnDis(false);
    }
  };

  return (
    <GenericForm
      initialValues={initialValues}
      validationSchema={addProductSchema()}
      onSubmit={onSubmit}
      fields={fields}
      fileInputRef={fileInputRef}
    />
  );
}

export default AddProduct;
