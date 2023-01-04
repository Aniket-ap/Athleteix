import React, { useState, useEffect } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Loading from "./Loading";

const PrivateRoute = () => {
  const [auth, setAuth] = useAuth();
  // state
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const authCheck = async () => {
      const { data } = await axios.get(`/auth-check`);
      if(data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };

    authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Loading />;
};

export default PrivateRoute;
