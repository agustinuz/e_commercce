import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal, Form, Pagination } from "react-bootstrap";
import axios from "axios";
import "../css/Table.css";
import { jwtDecode as jwt_decode } from "jwt-decode";

const AddProduct = () => {
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

  const [kategori, setKategori] = useState([]);
  const [merk, setMerk] = useState([]);
  const [product, setProduct] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    kategori_id: "",
    merk_id: "",
  });
  const [updatedProduct, setUpdatedProduct] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
    image: "",
    kategori_id: "",
    merk_id: "",
  });
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [productIdToDelete, setProductIdToDelete] = useState("");

  useEffect(() => {
    // Fetch kategori and merk when modal opens
    const fetchKategoriandMerk = async () => {
      try {
        const kategoriResponse = await axios.get(
          "http://localhost:5000/getKategori"
        );
        console.log(kategoriResponse);
        setKategori(kategoriResponse.data);
        //
        const merkResponse = await axios.get("http://localhost:5000/getMerk");
        setMerk(merkResponse.data);
      } catch (error) {
        console.error("Error fetching categories and brands:", error);
      }
    };
    fetchKategoriandMerk();
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getProduct");
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleCreateProduct = async () => {
    try {
      const response = await axios.post("http://localhost:5000/createProduct", {
        name: newProduct.name,
        price: newProduct.price,
        description: newProduct.description,
        image: newProduct.image,
        kategori_id: newProduct.kategori_id,
        merk_id: newProduct.merk_id,
      });
      console.log("Response from creating Product:", response.data);
      fetchProduct(); // dimaskukan di dalam create berfungsi mengirim data yang telah di buat
      setNewProduct({
        name: "",
        price: "",
        description: "",
        image: "",
        kategori_id: "",
        merk_id: "",
      });
      setShowModal(false);
    } catch (error) {
      console.error("Error creating Product:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:5000/deleteProduct",
        {
          data: { id: productIdToDelete },
        }
      );
      console.log("Response from deleting Product:", response.data);
      setShowDeleteModal(false);
      // Lakukan hal lain yang diperlukan setelah penghapusan
      fetchProduct(); // Ambil ulang product setelah penghapusan
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      const response = await axios.put("http://localhost:5000/updateProduct", {
        id: updatedProduct.id,
        name: updatedProduct.name,
        price: updatedProduct.price,
        description: updatedProduct.description,
        image: updatedProduct.image,
        kategori_id: updatedProduct.kategori_id,
        merk_id: updatedProduct.merk_id,
      });
      console.log("Response from updating Product:", response.data);
      fetchProduct(); // Mengambil ulang produk setelah pembaruan
      setShowUpdateModal(false);
    } catch (error) {
      console.error("Error updating Product:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };
  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
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
    if (currentPage < Math.ceil(product.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProduct = product.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(product.length / itemsPerPage); i++) {
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
        {/* Product Content      */}
        <div id="layoutSidenav_content">
          <div className="container px-4">
            <h2 className="mb-3">
              <strong>Product</strong>
            </h2>
            <figcaption className="blockquote-footer mb-5">
              all item <cite title="Source Title">Product</cite>
            </figcaption>
            <Button className="mb-2" onClick={() => setShowModal(true)}>
              Create Product
            </Button>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Tambah Product</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  placeholder="Enter Name Product"
                  className="form-control mb-3"
                />
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  placeholder="Enter Price"
                  className="form-control mb-3"
                />
                <input
                  type="text"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  placeholder="Enter Description"
                  className="form-control mb-3"
                />
                <input
                  type="text"
                  value={newProduct.image}
                  onChange={handleInputChange}
                  placeholder="Enter Image"
                  className="form-control mb-3"
                />
                <select
                  className="form-select mb-3"
                  name="kategori_id"
                  value={newProduct.kategori_id}
                  onChange={(e) => setNewProduct(e.target.value)}
                >
                  {kategori.map((kat) => (
                    <option key={kat.id} value={kat.id}>
                      {kat.nameKategori}
                    </option>
                  ))}
                </select>
                <select
                  className="form-select mb-3"
                  name="merk_id"
                  value={newProduct.merk_id}
                  onChange={handleInputChange}
                >
                  {merk.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.nameMerk}
                    </option>
                  ))}
                </select>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleCreateProduct}>
                  Create Product
                </Button>
              </Modal.Footer>
            </Modal>
            <div className="bg-info p-4 shadow rounded-lg">
              <div className="table-responsive">
                <table className="table table-sm table-primary">
                  <thead className="text-uppercase bg-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">Description</th>
                      <th scope="col">Image</th>
                      <th scope="col">Kategori_id</th>
                      <th scope="col">Merk_id</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentProduct.map((product, index) => (
                      <tr key={index}>
                        <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.description}</td>
                        <td>{product.image}</td>
                        <td>{product.kategori_id}</td>
                        <td>{product.merk_id}</td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => {
                              setShowDeleteModal(true);
                              setProductIdToDelete(product.name);
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
                              Are you sure you want to delete the Product " "?
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
                            variant="warning"
                            onClick={() => setShowUpdateModal(true)}
                          >
                            Update
                          </Button>
                          <Modal
                            show={showUpdateModal}
                            onHide={() => setShowUpdateModal(false)}
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>Update Product</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <input
                                type="text"
                                name="name"
                                value={updatedProduct.name}
                                onChange={handleUpdateChange}
                                placeholder="Enter Name Product"
                                className="form-control"
                              />
                              <input
                                type="number"
                                name="price"
                                value={updatedProduct.price}
                                onChange={handleUpdateChange}
                                placeholder="Enter Price"
                                className="form-control"
                              />
                              <input
                                type="text"
                                name="description"
                                value={updatedProduct.description}
                                onChange={handleUpdateChange}
                                placeholder="Enter Description"
                                className="form-control"
                              />
                              <input
                                type="text"
                                name="image"
                                value={updatedProduct.image}
                                onChange={handleUpdateChange}
                                placeholder="Enter Image"
                                className="form-control"
                              />
                              <select
                                name="kategori_id"
                                value={updatedProduct.kategori_id}
                                onChange={handleUpdateChange}
                                className="form-control"
                              >
                                {kategori.map((kat) => (
                                  <option key={kat.id} value={kat.id}>
                                    {kat.name}
                                  </option>
                                ))}
                              </select>
                              <select
                                name="merk_id"
                                value={updatedProduct.merk_id}
                                onChange={handleUpdateChange}
                                className="form-control"
                              >
                                {merk.map((m) => (
                                  <option key={m.id} value={m.id}>
                                    {m.name}
                                  </option>
                                ))}
                              </select>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button
                                variant="secondary"
                                onClick={() => setShowUpdateModal(false)}
                              >
                                Close
                              </Button>
                              <Button
                                variant="primary"
                                onClick={handleUpdateProduct}
                              >
                                Update Product
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
export default AddProduct;
