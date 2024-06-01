import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio, Carousel } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import "../styles/Homepage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  //carousel
  const contentStyle = {
    width: "100%",
    height: "800px",
    backgroundImage: "cover",
    backgroundPosition: "cover",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    background: "#364d79",
    borderRadius: "10px",
    overflow: "hidden",
  };
  const slides = {
    width: "500%",
    height: "800px",
    display: "flex",
  };
  const slide = {
    width: "20%",
    transition: "2s",
  };

  return (
    <Layout title={"ALl Products - Best offers "}>
      {/* banner image /images/banner.png */}
      <Carousel autoplay style={{ marginTop: "72px" }}>
        <div style={contentStyle}>
          <div style={slides}>
            <div style={slide}>
              <img
                src="/images/b1.jpg"
                className="banner-img"
                style={{
                  width: "100%",
                  height: "800px",
                  backgroundImage: "cover",
                  backgroundPosition: "cover",
                  imageRendering: "pixelated",
                }}
                alt="bannerimage"
              />
            </div>
          </div>
        </div>

        <div style={contentStyle}>
          <div style={slides}>
            <div style={slide}>
              <img
                src="/images/b2.png"
                className="banner-img"
                style={{
                  width: "100%",
                  height: "800px",
                  backgroundImage: "cover",
                  backgroundPosition: "cover",
                  imageRendering: "pixelated",
                }}
                alt="bannerimage"
              />
            </div>
          </div>
        </div>

        <div style={contentStyle}>
          <div style={slides}>
            <div style={slide}>
              <img
                src="/images/b3.png"
                className="banner-img"
                style={{
                  width: "100%",
                  height: "800px",
                  backgroundImage: "cover",
                  backgroundPosition: "cover",
                  imageRendering: "pixelated",
                }}
                alt="bannerimage"
              />
            </div>
          </div>
        </div>

        <div style={contentStyle}>
          <div style={slides}>
            <div style={slide}>
              <img
                src="/images/b1.jpg"
                className="banner-img"
                style={{
                  width: "100%",
                  height: "800px",
                  backgroundImage: "cover",
                  backgroundPosition: "cover",
                  imageRendering: "pixelated",
                }}
                alt="bannerimage"
              />
            </div>
          </div>
        </div>
      </Carousel>

      {/* banner image */}
      <div className="container-fluid row mt-3 home-page">
        <div className="col-md-3 filters">
          <h4 className="text-start p-3">👜 Bộ lọc</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* price filter */}
          <h4 className="text-start p-3 mt-4">💸 Giá</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              Đặt lại
            </button>
          </div>
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">😻 SẢN PHẨM MỚI 🐶</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <div style={{height:'190px'}}>
                    <div className="card-name-price" >
                      <h5 className="card-title">{p.name}</h5>
                      <h5 className="card-title card-price">
                        {p.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </h5>
                    </div>
                    <p className="card-text ">
                      {p.description.substring(0, 60)}...
                    </p>
                  </div>
                  <div className="card-name-price">
                    <button
                      className="btn btn-info ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      Chi tiết
                    </button>
                    <button
                      className="btn btn-dark ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      🛍️ Mua ngay
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Xem thêm <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
