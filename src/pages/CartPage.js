import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { AiFillWarning } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(0);
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [isShowVisa, setIsShowVisa] = useState(true);
  const [loadingQR, setLoadingQR] = useState(false);
  const navigate = useNavigate();

  const cardItems = () => {
      const result = [];
      for (let i = 0; i < cart.length; i++) {
        const currentObj = cart[i];
        const _id = currentObj._id;
        let existingObj = result.find(obj => obj._id === _id);
    
        if (existingObj) {
          // If the _id already exists, increase the quantityCart by 1
          existingObj.quantityCart += 1;
        } else {
          // If the _id doesn't exist, add a new object with quantityCart 1
          existingObj = {...currentObj, quantityCart: 1 };
          result.push(existingObj);
        }
      }
    
      return result;
  }

  const handleChangePaymentMethod = (type) => {
    setPaymentMethod(type);
  };
  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "VND",
      });
    } catch (error) {
      console.log(error);
    }
  };


  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const w = await instance.requestPaymentMethod();
      console.log(w);
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce: w.nonce,
        cart,
      });
      console.log(w.nonce);
      console.log(data);
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handlePaymentQR = async () => {
    try {
      setIsShowVisa(false);
      setLoadingQR(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoadingQR(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoadingQR(false);
    }
  };
  return (
    <Layout className= "wrapper">
      <div className=" cart-page">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello Guest"
                : `Hello  ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `Bạn có ${cart.length} sản phẩm trong giỏ hàng ${
                      auth?.token ? "" : "Vui lòng đăng nhập để thanh toán !"
                    }`
                  : " Giỏ của bạn trống trơn 😑"}
              </p>
            </h1>
          </div>
        </div>
        <div className="container ">
          <div className="row ">
            <div className="col-md-5  p-0 m-0">
              {cardItems()?.map((p) => (
                <div className="row card flex-row" key={p._id}>


                  <div className="col-md-4">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      width="100%"
                      height={"130px"}
                    />
                  </div>
                  <div className="col-md-4">
                    <p>{p.name}</p>
                    {/* <p>{p.description.substring(0, 30)}</p> */}
                    <p>Giá:{p.price}VND</p>
                    <p>So luong:{p.quantityCart}</p>

                  </div>
                  <div className="col-md-4 cart-remove-btn">
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Xóa 😿
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-7 cart-summary">
              <div>
                <h2>Giỏ Hàng 🤑</h2>
                <p>/////////////////////////////</p>
                <hr />
                <h4>Tổng cộng : {totalPrice()} </h4>
                {auth?.user?.address ? (
                  <>
                    <div className="mb-4">
                      <h4>Địa chỉ hiện tại</h4>
                      <h5>{auth?.user?.address}</h5>
                      <button
                        className="btn btn-outline-warning"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        Cập nhật địa chỉ
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="mb-2">
                    {auth?.token ? (
                      <button
                        className="btn btn-outline-warning"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        Update Address
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline-warning"
                        onClick={() =>
                          navigate("/login", {
                            state: "/cart",
                          })
                        }
                      >
                        Vui lòng đăng nhập để thanh toán
                      </button>
                    )}
                  </div>
                )}
                <div>
                  <p onClick={() => handleChangePaymentMethod(0)}>
                    💳 Cổng thanh toán
                  </p>
                  <p onClick={() => handleChangePaymentMethod(1)}></p>
                </div>
                <div className="row">
                  <div className="col-md-6 mx-2"
                    style={{ opacity: `${isShowVisa ? 1 : 0}` }}
                  >
                    {!clientToken || !auth?.token || !cart?.length ? (
                      ""
                    ) : (
                      <>
                        <DropIn
                          options={{
                            authorization: clientToken,
                            paypal: {
                              flow: "vault",
                            },
                          }}
                          onInstance={(instance) => setInstance(instance)}
                        />

                        <button
                          className="btn btn-primary"
                          onClick={handlePayment}
                          disabled={
                            loading || !instance || !auth?.user?.address
                          }
                        >
                          {loading ? "Processing ...." : "Make Payment"}
                        </button>
                      </>
                    )}
                  </div>
                  <div className="col-md-4">
                    <img src="/images/QR.png" alt="QAcode" width={"200px"} />
                    <button style={{textAlign: "center"}}
                      className="btn btn-primary"
                      onClick={handlePaymentQR}
                      disabled={loadingQR || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Check Payment"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
