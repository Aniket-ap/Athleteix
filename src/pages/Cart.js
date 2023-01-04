import React from "react";
import { useNavigate } from "react-router-dom";
import Jumbotron from "../components/cards/Jumbotron";
import ProductCardHorizontal from "../components/cards/ProductCardHorizontal";
import UserCartSidebar from "../components/cards/UserCartSidebar";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";

const Cart = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <Jumbotron
        title={`Hello ${auth.token && auth?.user?.name} `}
        subtitle={
          cart?.length
            ? `You have ${cart?.length} items in the cart. ${
                auth?.token ? "" : "Please login to checkout"
              } `
            : "Your cart is empty"
        }
      />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="p-3 mt-2 mb-2 h4 bg-light text-center">
              {cart?.length > 0 ? (
                "My Cart"
              ) : (
                <div className="text-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/")}
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {cart?.length > 0 && (
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                {cart?.map((p, index) => (
                  <ProductCardHorizontal key={index} p={p} />
                ))}
              </div>
            </div>
            <UserCartSidebar />
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
