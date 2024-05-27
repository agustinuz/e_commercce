import React, { useState, useEffect } from "react";
import { Button, Modal, Pagination } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode as jwt_decode } from "jwt-decode";
import axios from "axios";

const AppointmentPage = () => {
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

  const [appointment, setAppointment] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    Owner: "",
    patientName: "",
    tanggalLahir: "",
    jenisKelamin: "",
    Spesies: "",
    Ras: "",
    typePengobatan: "",
    Schedule: "",
  });
  const [schedule, setSchedule] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [appointmentIdToDelete, setAppointmentIdToDelete] = useState("");
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const scheduleResponse = await axios.get(
          "http://localhost:5000/getSchedule"
        );
        console.log(scheduleResponse);
        setSchedule(scheduleResponse.data);
      } catch (error) {
        console.error("Error fetching categories and brands:", error);
      }
    };
    fetchSchedule();
    fetchAppointment();
  }, []);

  const fetchAppointment = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getAppointment");
      setAppointment(response.data);
    } catch (error) {
      console.error("Error fetching Appointment:", error);
    }
  };

  const handleCreateAppointment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/createAppointment",
        {
          Owner: newAppointment.Owner,
          patientName: newAppointment.patientName,
          tanggalLahir: newAppointment.tanggalLahir,
          jenisKelamin: newAppointment.jenisKelamin,
          Spesies: newAppointment.Spesies,
          Ras: newAppointment.Ras,
          typePengobatan: newAppointment.typePengobatan,
          Schedule: newAppointment.Schedule,
        }
      );
      console.log("Response from creating Appointment:", response.data);
      fetchAppointment(); // dimaskukan di dalam create berfungsi mengirim data yang telah di buat
      setNewAppointment({
        Owner: "",
        patientName: "",
        tanggalLahir: "",
        jenisKelamin: "",
        Spesies: "",
        Ras: "",
        typePengobatan: "",
        Schedule: "",
      });
      setShowModal(false);
    } catch (error) {
      console.error("Error creating Appointment:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:5000/deleteAppointment",
        {
          data: { id: appointmentIdToDelete },
        }
      );
      console.log("Response from deleting Appointment:", response.data);
      setShowDeleteModal(false);
      // Lakukan hal lain yang diperlukan setelah penghapusan
      fetchAppointment(); // Ambil ulang Appointment setelah penghapusan
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
    if (currentPage < Math.ceil(appointment.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAppointment = appointment.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(appointment.length / itemsPerPage); i++) {
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

        {/* // Content Appointment */}

        <div id="layoutSidenav_content">
          <div className="container-fluid px-4">
            <h2 className="mb-3">
              <strong>Appointment</strong>
            </h2>
            <figcaption className="blockquote-footer mb-5">
              all for <cite title="Source Title">Appointment</cite>
            </figcaption>
            <Button onClick={() => setShowModal(true)} className="mb-2">
              Create Apointment
            </Button>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Tambah Appointment</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <input
                  type="text"
                  value={newAppointment.Owner}
                  onChange={(e) => setNewAppointment(e.target.value)}
                  placeholder="Enter name Owner"
                  className="form-control"
                />
                <input
                  type="text"
                  value={newAppointment.patientName}
                  onChange={(e) => setNewAppointment(e.target.value)}
                  placeholder="Enter New Patient"
                  className="form-control"
                />
                <input
                  type="date"
                  value={newAppointment.tanggalLahir}
                  onChange={(e) => setNewAppointment(e.target.value)}
                  placeholder="Enter Bridday Patient"
                  className="form-control"
                />
                <input
                  type="text"
                  value={newAppointment.jenisKelamin}
                  onChange={(e) => setNewAppointment(e.target.value)}
                  placeholder="Enter Jenis Kelamin Patient"
                  className="form-control"
                />
                <input
                  type="text"
                  value={newAppointment.Spesies}
                  onChange={(e) => setNewAppointment(e.target.value)}
                  placeholder="Enter Spesies Name"
                  className="form-control"
                />
                <input
                  type="text"
                  value={newAppointment.Ras}
                  onChange={(e) => setNewAppointment(e.target.value)}
                  placeholder="Enter Ras Name"
                  className="form-control"
                />
                <input
                  type="text"
                  value={newAppointment.typePengobatan}
                  onChange={(e) => setNewAppointment(e.target.value)}
                  placeholder="Enter Treatment Type"
                  className="form-control"
                />
                <select
                  className="form-select mb-3"
                  name="Schedule"
                  value={newAppointment.Schedule}
                  onChange={(e) => setNewAppointment(e.target.value)}
                >
                  {schedule.map((scheduled) => (
                    <option key={scheduled.id} value={scheduled.id}>
                      {`${scheduled.date} and ${scheduled.time}`}
                    </option>
                  ))}
                </select>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleCreateAppointment}>
                  Create Appointment
                </Button>
              </Modal.Footer>
            </Modal>
            <div className="bg-info p-4 shadow rounded-lg">
              <div className="table-responsive">
                <table className="table table-sm table-primary">
                  <thead className="text-uppercase bg-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Owner</th>
                      <th scope="col">Patient Name</th>
                      <th scope="col">Tanggal Lahir</th>
                      <th scope="col">Jenis Kelamin</th>
                      <th scope="col">Spesies</th>
                      <th scope="col">Ras</th>
                      <th scope="col">Treatment Type</th>
                      <th scope="col">Schedule</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentAppointment.map((appointment, index) => (
                      <tr key={index}>
                        <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                        <td>{appointment.Owner}</td>
                        <td>{appointment.patientName}</td>
                        <td>{appointment.tanggalLahir}</td>
                        <td>{appointment.jenisKelamin}</td>
                        <td>{appointment.Spesies}</td>
                        <td>{appointment.Ras}</td>
                        <td>{appointment.typePengobatan}</td>
                        <td>{appointment.Schedule}</td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => {
                              setShowDeleteModal(true);
                              setAppointmentIdToDelete(appointment.id);
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
                              Are you sure you want to delete the Appointment
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

export default AppointmentPage;
