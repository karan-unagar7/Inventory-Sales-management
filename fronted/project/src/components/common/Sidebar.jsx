import { useState } from "react";
import { FaBars, FaTachometerAlt } from "react-icons/fa";
import { MdProductionQuantityLimits } from "react-icons/md";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`bg-gray-600 min-h-[93.2vh]  relative text-white   ${
        isOpen ? "w-60" : "w-16"
      } transition-width duration-300`}
    >
      <div className="p-4">
        <button onClick={toggleSidebar} className="focus:outline-none">
          <FaBars
            className={`text-white ${
              isOpen ? "absolute right-8" : "absolute right-[24px]"
            }`}
          />
        </button>
      </div>
      <nav>
        <ul
          className={`${
            isOpen ? "" : "flex flex-col justify-center items-center"
          }`}
        >
          <li className="hover:bg-gray-700 rounded-md p-2 transition-colors duration-300">
            <Link
              to="/dashboard"
              className="flex items-center space-x-2"
            >
              <FaTachometerAlt />
              <span className={`${isOpen ? "block" : "hidden"}`}>
                Dashboard
              </span>
            </Link>
          </li>
          <li className="hover:bg-gray-700 rounded-md p-2 transition-colors duration-300">
            <Link to="/product/product" className="flex items-center space-x-2">
              <MdProductionQuantityLimits />
              <span className={`${isOpen ? "block" : "hidden"}`}>Product</span>
            </Link>
          </li>
          <li className="hover:bg-gray-700 rounded-md p-2 transition-colors duration-300">
            <Link to="/sale/sale" className="flex items-center space-x-2">
              <FaTachometerAlt />
              <span className={`${isOpen ? "block" : "hidden"}`}>Sale</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
