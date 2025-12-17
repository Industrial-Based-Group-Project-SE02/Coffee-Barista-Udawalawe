import React from "react";
import { Outlet } from "react-router-dom";
import CustomerNavbar from "../components/CustomerNavbar.jsx";

const CustomerLayout = () => {
  return (
    <>
    <div className="flex min-h-screen">
        <CustomerNavbar />
        <main className="flex-grow p-4 md:ml-60">
            <Outlet />
        </main>
    </div>
    </>
    );
};

export default CustomerLayout;