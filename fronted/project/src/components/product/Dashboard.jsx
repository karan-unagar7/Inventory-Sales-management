// eslint-disable-next-line react/prop-types, no-unused-vars
import React from "react";

function Dashboard() {
  return (
    <div className="bg-gradient-to-r from-indigo-300 to-purple-300 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Dashboard Page</h1>
      <p className="text-lg text-gray-700 mb-8 m-5">
        Welcome to the Inventory and Sales Management Dashboard. Here you can
        manage your products, track sales, and generate reports to help optimize
        your business operations.
      </p>
    </div>
  );
}

export default Dashboard;
