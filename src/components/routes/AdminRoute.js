import React, { useState, useEffect } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Loading from "./Loading";

const AdminRoute = () => {
  const [auth, setAuth] = useAuth();
  // state
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const adminCheck = async () => {
      const { data } = await axios.get(`/admin-check`);
      if(data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    }

    adminCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Loading path="" />;
};

export default AdminRoute;
