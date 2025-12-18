import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/header";
import Footer from "../components/footer";

function PublicLayout() {
  return (
    <>
      <Navbar />
      <div className="">
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
export default PublicLayout;