import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import Search from "../forms/Search";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import logo from "../../logo.jpg"
import {FaUserAlt} from "react-icons/fa"

const Menu = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  const navigate = useNavigate();

  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <>
      <ul className="nav d-flex justify-content-between align-items-center shadow-sm mb-3 p-1 bg-light sticky-top">
        <li className="nav-item">
          <NavLink className="navbar-brand" aria-current="page" to="/">
            <img src={logo} alt="logo" height="70px" width="150px" />
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-dark fw-bold" aria-current="page" to="/shop">
            SHOP
          </NavLink>
        </li>

        <li className="nav-item">
          <Badge count={cart?.length >= 1 ? cart.length : 0} offset={[-5, 7]} showZero={true}>
            <NavLink className="nav-link text-dark fw-bold" aria-current="page" to="/cart">
              CART
            </NavLink>
          </Badge>
        </li>

        <Search />

        {!auth?.user ? (
          <>
            <li className="nav-item">
              <NavLink className="nav-link text-dark fw-bold" to="/login">
                LOGIN
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-dark fw-bold" to="/register">
                REGISTER
              </NavLink>
            </li>
          </>
        ) : (
          <div className="dropdown">
            <li>
              <a
                className="nav-link pointer dropdown-toggle text-dark fw-bold"
                data-bs-toggle="dropdown"
              >
                <FaUserAlt size="25px" /> {auth?.user?.name}
              </a>
              <ul className="dropdown-menu">
                <li>
                  <NavLink
                    className="nav-link text-dark fw-bold"
                    to={`/dashboard/${
                      auth?.user?.roll === 1 ? "admin" : "user"
                    }`}
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item pointer">
                  <a className="nav-link text-dark fw-bold" onClick={logout}>
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </div>
        )}
      </ul>
    </>
  );
};

export default Menu;
