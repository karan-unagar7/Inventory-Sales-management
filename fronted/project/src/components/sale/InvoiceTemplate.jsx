import { useEffect, useState } from "react";
import { viewSaleProductsApi } from "../../services/apicall";

function InvoiceTemplate({ row }) {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await viewSaleProductsApi(row.id);
        const { data } = response.data;
        const total = data.pop();
        setProducts(data);
        setTotal(total);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductDetails();
  }, [row.id]);

  const columns = [
    { header: "Date", accessor: "date" },
    { header: "Product ID", accessor: "productId" },
    { header: "Product Name", accessor: "product_name" },
    { header: "Quantity", accessor: "quantity" },
    { header: "Price", accessor: "price" },
  ];

  return (
    <div
      id="invoice-template"
      style={{
        width: "210mm",
        padding: "20mm",
        fontFamily: "Arial, sans-serif",
        color: "#333",
        backgroundColor: "#fff",
        boxSizing: "border-box",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "30px",
          borderBottom: "2px solid #3498db",
          paddingBottom: "20px",
        }}
      >
        <div>
          <h1
            style={{ color: "#3498db", margin: "0 0 10px 0", fontSize: "36px" }}
          >
            INVOICE
          </h1>
          <div style={{ fontSize: "14px" }}>Invoice #: {row.id}</div>
          <div style={{ fontSize: "14px" }}>Date: {row.date}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#2c3e50",
              marginBottom: "10px",
            }}
          >
            PATOLIYA INFOTECH
          </div>
          <div>203 TO 208 STC Aparment</div>
          <div>Surat, Gujarat 395010</div>
          <div>Phone: (123) 456-7890</div>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#ecf0f1",
          padding: "15px",
          borderRadius: "5px",
          marginBottom: "30px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{ fontWeight: "bold", marginBottom: "10px", color: "#2c3e50" }}
        >
          Bill To:
        </div>
        <div>
          <span style={{ fontWeight: "bold", color: "#2c3e50" }}>
            Your Name:-
          </span>
          {row.name}
        </div>
        <div>
          <span style={{ fontWeight: "bold", color: "#2c3e50" }}>
            Your Address:-
          </span>
          {row.address}
        </div>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "30px",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#3498db", color: "white" }}>
            {columns.map((column, index) => (
              <th
                key={index}
                style={{
                  padding: "12px",
                  textAlign: "left",
                  fontWeight: "bold",
                }}
              >
                {column.header.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((product, rowIndex) => (
            <tr
              key={rowIndex}
              style={{
                backgroundColor: rowIndex % 2 === 0 ? "#f8f9fa" : "white",
              }}
            >
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  style={{ padding: "12px", borderBottom: "1px solid #dee2e6" }}
                >
                  {product[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "30px",
          padding: "15px",
          backgroundColor: "#f8f9fa",
          borderRadius: "5px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <span
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "#2c3e50",
          }}
        >
          Total Price: ₹{total}
        </span>
      </div>

      <div
        style={{
          borderTop: "2px solid #3498db",
          paddingTop: "20px",
          fontSize: "14px",
          textAlign: "center",
          color: "#7f8c8d",
        }}
      >
        <div>Thank you for your business!</div>
        <div>Payment is due within 30 days.</div>
      </div>
    </div>
  );
}

export default InvoiceTemplate;
