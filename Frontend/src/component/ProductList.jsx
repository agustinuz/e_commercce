import React, { useState } from "react";
import "./css/Navbar.css";
import "./css/product.css";
import ShoppingCartModal from "./ShoppingCartModal";
import { Link } from "react-router-dom";
import { Form, FormControl, Button, Card } from "react-bootstrap";

const ProductList = () => {
  const [showCartModal, setShowCartModal] = useState(false);

  const handleCartModalClose = () => setShowCartModal(false);
  const handleCartModalShow = (e) => {
    e.preventDefault();
    setShowCartModal(true);
  };

  const navbarStyle = {
    borderRadius: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "95%",
    margin: "20px auto",
    padding: "20px",
    backgroundImage: "url('/asset/picture2.jpg')", // Ganti dengan URL gambar latar belakang Anda
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundColor: "rgba(70, 129, 239, 0.7)", // Warna transparan untuk efek overlay
    backgroundBlendMode: "overlay",
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
                <a className="nav-link fs-bold" href="/">
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
                <a className="nav-link" href="/">
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
      <ShoppingCartModal
        show={showCartModal}
        handleClose={handleCartModalClose}
      />
      <div class="container my-5">
        <div class="row">
          <h2 className="mb-3">
            <strong>List Product</strong>
          </h2>
          <figcaption className="blockquote-footer mb-5">
            all of <cite title="Source Title">Product</cite>
          </figcaption>
          <div class="col-md-4 mb-4">
            <div class="card h-100">
              <img
                src="/asset/cat1.jpg"
                class="card-img-top product-image"
                alt="Product Image"
              />
              <div class="card-body">
                <h5 class="card-title product-title">Product Name</h5>
                <p class="card-text product-price">$99.99</p>
                <p class="card-text product-description">
                  This is a detailed description of the product. It highlights
                  the features and benefits.
                </p>
                <a href="#" class="btn add-to-cart-btn">
                  Add to Cart
                </a>
              </div>
            </div>
          </div>
          {/* <!-- Repeat the product card two more times for the row --> */}
          <div class="col-md-4 mb-4">
            <div class="card h-100">
              <img
                src="https://via.placeholder.com/500"
                class="card-img-top product-image"
                alt="Product Image"
              />
              <div class="card-body">
                <h5 class="card-title product-title">Product Name</h5>
                <p class="card-text product-price">$99.99</p>
                <p class="card-text product-description">
                  This is a detailed description of the product. It highlights
                  the features and benefits.
                </p>
                <a href="#" class="btn add-to-cart-btn">
                  Add to Cart
                </a>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="card h-100">
              <img
                src="https://via.placeholder.com/500"
                class="card-img-top product-image"
                alt="Product Image"
              />
              <div class="card-body">
                <h5 class="card-title product-title">Product Name</h5>
                <p class="card-text product-price">$99.99</p>
                <p class="card-text product-description">
                  This is a detailed description of the product. It highlights
                  the features and benefits.
                </p>
                <a href="#" class="btn add-to-cart-btn">
                  Add to Cart
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Add more rows as needed --> */}
        <div class="row">
          <div class="col-md-4 mb-4">
            <div class="card h-100">
              <img
                src="https://via.placeholder.com/500"
                class="card-img-top product-image"
                alt="Product Image"
              />
              <div class="card-body">
                <h5 class="card-title product-title">Product Name</h5>
                <p class="card-text product-price">$99.99</p>
                <p class="card-text product-description">
                  This is a detailed description of the product. It highlights
                  the features and benefits.
                </p>
                <a href="#" class="btn add-to-cart-btn">
                  Add to Cart
                </a>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="card h-100">
              <img
                src="https://via.placeholder.com/500"
                class="card-img-top product-image"
                alt="Product Image"
              />
              <div class="card-body">
                <h5 class="card-title product-title">Product Name</h5>
                <p class="card-text product-price">$99.99</p>
                <p class="card-text product-description">
                  This is a detailed description of the product. It highlights
                  the features and benefits.
                </p>
                <a href="#" class="btn add-to-cart-btn">
                  Add to Cart
                </a>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="card h-100">
              <img
                src="https://via.placeholder.com/500"
                class="card-img-top product-image"
                alt="Product Image"
              />
              <div class="card-body">
                <h5 class="card-title product-title">Product Name</h5>
                <p class="card-text product-price">$99.99</p>
                <p class="card-text product-description">
                  This is a detailed description of the product. It highlights
                  the features and benefits.
                </p>
                <a href="#" class="btn add-to-cart-btn">
                  Add to Cart
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
