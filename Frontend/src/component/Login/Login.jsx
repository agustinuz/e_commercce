import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode as jwt_decode } from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: email,
        password: password,
      });

      const accessToken = response.data.accessToken; // Tangkap token dari respons
      localStorage.setItem("accessToken", accessToken); // Simpan token di localStorage
      const decodedToken = jwt_decode(accessToken); // Ambil peran (role) pengguna dari token
      const userRole = decodedToken.userRole;

      if (userRole === "admin") {
        navigate("/Dashboard_Admin");
      } else if (userRole === "customer") {
        navigate("/DashboardUser");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during login. Please try again later.");
    }
  };

  return (
    <body className="bg-transparent">
      <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
          <main>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-5">
                  <div className="card shadow-lg border-0 rounded-lg mt-5 bg-white">
                    <div className="card-header">
                      <h3 className="text-center font-weight-light my-4">
                        Login
                      </h3>
                    </div>
                    <div className="card-body">
                      <p className="font-italic"></p>
                      <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                          <input
                            className="form-control"
                            name="email"
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <label htmlFor="email">Email address</label>
                        </div>
                        <div className="form-floating mb-3">
                          <input
                            className="form-control"
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <label htmlFor="password">Password</label>
                        </div>
                        <div className="form-check mb-3">
                          <input
                            className="form-check-input"
                            id="inputRememberPassword"
                            type="checkbox"
                            value=""
                          />
                          <label
                            className="form-check-label"
                            for="inputRememberPassword"
                          >
                            Remember Password
                          </label>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                          <Link className="small" to="/Forgot">
                            Forgot Password?
                          </Link>
                          <button type="submit" className="btn btn-primary">
                            Login
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="card-footer text-center py-3">
                      <div className="small">
                        <Link to="/Register">Need an account? Sign up!</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
        <div id="layoutAuthentication_footer">
          <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
              <div className="d-flex align-items-center justify-content-between small">
                <div className="text-muted">
                  Copyright &copy; Your Website 2023
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

export default Login;
