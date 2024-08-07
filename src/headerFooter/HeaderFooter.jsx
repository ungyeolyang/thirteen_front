import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const HeaderFooter = () => {
  useEffect(() => {
    return () => {
      localStorage.clear();
    };
  }, []);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default HeaderFooter;
