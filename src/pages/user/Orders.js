import axios from "axios";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Jumbotron from "../../components/cards/Jumbotron";
import UserMenu from "../../components/nav/UserMenu";
import { useAuth } from "../../context/auth";
import moment from "moment";
import ProductCardHorizontal from "../../components/cards/ProductCardHorizontal";
import Loader from "../../components/Loader";

const Orders = () => {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const getOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/orders");
      setOrders(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return (
    <>
      <Jumbotron title={`Hello ${auth?.user?.name}`} subTitle="Dashboard" />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Orders</div>

            {loading ? (
              <Loader />
            ) : (
              <>
                {orders?.map((o, i) => {
                  return (
                    <div
                      key={o._id}
                      className="border shadow bg-light rounded-4 mb-5"
                    >
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Status</th>
                            <th scope="col">Buyer</th>
                            <th scope="col">Ordered</th>
                            <th scope="col">Payment</th>
                            <th scope="col">Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{i + 1}</td>
                            <td>{o?.status}</td>
                            <td>{o?.buyer?.name}</td>
                            <td>{moment(o?.createdAt).fromNow()}</td>
                            <td>
                              {o?.payment?.success ? "Success" : "Failed"}
                            </td>
                            <td>{o?.products?.length} products</td>
                          </tr>
                        </tbody>
                      </table>

                      <div className="container">
                        <div className="row m-2">
                          {o?.products?.map((p, i) => (
                            <ProductCardHorizontal
                              key={i}
                              p={p}
                              remove={false}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
