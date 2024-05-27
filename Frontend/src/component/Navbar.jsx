import React, { useState, useEffect } from "react";
import ShoppingCartModal from "./ShoppingCartModal";
import { Form, FormControl, Button } from "react-bootstrap";
import "./css/Navbar.css";
import { Link } from "react-router-dom";
// import ProductList from "./ProductList"; // Tambahkan impor untuk ProductList
import AboutUs from "./AboutUs";

const Navbar = () => {
  const [showCartModal, setShowCartModal] = useState(false);

  const handleCartModalClose = () => setShowCartModal(false);
  const handleCartModalShow = (e) => {
    e.preventDefault();
    setShowCartModal(true);
  };

  const Loading = () => {
    return <>Loading....</>;
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating fetching product categories from the API
    setTimeout(() => {
      setLoading(false);
    }, 1500); // Simulating a delay of 1.5 seconds for loading effect
  }, []);

  // Contoh data produk
  const products = [
    {
      name: "Healthy Dog Food",
      image: "",
      price: 15.99,
      description: "Premium dog food with natural ingredients.",
    },
    {
      name: "Whiskerlickin' Cat Treats",
      image: "cat_treats_image.jpg",
      price: 9.99,
      description: "Irresistible treats for your feline friend.",
    },
    {
      name: "Whiskerlickin' Cat Treats",
      image: "cat_treats_image.jpg",
      price: 9.99,
      description: "Irresistible treats for your feline friend.",
    },
    {
      name: "Whiskerlickin' Cat Treats",
      image: "cat_treats_image.jpg",
      price: 9.99,
      description: "Irresistible treats for your feline friend.",
    },
    {
      name: "Whiskerlickin' Cat Treats",
      image: "cat_treats_image.jpg",
      price: 9.99,
      description: "Irresistible treats for your feline friend.",
    },
    {
      name: "Whiskerlickin' Cat Treats",
      image: "cat_treats_image.jpg",
      price: 9.99,
      description: "Irresistible treats for your feline friend.",
    },
    {
      name: "Whiskerlickin' Cat Treats",
      image: "cat_treats_image.jpg",
      price: 9.99,
      description: "Irresistible treats for your feline friend.",
    },
    {
      name: "Whiskerlickin' Cat Treats",
      image: "cat_treats_image.jpg",
      price: 9.99,
      description: "Irresistible treats for your feline friend.",
    },
    {
      name: "Whiskerlickin' Cat Treats",
      image: "cat_treats_image.jpg",
      price: 9.99,
      description: "Irresistible treats for your feline friend.",
    },
    {
      name: "Whiskerlickin' Cat Treats",
      image: "cat_treats_image.jpg",
      price: 9.99,
      description: "Irresistible treats for your feline friend.",
    },
    {
      name: "Whiskerlickin' Cat Treats",
      image: "cat_treats_image.jpg",
      price: 9.99,
      description: "Irresistible treats for your feline friend.",
    },
    {
      name: "Whiskerlickin' Cat Treats",
      image: "cat_treats_image.jpg",
      price: 9.99,
      description: "Irresistible treats for your feline friend.",
    },
    {
      name: "Whiskerlickin' Cat Treats",
      image: "cat_treats_image.jpg",
      price: 9.99,
      description: "Irresistible treats for your feline friend.",
    },
    {
      name: "Whiskerlickin' Cat Treats",
      image: "cat_treats_image.jpg",
      price: 9.99,
      description: "Irresistible treats for your feline friend.",
    },
    // Tambahkan lebih banyak produk di sini sesuai kebutuhan
  ];

  const navbarStyle = {
    borderRadius: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "95%",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  };

  return (
    <div style={navbarStyle}>
      <nav className="navbar fixed-top navbar-expand-lg navbar-light p-md-3">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold fs-4" href="#">
            PET <span style={{ color: "yellow" }}>SANCTUARY</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-3 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link fs-bold" href="#home">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/ProductList">
                  Product
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Appointment" className="nav-link">
                  Appointment
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#aboutus">
                  About Us
                </a>
              </li>
            </ul>
            <div className="d-flex align-items-center">
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                />
              </Form>
              <Button variant="outline-success" className="ml-2 ms-2">
                Search
              </Button>
              <a
                href=""
                onClick={handleCartModalShow}
                className="btn btn-outline-success ms-2"
              >
                <i className="fa fa-shopping-cart me-1"></i> Cart (0)
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Banner Image */}
      <div
        id="home"
        className="banner-image w-100 vh-100 d-flex justify-content-center align-items-center"
      >
        <div className="container ml-6 text-white">
          <h1 className="fw-bold">Welcome to Pet Sanctuary</h1>
          <figcaption className="blockquote-footer fs-5">
            Animal <cite title="Source Title">Care</cite>
          </figcaption>
          <p
            className="lead fs-5 fw-bold fst-italic"
            style={{ color: "yellowgreen" }}
          >
            "we provide medical, veterinary care and various types of pet food"
          </p>
          <Link to="/Login">
            <Button variant="outline-success">ORDER NOW !!</Button>
          </Link>
          <a href="#product">
            <Button variant="outline-success" className="mx-3">
              CHEACK NEW PRODUCT !!
            </Button>
          </a>
        </div>
      </div>
      <ShoppingCartModal
        show={showCartModal}
        handleClose={handleCartModalClose}
      />

      {/* content */}
      <section id="product" className="py-5 section-content product-section">
        <div className="container">
          <div className="title text-center">
            <h2 className="position-relative d-inline-block">New Product</h2>
          </div>
          <div className="row justify-content-center mt-5">
            {/* {loading ? <Loading /> : <ProductList products={products} />} */}
          </div>
        </div>
      </section>
      <section id="aboutus" className="py-5 section-content">
        <AboutUs />
      </section>
    </div>
  );
};

export default Navbar;
