import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { viewSaleProductsApi } from "../../services/apicall";
import Table from "../common/Table";

function ViewSaleProducts() {
  const location = useLocation();
  const { state } = location;
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setTimeout(async () => {
          const response = await viewSaleProductsApi(state);
          const { data } = response.data;
          const total = data.pop();
          toast.success("Successfully Fetch Data");
          setProducts(data);
          setTotal(total);
          setLoading(false);
        }, 700);
      } catch (error) {
        toast.error(error);
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [state]);

  const columns = [
    { header: "date", accessor: "date" },
    { header: "productId", accessor: "productId" },
    { header: "product-name", accessor: "product_name" },
    { header: "quantity", accessor: "quantity" },
    { header: "price", accessor: "price" },
  ];
  return (
    <Table
      columns={columns}
      data={products}
      title="View Sale Products"
      setButton={false}
      loading={loading}
      total={total}
      totalTrue={true}
    />
  );
}

export default ViewSaleProducts;
