import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Pagination } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Table.css";
import { jwtDecode as jwt_decode } from "jwt-decode";

const AddCategory = ({ fetchData }) => {
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

  const [kategoris, setKategoris] = useState([]);
  const [newKategori, setNewKategori] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [kategoriNameToDelete, setKategoriNameToDelete] = useState("");
  const [kategoriNameToUpdate, setKategoriNameToUpdate] = useState("");
  const [newName, setNewName] = useState("");
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchKategoris();
  }, []);

  const fetchKategoris = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getKategori");
      setKategoris(response.data);
    } catch (error) {
      console.error("Error fetching kategoris:", error);
    }
  };

  const handleCreateKategori = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/createKategori",
        {
          nameKategori: newKategori,
        }
      );
      console.log("Response from creating kategori:", response.data);
      fetchKategoris();
      setNewKategori("");
      setShowModal(false);
    } catch (error) {
      console.error("Error creating kategori:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:5000/deleteKategori", {
        data: { nameKategori: kategoriNameToDelete },
      });
      setShowDeleteModal(false);
      // Lakukan hal lain yang diperlukan setelah penghapusan
      fetchKategoris(); // Ambil ulang kategoris setelah penghapusan
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put("http://localhost:5000/updateKategori", {
        nameKategori: kategoriNameToUpdate,
        newNameKategori: newName,
      });
      setShowUpdateModal(false);
      // Lakukan hal lain yang diperlukan setelah pembaruan
      fetchKategoris(); // Ambil ulang kategoris setelah pembaruan
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(kategoris.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentKategoris = kategoris.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(kategoris.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

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

        {/* Content AddCategory */}
        <div id="layoutSidenav_content">
          <div className="container-fluid px-4">
            <h2 className="mb-3">
              <strong>Kategori</strong>
            </h2>
            <figcaption className="blockquote-footer mb-5">
              Kategori for <cite title="Source Title">Product</cite>
            </figcaption>
            <Button onClick={() => setShowModal(true)} className="mb-2">
              Tambah Kategori
            </Button>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Tambah Kategori</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <input
                  type="text"
                  value={newKategori}
                  onChange={(e) => setNewKategori(e.target.value)}
                  placeholder="Enter new kategori name"
                  className="form-control"
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleCreateKategori}>
                  Create Kategori
                </Button>
              </Modal.Footer>
            </Modal>
            <div className="bg-info p-4 shadow rounded-lg">
              <div className="table-responsive">
                <table className="table table-sm table-primary">
                  <thead className="text-uppercase bg-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Kategori</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentKategoris.map((kategori, index) => (
                      <tr key={index}>
                        <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                        <td>{kategori.nameKategori}</td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => {
                              setShowDeleteModal(true);
                              setKategoriNameToDelete(kategori.nameKategori);
                            }}
                          >
                            Delete
                          </Button>

                          <Modal
                            show={showDeleteModal}
                            onHide={() => setShowDeleteModal(false)}
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>Confirm Delete</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              Are you sure you want to delete the category "
                              {kategoriNameToDelete}"?
                            </Modal.Body>
                            <Modal.Footer>
                              <Button
                                variant="secondary"
                                onClick={() => setShowDeleteModal(false)}
                              >
                                Cancel
                              </Button>
                              <Button variant="danger" onClick={handleDelete}>
                                Delete
                              </Button>
                            </Modal.Footer>
                          </Modal>

                          <Button
                            className="mx-4"
                            variant="primary"
                            onClick={() => {
                              setShowUpdateModal(true);
                              setKategoriNameToUpdate(kategori.nameKategori);
                            }}
                          >
                            Update
                          </Button>

                          <Modal
                            show={showUpdateModal}
                            onHide={() => setShowUpdateModal(false)}
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>Update Category</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <Form.Group controlId="formKategoriNameToUpdate">
                                <Form.Label>Category Name</Form.Label>
                                <Form.Control
                                  type="text"
                                  value={kategoriNameToUpdate}
                                  onChange={(e) =>
                                    setKategoriNameToUpdate(e.target.value)
                                  }
                                />
                              </Form.Group>
                              <Form.Group controlId="formNewName">
                                <Form.Label>New Name</Form.Label>
                                <Form.Control
                                  type="text"
                                  value={newName}
                                  onChange={(e) => setNewName(e.target.value)}
                                />
                              </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button
                                variant="secondary"
                                onClick={() => setShowUpdateModal(false)}
                              >
                                Cancel
                              </Button>
                              <Button variant="primary" onClick={handleUpdate}>
                                Update
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination className="justify-content-center mt-4">
                <Pagination.Prev
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                />
                {pageNumbers.map((number) => (
                  <Pagination.Item
                    key={number}
                    active={number === currentPage}
                    onClick={() => handlePageChange(number)}
                  >
                    {number}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={handleNextPage}
                  disabled={currentPage === pageNumbers.length}
                />
              </Pagination>
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

export default AddCategory;
