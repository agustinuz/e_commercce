import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Pagination, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import { Link, useNavigate } from "react-router-dom";
import "../css/Table.css";
import { jwtDecode as jwt_decode } from "jwt-decode";

const ListAppointment = () => {
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

  const [schedule, setSchedule] = useState([]);
  const [newSchedule, setNewSchedule] = useState({ date: null, time: "" });
  const [scheduleIdToDelete, setScheduleIdToDelete] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [formData, setFormData] = useState({ id: null, date: null, time: "" });
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getSchedule");
      setSchedule(response.data);
      setFormData({
        id: schedule.id,
        date: new Date(schedule.date),
        time: schedule.time,
      });
    } catch (error) {
      console.error("Error fetching Schedule:", error);
    }
  };

  const handleCreateSchedule = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/createSchedule",
        newSchedule
      );
      console.log("Response from creating Schedule:", response.data);
      fetchSchedule();
      setNewSchedule({ date: null, time: "" });
      setShowModal(false);
    } catch (error) {
      console.error("Error creating Schedule:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:5000/deleteSchedule",
        {
          data: { id: scheduleIdToDelete },
        }
      );
      console.log("Response from deleting Schedule:", response.data);
      setShowDeleteModal(false);
      fetchSchedule();
    } catch (error) {
      console.error("Error deleting Schedule:", error);
    }
  };

  const handleDateChange = (date) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      date: date,
    }));
  };

  const handleTimeChange = (time) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      time: time,
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5000/updateSchedule",
        formData
      );

      if (response.status === 200) {
        console.log(response.data.msg);
        setShowUpdateModal(false);
      } else {
        console.error(response.data.msg);
      }
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
    if (currentPage < Math.ceil(schedule.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSchedule = schedule.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(schedule.length / itemsPerPage); i++) {
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

        {/* Content Appointment */}
        <div id="layoutSidenav_content">
          <div className="container-fluid px-4">
            <h2 className="mb-3">
              <strong>Schedule And Appointment</strong>
            </h2>
            <figcaption className="blockquote-footer mb-5">
              list Schedule and{" "}
              <cite title="Source Title">Request Appointment</cite>
            </figcaption>
            <Button onClick={() => setShowModal(true)} className="mb-2">
              Tambah Schedule
            </Button>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Tambah Schedule</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="mb-2">
                  <label htmlFor="datePicker">Set Date</label>
                  <DatePicker
                    selected={newSchedule.date}
                    onChange={(date) =>
                      setNewSchedule({ ...newSchedule, date })
                    }
                    dateFormat="yyyy-MM-dd"
                    className="form-control"
                    placeholderText="Select Date"
                  />
                </div>
                <div>
                  <label htmlFor="timePicker">Set Time</label>
                  <TimePicker
                    onChange={(time) =>
                      setNewSchedule({ ...newSchedule, time })
                    }
                    value={newSchedule.time}
                    className="form-control"
                    disableClock={true}
                    clearIcon={null}
                  />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleCreateSchedule}>
                  Create Schedule
                </Button>
              </Modal.Footer>
            </Modal>
            <div className="bg-info p-4 shadow rounded-lg">
              <div className="table-responsive">
                <table className="table table-sm table-primary">
                  <thead className="text-uppercase bg-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Date</th>
                      <th scope="col">Time</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentSchedule.map((scheduled, index) => (
                      <tr key={index}>
                        <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                        <td>{scheduled.date}</td>
                        <td>{scheduled.time}</td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => {
                              setShowDeleteModal(true);
                              setScheduleIdToDelete(scheduled.id);
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
                              Are you sure you want to delete the schedule
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
                              setFormData(scheduled.id);
                            }}
                          >
                            Update
                          </Button>
                          <Modal
                            show={showUpdateModal}
                            onHide={() => setShowUpdateModal(false)}
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>Update Schedule</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <Form>
                                <Form.Group controlId="formDate">
                                  <Form.Label>Date</Form.Label>
                                  <DatePicker
                                    dateFormat="yyyy-MM-dd"
                                    className="form-control"
                                    selected={formData.date}
                                    onChange={handleDateChange}
                                    placeholderText="Select Date"
                                    required
                                  />
                                </Form.Group>
                                <Form.Group controlId="formTime">
                                  <Form.Label>Time</Form.Label>
                                  <TimePicker
                                    className="form-control"
                                    value={formData.time}
                                    onChange={handleTimeChange}
                                    disableClock={true}
                                    clearIcon={null}
                                    required
                                  />
                                </Form.Group>

                                <Button
                                  variant="primary"
                                  onClick={handleUpdate}
                                >
                                  Update Schedule
                                </Button>
                                <Button
                                  variant="secondary"
                                  onClick={() => setShowUpdateModal(false)}
                                >
                                  Close
                                </Button>
                              </Form>
                            </Modal.Body>
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

export default ListAppointment;
