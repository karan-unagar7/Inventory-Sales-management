import { useEffect, useMemo, useState } from "react";
import Table from "../common/Table";
import { ViewSaleApi } from "../../services/apicall";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { createRoot } from "react-dom/client";
import InvoiceTemplate from "./InvoiceTemplate";

function Sale() {
  const [saleData, setSaleData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSaleData = async () => {
      try {
        setTimeout(async () => {
          const response = await ViewSaleApi();
          const { data } = response.data;
          console.log(data);
          setSaleData(data);
          setLoading(false);
        }, 1000);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchSaleData();
  }, []);

  const handleClick = (row) => {
    navigate("/sale/viewsaleproduct", { state: row.id });
  };

  const handleDownloadInvoice = async (row) => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    const root = createRoot(container);
    root.render(<InvoiceTemplate row={row} />);

    await new Promise((resolve) => setTimeout(resolve, 100));
    try {
      const canvas = await html2canvas(container.firstChild);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 210, 297);
      pdf.save(`invoice_${row.id}.pdf`);
      toast.success("Invoice downloaded successfully");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate invoice");
    } finally {
      root.unmount();
      document.body.removeChild(container);
    }
  };

  const columns = [
    { header: "Id", accessor: "id" },
    { header: "name", accessor: "name" },
    { header: "address", accessor: "address" },
    { header: "total", accessor: "total" },
    { header: "date", accessor: "date" },
    {
      header: "Actions",
      render: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleClick(row)}
            className="text-green-700 bg-green-300 py-2 px-3 rounded hover:text-green-900"
          >
            View
          </button>
          <button
            className="text-red-700 bg-red-300 py-2 px-3 rounded hover:text-red-900"
            onClick={() => handleDownloadInvoice(row)}
          >
            Download Invoice
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        data={saleData}
        loading={loading}
        title="Sales List"
        button={false}
      />
    </>
  );
}

export default Sale;
