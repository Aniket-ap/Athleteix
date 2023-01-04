import React from "react";
import { useCart } from "../../context/cart";

const ProductCardHorizontal = ({ p, remove = true }) => {
  const [cart, setCart] = useCart();

  const removeFromCart = (productId) => {
    let myCart = [...cart];
    let index = myCart.findIndex((item) => item._id === productId);
    myCart.splice(index, 1);
    setCart(myCart);
    localStorage.setItem("cart", JSON.stringify(myCart));
  };

  const imgStyle = {
    height: "150px",
    objectFit: "cover",
    marginLeft: "-12px",
    borderTopRightRadius: "0px",
  };

  return (
    <>
      <div className="card mb-3" style={{ maxWidth: "540px" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              style={imgStyle}
              src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
              alt={p.name}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">
                {`${p?.name.substring(0, 15)} ...`}
                {p?.price?.toLocaleString("INR", {
                  style: "currency",
                  currency: "INR",
                })}
              </h5>
              <p className="card-text">{`${p?.description.substring(
                0,
                50
              )} ...`}</p>
            </div>
            <div className="d-flex justify-content-end">
              {remove && (
                <p
                className="text-danger mb-2 pointer"
                onClick={() => removeFromCart(p._id)}
              >
                Remove
              </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCardHorizontal;
