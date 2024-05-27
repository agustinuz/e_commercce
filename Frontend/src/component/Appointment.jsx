import React, { useState } from "react";
import "./css/Navbar.css";
import "./css/Appointment.css";
import ShoppingCartModal from "./ShoppingCartModal";
import { Link } from "react-router-dom";
import { Form, FormControl, Button, Card } from "react-bootstrap";

const Appointment = () => {
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

      <div className="container my-5">
        <h2 className="mb-3 text-center">
          <strong>Our Appointment Services</strong>
        </h2>
        <div className="row">
          <div className="col-md-4 mb-4">
            <Card className="h-80">
              <Card.Img
                variant="top"
                src="clinic7.jpg"
                className="appointment-image"
                alt="Treatment"
              />
              <Card.Body>
                <Card.Title>Treatment And Emergency</Card.Title>
                <Card.Text>
                  Comprehensive medical care for your pets including
                  vaccinations, check-ups, and treatments. Comprehensive medical
                  care for your pets including vaccinations, check-ups, and
                  treatments. Comprehensive medical care for your pets including
                  vaccinations, check-ups, and treatments. Comprehensive medical
                  care for your pets including vaccinations, check-ups, and
                  treatments.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-4 mb-4">
            <Card className="h-100">
              <Card.Img
                variant="top"
                src="clinic6.jpg"
                className="appointment-image"
                alt="Grooming"
              />
              <Card.Body>
                <Card.Title>Grooming</Card.Title>
                <Card.Text>
                  Professional grooming services for both cats and dogs to keep
                  your pets looking their best.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-4 mb-4">
            <Card className="h-100">
              <Card.Img
                variant="top"
                src="clinic5.jpg"
                className="appointment-image"
                alt="Boarding"
              />
              <Card.Body>
                <Card.Title>Boarding</Card.Title>
                <Card.Text>
                  Safe and comfortable boarding facilities for your pets while
                  you are away.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
        <div className="text-center mt-4">
          <Link to="/login">
            <Button variant="primary">Create Appointment</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
