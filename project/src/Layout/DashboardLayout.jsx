import React from "react";
import { Outlet } from "react-router-dom";
import SiteHeader from "../components/SiteHeader";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <SiteHeader />

      <main className="flex-1 p-6 bg-gray-100 ml-64">
        <Outlet /> 
      </main>
    </div>
  );
};

export default DashboardLayout;
