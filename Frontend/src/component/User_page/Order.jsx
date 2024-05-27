import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode as jwt_decode } from "jwt-decode";

const Order = () => {
  const [isSidebarToggled, setIsSidebarToggled] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarToggled(!isSidebarToggled);
  };
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    // Cek apakah pengguna sudah login sebelumnya
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/login");
    } else {
      const decodedToken = jwt_decode(accessToken);
      const name = decodedToken.name; // Mengambil nama pengguna dari token
      setName(name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // Hapus token dari localStorage
    navigate("/login"); // Redirect ke halaman login setelah logout
    navigate(0);
  };

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Dummy data for products
  const products = [
    { id: 1, name: "Product 1", price: 10 },
    { id: 2, name: "Product 2", price: 20 },
    { id: 3, name: "Product 3", price: 30 },
  ];

  const handlePayment = () => {
    setShowPaymentModal(true);
  };

  const handleUploadProof = (event) => {
    // You may handle upload logic here if needed
  };

  const handlePaymentSubmit = () => {
    // Here you can implement logic for payment submission
    // For example, send payment details to backend
    console.log("Payment submitted");
    setShowPaymentModal(false);
  };

  return (
    <body
      className={
        isSidebarToggled ? "sb-nav-fixed sb-sidenav-toggled" : "sb-nav-fixed"
      }
    >
      <nav className="sb-topnav navbar navbar-expand navbar-light bg-transparent">
        {/* <!-- Navbar Brand--> */}
        <Link className="navbar-brand ps-3" to="/Dashboard_Admin">
          <span style={{ color: "yellow" }}>PET SANCTUARY</span>
        </Link>
        {/* <!-- Sidebar Toggle--> */}
        <button
          className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
          id="sidebarToggle"
          onClick={toggleSidebar}
        >
          <i className="fas fa-bars"></i>
        </button>
        {/* <!-- Navbar Search--> */}
        <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
          <div className="input-group">
            <input
              className="form-control"
              type="text"
              placeholder="Search for..."
              aria-label="Search for..."
              aria-describedby="btnNavbarSearch"
            />
            <button
              className="btn btn-primary"
              id="btnNavbarSearch"
              type="button"
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
        </form>
        {/* <!-- Navbar--> */}
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-user fa-fw"></i>
            </Link>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdown"
            >
              <li>
                <Link className="dropdown-item" href="#">
                  Profile
                </Link>
                <Link className="dropdown-item" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <nav
            className="sb-sidenav accordion sb-sidenav-dark"
            id="sidenavAccordion"
          >
            <div className="sb-sidenav-menu">
              <div className="nav">
                <div className="sb-sidenav-menu-heading">Core</div>
                <Link className="nav-link" to="/DashboardUser">
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-tachometer-alt"></i>
                  </div>
                  Dashboard
                </Link>
                <div className="sb-sidenav-menu-heading">Interface</div>
                <Link
                  className="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseProduct"
                  aria-expanded="false"
                  aria-controls="collapseProduct"
                >
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-columns"></i>
                  </div>
                  LIst Menu
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down"></i>
                  </div>
                </Link>
                <div
                  className="collapse"
                  id="collapseProduct"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link className="nav-link" to="/AppointmentPage">
                      Appoitment List
                    </Link>
                    <Link className="nav-link" to="/Order">
                      Place Order
                    </Link>
                  </nav>
                </div>
                <div className="sb-sidenav-menu-heading">Addons</div>
                <Link className="nav-link" onClick={handleLogout}>
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-user fa-fw"></i>
                  </div>
                  Logout
                </Link>
              </div>
            </div>
            <div className="sb-sidenav-footer">
              <div className="small">Welcome : {name}</div>
            </div>
          </nav>
        </div>
        {/* // content order */}
        <div id="layoutSidenav_content">
          <div className="container-fluid px-4">
            <h3 style={{ marginBottom: "40px" }}>
              <strong>Table Order</strong>
            </h3>
            <table className="table table-success">
              <thead>
                <tr>
                  <th>No. Pesanan</th>
                  <th>Tanggal Pesanan</th>
                  <th>Nama</th>
                  <th>Item</th>
                  <th>Status</th>
                  <th>Bukti Pembayaran</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{new Date().toLocaleDateString()}</td>{" "}
                    {/* Tanggal pesanan diisi dengan tanggal saat ini, Anda dapat menyesuaikan sesuai kebutuhan */}
                    <td>John Doe</td> {/* Ganti dengan nama pelanggan */}
                    <td>{product.name}</td>
                    <td>
                      <span
                        className={
                          product.status === "Pending" ? "text-warning" : ""
                        }
                      >
                        {product.status}
                      </span>
                    </td>
                    <td>
                      <Button onClick={handlePayment}>Upload</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Payment Modal */}
            <Modal
              show={showPaymentModal}
              onHide={() => setShowPaymentModal(false)}
            >
              <Modal.Header closeButton>
                <Modal.Title>Payment</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Upload Payment Proof</Form.Label>
                  <Form.Control type="file" onChange={handleUploadProof} />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setShowPaymentModal(false)}
                >
                  Close
                </Button>
                <Button variant="primary" onClick={handlePaymentSubmit}>
                  Submit Payment
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
              <div className="d-flex align-items-center justify-content-between small">
                <div className="text-muted">
                  &copy; Copyright Agustinus Sitompul
                </div>
                <div>
                  <Link href="#">Privacy Policy</Link>
                  &middot;
                  <Link href="#">Terms &amp; Conditions</Link>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </body>
  );
};

export default Order;
