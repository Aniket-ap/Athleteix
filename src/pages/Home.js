import React, { useEffect, useState } from "react";
import Jumbotron from "../components/cards/Jumbotron";
import { useAuth } from "../context/auth";
import axios from "axios";
import ProductCard from "../components/cards/ProductCard";
import Loader from "../components/Loader";

const Home = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
    getTotals();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const getTotals = async () => {
    try {
      const { data } = await axios.get("/products-count");
      setTotal(data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/list-products/${page}`);
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/list-products/${page}`);
      setProducts([...products, ...data]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const arr = [...products];
  const sortBySold = arr?.sort((a, b) => (a.sold < b.sold ? 1 : -1));

  return (
    <React.Fragment>
      <Jumbotron title="Aethletix" subtitle="Welcome to ATHLETIX store" />

      <div className="row">
        <div className="col-md-6">
          <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">
            New Arrivals
          </h2>
          {loading ? (
            <Loader />
          ) : (
            <div className="row">
              {products?.map((p) => (
                <div className="col-md-6" key={p._id}>
                  <ProductCard p={p} />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="col-md-6">
          <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">
            Best Sellers
          </h2>
          {loading ? (
            <Loader />
          ) : (
            <div className="row">
              {sortBySold?.map((p) => (
                <div className="col-md-6" key={p._id}>
                  <ProductCard p={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="container text-center p-5">
        {products && products.length < total && (
          <button
            className="btn btn-warning"
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              setPage(page + 1);
            }}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        )}
      </div>
    </React.Fragment>
  );
};

export default Home;
