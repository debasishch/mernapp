import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MyOrder() {
  const [orderData, setOrderData] = useState(null);

  const fetchMyOrder = async () => {
    const email = localStorage.getItem("userEmail");
    try {
      const response = await fetch("http://localhost:5000/api/myorderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log("Order Data:", data); // Check if this logs the correct data
      setOrderData(data.orderData); // instead of setOrderData(data)
    } catch (error) {
      console.error("Error fetching order data:", error); // Check if there is any error
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="container">
        <div className="row">
        {orderData &&
  orderData.order_data &&
  orderData.order_data.length > 0 ? (
    orderData.order_data
      .slice(0)
      .reverse()
      .map((order, orderIndex) => (
        <div key={orderIndex}>
          {order.Order_date ? (
            <div className="m-auto mt-5">
              <strong>
                Order Date:{" "}
                {new Date(order.Order_date).toLocaleDateString()}
              </strong>
              <hr />
            </div>
          ) : null}

          <div className="row">
            {order.items.map((arrayData, arrayIndex) => (
              <div key={arrayIndex} className="col-12 col-md-6 col-lg-3">
                <div
                  className="card mt-3"
                  style={{ width: "16rem", maxHeight: "360px" }}
                >
                  {/* Image is removed here */}
                  {/* <img
                    src={arrayData.img}
                    className="card-img-top"
                    alt={arrayData.name}
                    style={{ height: "120px", objectFit: "fill" }}
                  /> */}
                  <div className="card-body">
                    <h5 className="card-title">{arrayData.name}</h5>
                    <div
                      className="container w-100 p-0"
                      style={{ height: "38px" }}
                    >
                      <span className="m-1">{arrayData.qty}</span>
                      <span className="m-1">{arrayData.size}</span>
                      <div className="d-inline ms-2 h-100 w-20 fs-5">
                        ₹{arrayData.price}/-
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))
  ) : (
    <p>No orders found.</p>
  )}    
        </div>
      </div>

      <Footer />
    </div>
  );
}
