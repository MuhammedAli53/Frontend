import React, { useEffect, useState } from "react";
import Topbar from "../components/common/topbar";
import Menubar from "../components/common/menubar";
import Footer from "../components/common/footer";
import { Outlet, useLocation } from "react-router-dom";
import ScrollToTopButton from "../components/common/scroll-to-top-button";
import { useDispatch } from "react-redux";
import { setCurrentRecord, setOperation } from "../store/slices/misc-slice";

const UserLayout = () => {
  const { pathname } = useLocation();/* sayfa değişimlerini yakalamak için yazdık.  */

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.document.documentElement.scrollTo({ top: 0 });
    dispatch(setCurrentRecord(null));
    dispatch(setOperation(null));
    setLoading(false);
  }, [pathname]);

  return (
    <>
      <Topbar />
      <Menubar />
      <Outlet />
      <Footer />
      <ScrollToTopButton/>
    </>
  );
};

export default UserLayout;
