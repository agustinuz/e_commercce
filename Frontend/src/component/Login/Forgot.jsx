import React from "react";
import { Link } from "react-router-dom";

function Forgot() {
  return (
    <body class="bg-transparent">
      <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
          <main>
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-lg-5">
                  <div class="card shadow-lg border-0 rounded-lg mt-5 bg-white">
                    <div class="card-header">
                      <h3 class="text-center font-weight-light my-4">
                        Password Recovery
                      </h3>
                    </div>
                    <div class="card-body">
                      <div class="small mb-3 text-muted">
                        Enter your email address and we will send you a link to
                        reset your password.
                      </div>
                      <form>
                        <div class="form-floating mb-3">
                          <input
                            class="form-control"
                            id="inputEmail"
                            type="email"
                            placeholder="name@example.com"
                          />
                          <label for="inputEmail">Email address</label>
                        </div>
                        <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                          <Link class="small" to="/Login">
                            Return to login
                          </Link>
                          <Link class="btn btn-primary" to="/Login">
                            Reset Password
                          </Link>
                        </div>
                      </form>
                    </div>
                    <div class="card-footer text-center py-3">
                      <div class="small">
                        <Link to="/Signup">Need an account? Sign up!</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
        <div id="layoutAuthentication_footer">
          <footer class="py-4 bg-light mt-auto">
            <div class="container-fluid px-4">
              <div class="d-flex align-items-center justify-content-between small">
                <div class="text-muted">Copyright &copy; Your Website 2023</div>
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
}

export default Forgot;
