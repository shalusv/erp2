import React from "react";
import Header from "./client/common/Header";
import Footer from "./client/common/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet /> {/* Renders the matched child route */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
