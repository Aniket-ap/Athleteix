import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import DropIn from "braintree-web-drop-in-react";
import toast from "react-hot-toast"

const UserCartSidebar = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const cartTotal = () => {
    let total = 0;
    cart.map((item) => {
      total += item.price;
    });
    return total.toLocaleString("INR", {
      style: "currency",
      currency: "INR",
    });
  };

  useEffect(() => {
    if (auth?.token) {
      getClientToken();
    }
  }, []);

  const getClientToken = async () => {
    try {
      const { data } = await axios.get("/braintree/token");
      setClientToken(data.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async () => {
    try {
        setLoading(true)
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false)
      localStorage.removeItem("cart");
      setCart([]);
      toast.success("Payment Successful")
      navigate("/dashboard/user/orders");
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  return (
    <>
      <div className="col-md-4 mb-5">
        <h4>Your cart summary</h4>
        Total / Address / Payments
        <hr />
        <h6>Total: {cartTotal()}</h6>
        {auth?.user?.address ? (
          <>
            <div className="mb-3">
              <hr />
              <h4>Delivery Address:</h4>
              <h5>{auth?.user?.address}</h5>
            </div>
            <button
              className="btn btn-outline-warning"
              onClick={() => navigate(`/dashboard/user/profile`)}
            >
              Update Address
            </button>
          </>
        ) : (
          <div className="mb-3">
            {auth?.token ? (
              <button
                className="btn btn-outline-warning"
                onClick={() => navigate(`/dashboard/user/profile`)}
              >
                Add delivery address
              </button>
            ) : (
              <button
                className="btn btn-outline-danger"
                onClick={() =>
                  navigate(`/login`, {
                    state: "/cart",
                  })
                }
              >
                Login to checkout
              </button>
            )}
          </div>
        )}
        <div className="mt-3">
          {!clientToken || !cart?.length ? (
            ""
          ) : (
            <>
              <DropIn
                options={{
                  authorization: clientToken,
                }}
                onInstance={(instance) => setInstance(instance)}
              />
              <button
                className="btn btn-primary col-12 mt-2"
                onClick={handleBuy}
                disabled={!auth?.user?.address || !instance || loading}
              >
                {loading ? "Processing" : "Buy"}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UserCartSidebar;
