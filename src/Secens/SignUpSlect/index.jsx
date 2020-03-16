import React, { Component } from "react";
import "./index.css";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
// the hoc
import { withNamespaces } from "react-i18next";

class index extends Component {
  render() {
    if (cookie.load("Token")) {
      // return <LoginPanel onSuccess={this.onLogin} />
      // return <Dashboard />
      this.props.history.push("/dashboard");
    }
    return (
      <div>
        <div className="bg1">
          <Header />

          <section style={{ marginBottom: "10%" }}>
            <div className="container-fluid pt-5  col-md-11 col-12 col-sm-12 d-flex justify-content-center main-select">
              <div className="col-md-2 col-2 col-sm-3 shs-left"></div>
              <div className="col-md-2 col-sm-2 col-4 text-center col-lg-2 col-xl-1">
                <h1>{this.props.t("shs")}</h1>
              </div>
              <div className="col-md-2 col-2 col-sm-3 shs-right"></div>
            </div>

            <div className=" container row col-md-11 col-12 d-flex justify-content-center ">
              <Link
                to="/spsingup"
                style={{ textDecoration: "none" }}
                className="col-md-3 col-12 col-sm-5 box-left text-center"
              >
                {/* <a > */}
                <h2>{this.props.t("sp")}</h2>

                {/* </a> */}
              </Link>
              <Link
                to="/CustSignup"
                style={{ textDecoration: "none" }}
                className="col-md-3 col-12 col-sm-5 text-center box-right "
              >
                {/* <a > */}
                <h2>{this.props.t("customer")}</h2>
                {/* </a> */}
              </Link>
            </div>
          </section>
          <Footer />
        </div>
      </div>
    );
  }
}

export default withNamespaces()(index);
