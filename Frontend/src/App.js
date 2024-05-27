// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import Dashboard_Admin from "../src/component/DashboardPage/Dashboard_Admin";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Login from "./component/Login/Login";
import Forgot from "./component/Login/Forgot";
import AddProduct from "./component/DashboardPage/AddProduct";
import AddCategory from "./component/DashboardPage/AddCategory";
import DashboardUser from "./component/User_page/DashboardUser";
import AppointmentPage from "./component/User_page/AppointmentPage";
import Order from "./component/User_page/Order";
import AboutUs from "./component/AboutUs";
import ProductList from "./component/ProductList";
import Register from "./component/Login/Register";
import ListUser from "./component/DashboardPage/ListUser";
import AddMerk from "./component/DashboardPage/AddMerk";
import ListAppointment from "./component/DashboardPage/listAppointment";
import Appointment from "./component/Appointment";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Navbar />} />
          <Route path="/ProductList" element={<ProductList />} />
          <Route
            path="/AppointmentPage"
            element={<AppointmentPage isUpdate={false} />}
          />
          <Route
            path="/AppointmentPage/update/:id"
            element={<AppointmentPage isUpdate={true} />}
          />
          <Route path="/Dashboard_Admin" element={<Dashboard_Admin />} />
          <Route path="/DashboardUser" element={<DashboardUser />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Forgot" element={<Forgot />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/AddProduct" element={<AddProduct />} />
          <Route path="/AddCategory" element={<AddCategory />} />
          <Route path="/AddMerk" element={<AddMerk />} />
          <Route path="/Order" element={<Order />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/ListUser" element={<ListUser />} />
          <Route path="/ListAppointment" element={<ListAppointment />} />
          <Route path="/Appointment" element={<Appointment />} />
        </Routes>
      </div>
      <noscript>You need to enable JavaScript to run this app.</noscript>
    </Router>
  );
}
export default App;
