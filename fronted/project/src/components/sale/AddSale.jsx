import React, { useState, useEffect } from "react";
import { AddSaleApi, GetProductListApi } from "../../services/apicall";
import Table from "../common/Table";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Sales = () => {
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getProductList = async () => {
      try {
        const response = await GetProductListApi();
        const { data } = response.data;
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProductList();
  }, [setProducts]);

  const addItem = (productId, quantity) => {
    const product = products.find((p) => p.id == productId);
    const item = {
      productId,
      productname: product.product_name,
      quantity,
      price: parseInt(product.product_price) * quantity,
    };
    if (quantity > product.product_quantity) {
      toast.error(
        `Maximum Quauntity is ${product.product_quantity}.If you buy then decrease quauntity`
      );
      return;
    }
    setItems([...items, item]);
    setTotal(total + parseInt(item.price));
    const selectValue = document.getElementById("productSelect");
    const inputValue = document.getElementById("quantityInput");
    selectValue.value = "#";
    inputValue.value = "";
  };

  const removeItem = (row) => {
    console.log(row);
    const newItems = items.filter((item) => item.productId !== row.productId);
    setItems(newItems);
    console.log(`newItems`, newItems);
    setTotal(total - parseInt(row.price));
  };

  const addSale = async () => {
    try {
      if (items.length === 0) {
        toast.error("Please add items to sale");
        return;
      }
      const response = await AddSaleApi({ name, address, items });
      toast.success(response.data.message);
      setTimeout(() => navigate("/sale/sale"), 500);
    } catch (error) {
      toast.error(error);
    }
  };

  const columns = [
    { header: "productId", accessor: "productId" },
    { header: "productname", accessor: "productname" },
    { header: "quantity", accessor: "quantity" },
    { header: "price", accessor: "price" },
    {
      header: "Actions",
      render: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => removeItem(row)}
            className="text-red-700 bg-red-300 py-2 px-3 rounded hover:text-red-900"
          >
            Remove
          </button>
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={items}
      title="Selected Products"
      setButton={false}
      total={total}
      totalTrue={true}
      additionalFun={true}
      products={products}
      addItem={addItem}
      createSale={addSale}
      setName={setName}
      setAddress={setAddress}
      name={name}
      address={address}
    />
  );
};

export default Sales;
