import React, { Component } from "react";
// import imagefb from '../../images/fb.png';
// import imageinsta from '../../images/insta.png';
// import imagetwt from '../../images/twiter.png';
// import imagein from '../../images/in.png';
// import imagepint from '../../images/pint.png';
import "./index.css";

class index extends Component {
  render() {
    return (
      <div>
        <nav id="mynav" className="mynav">
          <span className="brand">
            <strong>
              {" "}
              S<span style={{ color: "rgb(39, 255, 239)" }}>H</span>S
            </strong>
            <span className="bars">
              <i className="fa fa-bars"></i>
            </span>
          </span>
          <span className="menu">
            <ul>
              <li>
                <a href="">Home</a>
              </li>
              <li className="">
                <a href="#">How it Works</a>
              </li>
              <li>
                <a href="#">Blogs</a>
              </li>

              <li>
                <a href="#">About Us</a>
              </li>
              <li className="ul-login">
                <button>Login</button>
              </li>
            </ul>
          </span>
          <a href="#">
            <span className="login-corner-btn">Sign In</span>
          </a>
        </nav>
        <section style={{ marginBottom: "25%" }}>
          <div className="container-fluid pt-0  col-md-11 col-12 col-sm-12 d-flex justify-content-center main">
            <div className="col-md-2 col-2 col-sm-3 shs-left"></div>
            <div className="col-md-2 col-sm-2 col-3 text-center col-lg-2 col-xl-1">
              <h1>SHS</h1>
            </div>

            <div className="col-md-2 col-2 col-sm-3 shs-right"></div>
          </div>
          <div className=" container row col-md-11 d-flex justify-content-center mt-3">
            <a href="" className="col-md-3 col-5 col-sm-5 box-left text-center">
              <h2>Service Provider</h2>
            </a>
            <a
              href=""
              className="col-md-3 col-5 col-sm-5 text-center box-right "
            >
              <h2>Customer</h2>
            </a>
          </div>
        </section>
        <footer>
          <div className=" footer-bg ">
            <div className=" col-md-12 row  pb-5">
              <div className="col-md-2">
                <h4>SITE MAP</h4>
                <p>
                  <ul className="">
                    <li>
                      <a href="#"> Home</a>
                    </li>
                    <li>
                      <a href="#"> About Us</a>
                    </li>
                    <li>
                      <a href="#"> How we work</a>
                    </li>
                    <li>
                      <a href="#"> Details</a>
                    </li>
                    <li>
                      <a href="#"> History</a>
                    </li>
                  </ul>
                </p>
              </div>

              <div className="col-md-2">
                <h4>SERVICES</h4>
                <p>
                  <ul className="">
                    <li>
                      <a href="#"> Home</a>
                    </li>
                    <li>
                      <a href="#"> About Us</a>
                    </li>
                    <li>
                      <a href="#"> How we work</a>
                    </li>
                    <li>
                      <a href="#"> Details</a>
                    </li>
                    <li>
                      <a href="#"> History</a>
                    </li>
                  </ul>
                </p>
              </div>

              <div className="col-md-2">
                <h4>CONTACT US</h4>
                <p>
                  <ul className="">
                    <li>
                      <a href="#"> Home</a>
                    </li>
                    <li>
                      <a href="#"> About Us</a>
                    </li>
                    <li>
                      <a href="#"> How we work</a>
                    </li>
                    <li>
                      <a href="#"> Details</a>
                    </li>
                    <li>
                      <a href="#"> History</a>
                    </li>
                  </ul>
                </p>
              </div>

              <div className="col-md-6">
                <ul className="row icons">
                  <li>
                    <span>
                      <a href="">
                        <img src="images-info/fb.png" className="fb" />
                      </a>
                    </span>
                  </li>
                  <li>
                    <span>
                      <a href="">
                        <img src="images-info/insta.png" className="insta" />
                      </a>
                    </span>
                  </li>
                  <li>
                    <span>
                      <a href="">
                        <img src="images-info/twiter.png" className="twiter" />
                      </a>
                    </span>
                  </li>
                  <li>
                    {" "}
                    <span>
                      <a href="">
                        <img src="images-info/in.png" className="linkedin" />
                      </a>
                    </span>
                  </li>
                  <li>
                    <span>
                      <a href="">
                        <img src="images-info/pint.png" className="pintrest" />
                      </a>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
        <div className="footer-copyright text-right py-2">
          <span>© 2019</span>{" "}
        </div>
      </div>
    );
  }
}

export default index;
