import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode as jwt_decode } from "jwt-decode";

const ListUser = () => {
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

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Mengambil token dari localStorage
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await axios.get("http://localhost:5000/getUsers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("There was an error fetching the users!", error);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array means this effect runs once on mount

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
          <div className="container px-5 ">
            <h2 className="mb-3">
              <strong>Users</strong>
            </h2>
            <figcaption className="blockquote-footer mb-5">
              List All <cite title="Source Title">Users</cite>
            </figcaption>
            <div className="bg-info p-4 shadow rounded-lg">
              <div className="table-responsive">
                <table className="table table-sm table-primary">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map((user) => (
                        <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4">No users found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
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
export default ListUser;
