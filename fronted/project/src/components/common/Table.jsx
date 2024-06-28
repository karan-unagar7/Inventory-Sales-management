import { Toaster } from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "../../table.css";

function Table({
  // eslint-disable-next-line react/prop-types
  columns,
  data,
  loading,
  title,
  button,
  setButton = true,
  total,
  totalTrue = false,
  additionalFun = false,
  products,
  addItem,
  createSale,
  setName,
  setAddress,
  name,
  address,
  currentPage,
  totalPages,
  onPageChange,
  pagination = false,
}) {
  const navigate = useNavigate();
  return (
    <section className="bg-gradient-to-r from-indigo-300 to-purple-300 min-h-screen flex items-center justify-center p-8">
      <Toaster position="top-right" />
      <div className="w-full max-w-7xl bg-white rounded-lg shadow-lg px-5 py-6 sm:px-7.5 xl:py-8">
        {setButton &&
          (button ? (
            <button
              onClick={() => navigate("/product/addproduct")}
              className="absolute right-[57px] text-green-700 bg-green-300 py-2 px-3 rounded hover:text-green-900"
            >
              Create New Product
            </button>
          ) : (
            <button
              onClick={() => navigate("/sale/addsale")}
              className="absolute right-[57px] text-green-700 bg-green-300 py-2 px-3 rounded hover:text-green-900"
            >
              Create New Sale
            </button>
          ))}
        {additionalFun && (
          <div className="mb-12 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-8 rounded-xl shadow-2xl">
            <h1 className="text-4xl font-extrabold mb-8 text-center text-white drop-shadow-lg">
              Create New Sale
            </h1>
            <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    Customer Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter customer name"
                    className="w-full py-3 px-4 rounded-md border-0 focus:ring-2 focus:ring-white bg-white bg-opacity-10 text-white placeholder-gray-300 transition"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    Customer Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    placeholder="Enter customer address"
                    className="w-full py-3 px-4 rounded-md border-0 focus:ring-2 focus:ring-white bg-white bg-opacity-10 text-white placeholder-gray-300 transition"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-end space-y-4 md:space-y-0 md:space-x-4">
                <div className="w-full md:w-1/3">
                  <label
                    htmlFor="productSelect"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    Select Product
                  </label>
                  <select
                    id="productSelect"
                    className="w-full py-3 px-4 rounded-md border-0 focus:ring-2 focus:ring-white bg-white bg-opacity-10 text-white transition"
                  >
                    <option value="#" className="text-gray-700">
                      Select a product
                    </option>
                    {products.map((product) => (
                      <option
                        key={product.id}
                        value={product.id}
                        className="text-gray-700"
                      >
                        {product.product_name} - ₹{product.product_price}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full md:w-1/3">
                  <label
                    htmlFor="quantityInput"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantityInput"
                    placeholder="Enter quantity"
                    className="w-full py-3 px-4 rounded-md border-0 focus:ring-2 focus:ring-white bg-white bg-opacity-10 text-white placeholder-gray-300 transition"
                  />
                </div>
                <div className="w-full md:w-1/3">
                  <button
                    onClick={() => {
                      const productId =
                        document.getElementById("productSelect").value;
                      const quantity = parseInt(
                        document.getElementById("quantityInput").value
                      );
                      addItem(productId, quantity);
                    }}
                    className="w-full bg-yellow-400 text-gray-900 py-3 px-6 rounded-md hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition transform hover:scale-105 font-semibold text-lg shadow-md"
                  >
                    Add Item
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => createSale()}
                className="bg-green-500 text-white py-3 px-8 rounded-full hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition transform hover:scale-105 font-bold text-lg shadow-lg"
              >
                Complete Sale
              </button>
            </div>
          </div>
        )}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          {title}
        </h1>
        <div className="w-full overflow-x-auto">
          {additionalFun && (
            <div className="mb-6 bg-indigo-100 p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-indigo-800 mb-2">
                Customer Information
              </h2>
              <p className="text-indigo-600">
                <span className="font-medium">Name:</span>{" "}
                {name || "Not provided"}
              </p>
              <p className="text-indigo-600">
                <span className="font-medium">Address:</span>{" "}
                {address || "Not provided"}
              </p>
            </div>
          )}
          <table className="w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-indigo-500 text-left text-white">
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="min-w-[120px] py-4 px-4 font-medium border text-left border-gray-200"
                  >
                    {column.header.toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="border-b border-gray-200 py-5 px-4"
                  >
                    <Skeleton
                      count={5}
                      height={30}
                      style={{
                        backgroundColor: "#e5e7eb",
                        borderRadius: "4px",
                        marginBottom: "8px",
                        animation: "pulse 2s infinite ease-in-out",
                      }}
                    />
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr className="hover:bg-slate-200">
                  <td
                    colSpan={columns.length}
                    className="border-b text-center border-gray-200 py-5 px-4 pl-9 xl:pl-11"
                  >
                    <h5 className="font-medium text-gray-800 bg-yellow-100 py-2 px-4 rounded-md">
                      No Data Found
                    </h5>
                  </td>
                </tr>
              ) : (
                data.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-slate-200">
                    {columns.map((column, colIndex) => (
                      <td
                        key={colIndex}
                        className={`border-b border-gray-200 py-5 px-4 ${
                          column.accessor === "department" ? "uppercase" : null
                        }`}
                      >
                        {column.render
                          ? column.render(row)
                          : column.accessor
                              .split(".")
                              .reduce((o, i) => o?.[i], row)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {totalTrue && (
            <p className="absolute right-[6.25rem] text-xl">Total:-{total}</p>
          )}
        </div>
        {pagination &&
          (data.length === 0 ? null : (
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={onPageChange}
              containerClassName={"pagination"}
              activeClassName={"active"}
              previousClassName={currentPage === 1 ? "disabled" : ""}
              nextClassName={currentPage === totalPages ? "disabled" : ""}
              previousLinkClassName={"pagination-link"}
              nextLinkClassName={"pagination-link"}
              disabledClassName={"pagination-disabled"}
              pageClassName={"pagination-page"}
              pageLinkClassName={"pagination-link"}
              breakClassName={"pagination-break"}
              breakLinkClassName={"pagination-link"}
              forcePage={currentPage - 1}
            />
          ))}
      </div>
    </section>
  );
}

export default Table;
