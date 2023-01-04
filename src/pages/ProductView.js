import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Badge } from "antd";
import {
  FaRupeeSign,
  FaProjectDiagram,
  FaRegClock,
  FaCheck,
  FaTimes,
  FaTruckMoving,
  FaWarehouse,
  FaRocket,
} from "react-icons/fa";
import moment from "moment";
import ProductCard from "../components/cards/ProductCard";
import { toast } from "react-hot-toast";
import { useCart } from "../context/cart";

const ProductView = () => {
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const params = useParams();
  const [cart, setCart] = useCart();

  const imgStyle = {
    height: "500px",
    width: "100%",
    objectFit: "contain",
  };

  useEffect(() => {
    if (params?.slug) loadProduct();
  }, [params?.slug]);

  const loadProduct = async (req, res) => {
    try {
      const { data } = await axios.get(`/product/${params?.slug}`);
      setProduct(data);
      loadRelated(data._id, data.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const loadRelated = async (pId, cId) => {
    try {
        const {data} = await axios.get(`/related-products/${pId}/${cId}`)
        setRelated(data)
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          <div className="card mb-3">
            <Badge.Ribbon text={`${product?.sold} sold`} color="red">
              <Badge.Ribbon
                text={`${product?.quantity >= 1 ? "In Stock" : "Out of Stock"}`}
                placement="start"
                color="green"
              >
                <img
                  className="card-img-top"
                  src={`${process.env.REACT_APP_API}/product/photo/${product._id}`}
                  alt={product.name}
                  style={imgStyle}
                />
              </Badge.Ribbon>
            </Badge.Ribbon>
            <div className="card-body">
              <h1 className="fw-bold">{product?.name}</h1>
              <p className="card-text lead">{product?.description}</p>
            </div>

            <div className="d-flex justify-content-between lead fw-bold">
              <div>
                <p className="mx-3">
                  {" "}
                   Price:{" "}<FaRupeeSign />
                  {product?.price}{" "}
                </p>
                <p className="mx-3"> <FaRegClock/> Added: {moment(product.createdAt).fromNow()} </p>
                <p className="mx-3">{product?.quantity > 0 ? <FaCheck/> : <FaTimes/>} {product?.quantity > 0 ? "In Stock" : "Out of Stock"}</p>
                <p className="mx-3"> <FaWarehouse/> Available {product?.quantity - product?.sold} </p>
                <p className="mx-3"><FaRocket/> Sold {product?.sold} </p>
              </div>
            </div>

            <button
              className="btn btn-outline-primary col card-button"
              style={{ borderBottomRightRadius: "5px" }}
              onClick={() => {
                setCart([...cart, product])
                toast.success("Added to cart successfully")
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
        <div className="col-md-4">
          <h2>Related Products</h2>
          <hr/>
          {related?.length < 1 && <p>Nothing Found</p>}
          {related?.map((p) => <ProductCard key={p._id} p={p} />)}
        </div>
      </div>
    </div>
  );
};

export default ProductView;
