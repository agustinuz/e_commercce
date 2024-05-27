// Dashboard_Admin.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";
import { jwtDecode as jwt_decode } from "jwt-decode";

const Dashboard_Admin = () => {
  const [isSidebarToggled, setIsSidebarToggled] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarToggled(!isSidebarToggled);
  };

  const chartRef = useRef(null);
  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const myLineChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "Mar 1",
          "Mar 2",
          "Mar 3",
          "Mar 4",
          "Mar 5",
          "Mar 6",
          "Mar 7",
          "Mar 8",
          "Mar 9",
          "Mar 10",
          "Mar 11",
          "Mar 12",
          "Mar 13",
        ],
        datasets: [
          {
            label: "Sessions",
            lineTension: 0.3,
            backgroundColor: "rgba(2,117,216,0.2)",
            borderColor: "rgba(2,117,216,1)",
            pointRadius: 5,
            pointBackgroundColor: "rgba(2,117,216,1)",
            pointBorderColor: "rgba(255,255,255,0.8)",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(2,117,216,1)",
            pointHitRadius: 50,
            pointBorderWidth: 2,
            data: [
              10000, 30162, 26263, 18394, 18287, 28682, 31274, 33259, 25849,
              24159, 32651, 31984, 38451,
            ],
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              time: {
                unit: "date",
              },
              gridLines: {
                display: false,
              },
              ticks: {
                maxTicksLimit: 7,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                min: 0,
                max: 40000,
                maxTicksLimit: 5,
              },
              gridLines: {
                color: "rgba(0, 0, 0, .125)",
              },
            },
          ],
        },
        legend: {
          display: false,
        },
      },
    });

    return () => {
      myLineChart.destroy();
    };
  }, []);

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
                <Link className="nav-link" to="/Dashboard_Admin">
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
                  Product
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
                    <Link className="nav-link" to="/AddCategory">
                      Category
                    </Link>
                    <Link className="nav-link" to="/AddMerk">
                      Brand
                    </Link>
                    <Link className="nav-link" to="/AddProduct">
                      Product
                    </Link>
                  </nav>
                </div>
                <Link
                  className="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseManage"
                  aria-expanded="false"
                  aria-controls="collapseManage"
                >
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-book-open"></i>
                  </div>
                  Manage
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down"></i>
                  </div>
                </Link>
                <div
                  className="collapse"
                  id="collapseManage"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav
                    className="sb-sidenav-menu-nested nav accordion"
                    id="sidenavAccordionPages"
                  >
                    <Link
                      className="nav-link collapsed"
                      href="#"
                      data-bs-toggle="collapse"
                      data-bs-target="#pagesCollapselist"
                      aria-expanded="false"
                      aria-controls="pagesCollapselist"
                    >
                      List
                      <div className="sb-sidenav-collapse-arrow">
                        <i className="fas fa-angle-down"></i>
                      </div>
                    </Link>
                    <div
                      className="collapse"
                      id="pagesCollapselist"
                      aria-labelledby="headingOne"
                      data-bs-parent="#sidenavAccordionPages"
                    >
                      <nav className="sb-sidenav-menu-nested nav">
                        <Link className="nav-link" href="/Tables">
                          Order
                        </Link>
                        <Link className="nav-link" to="/ListAppointment">
                          Appointment
                        </Link>
                        <Link className="nav-link" to="/ListUser">
                          User
                        </Link>
                      </nav>
                    </div>
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
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid">
              <h1 className="mt-4">Dashboard</h1>
              <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Leaboard</li>
              </ol>
              <div className="row">
                <div className="col-xl-3 col-md-6">
                  <div className="card bg-primary text-white mb-4">
                    <div className="card-body">Primary Card</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                      <Link
                        className="small text-white stretched-link"
                        href="#"
                      >
                        View Details
                      </Link>
                      <div className="small text-white">
                        <i className="fas fa-angle-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="card bg-warning text-white mb-4">
                    <div className="card-body">Warning Card</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                      <Link
                        className="small text-white stretched-link"
                        href="#"
                      >
                        View Details
                      </Link>
                      <div className="small text-white">
                        <i className="fas fa-angle-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="card bg-success text-white mb-4">
                    <div className="card-body">Success Card</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                      <Link
                        className="small text-white stretched-link"
                        href="#"
                      >
                        View Details
                      </Link>
                      <div className="small text-white">
                        <i className="fas fa-angle-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="card bg-danger text-white mb-4">
                    <div className="card-body">Danger Card</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                      <Link
                        className="small text-white stretched-link"
                        href="#"
                      >
                        View Details
                      </Link>
                      <div className="small text-white">
                        <i className="fas fa-angle-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-6">
                  <div className="card mb-4">
                    <div className="card-header">
                      <i className="fas fa-chart-area me-1"></i>
                      Area Chart Example
                    </div>
                    <div className="card-body">
                      <canvas
                        id="myAreaChart"
                        ref={chartRef} // Attach the ref to the canvas
                        width="100%"
                        height="40"
                      ></canvas>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-6"></div>
              </div>
            </div>
          </main>
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
export default Dashboard_Admin;
