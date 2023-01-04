import React from "react";
import { Badge } from "antd";
import { useCart } from "../../context/cart";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const ProductCard = ({ p }) => {
  const imgStyle = {
    height: "300px",
    objectFit: "cover",
  };
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  return (
    <div className="card mb-3 hoverable">
      <Badge.Ribbon text={`${p?.sold} sold`} color="red">
        <Badge.Ribbon
          text={`${p?.quantity >= 1 ? "In Stock" : "Out of Stock"}`}
          placement="start"
          color="green"
        >
          <img
            className="card-img-top img-fluid"
            src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
            alt={p.name}
            style={imgStyle}
          />
        </Badge.Ribbon>
      </Badge.Ribbon>
      <div className="card-body">
        <h5>{p?.name?.substring(0, 20)}...</h5>
        <h4 className="fw-bold">
          {p?.price?.toLocaleString("INR", {
            style: "currency",
            currency: "INR",
          })}
        </h4>
        <p className="card-text">{p?.description?.substring(0, 60)}...</p>
      </div>

      <div className="d-flex justify-content-center">
        <button
          className="btn btn-primary m-2"
          style={{ borderBottomLeftRadius: "5px" }}
          onClick={() => navigate(`/product/${p.slug}`)}
        >
          View Product
        </button>
        <button
          className="btn btn-outline-primary m-2"
          onClick={() => {
            setCart([...cart, p])
            localStorage.setItem("cart", JSON.stringify([...cart, p]))
            toast.success("Added to cart successfully")
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
