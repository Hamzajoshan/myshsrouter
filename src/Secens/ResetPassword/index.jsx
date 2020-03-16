import React, { Component } from "react";

import SweetAlert from "@sweetalert/with-react";

import "./index.css";
// import Header from "../../Component/Header";
// import Footer from "../../Component/Footer";

import { withNamespaces } from "react-i18next";
import { baseUrl } from "./../../config.js";
// import cookie from "react-cookies";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: "",
      emailLabel: false
    };
    this.ForgotUserPassword = this.ForgotUserPassword.bind(this);
  }
  ForgotUserPassword = e => {
    e.preventDefault();
    this.setState({
      submitDisabled: true,
      loading: true
    });
    const { email } = this.state;
    if (email === "") {
      this.setState({
        submitDisabled: false,
        loading: false,
        emailLabel: true
      });
    } else {
      //Here I Will Make API Call
      //https://shsbackend1.azurewebsites.net/api/services/app/User/ResetPasswordByToken
      fetch(
        `${baseUrl}api/services/app/User/GetUserByEmailAndSendResetPasswordLink?Email=${email}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      )
        .then(function(response) {
          return response.json(); //response.json() is resolving its promise. It waits for the body to load
        })
        .then(
          responseData => {
            //  alert(responseData);

            SweetAlert(
              <div style={{ color: "green" }}>
                <h1>
                  {" "}
                  <strong>Success!</strong>
                </h1>
                <p style={{ fontSize: "20px" }}>Check Your EmailBox.</p>
              </div>
            );
            if (!responseData.success) {
              // console.log(responseData.error.message)
              this.setState({
                errormessage: responseData.error.message,
                loading: false,
                submitDisabled: false,
                success: false
              });
              SweetAlert(
                <div className="alert alert-danger fade show">
                  <h1>
                    {" "}
                    <strong>Error!</strong>
                  </h1>
                  <p style={{ fontSize: "30px" }}>{this.state.errormessage}</p>
                </div>
              );
            } else {
              this.setState({
                loading: false,
                submitDisabled: false
              });
            }
          },
          error => {
            // console.log(error)
            // this.setState({
            //   errormessage:error,
            // });
          }
        )
        .catch(error => {
          console.log(error);
        });
    }
  };

  onEmailChange = e => {
    let email = e.target.value.split(" ").join("");

    this.setState({
      email: email,
      emailLabel: false
    });
  };

  render() {
    return (
      <div>
        <div className="bg-sign-up" style={{ paddingBottom: "15%" }}>
          <section className="sign-body" id="form">
            <div className="col-md-12 d-flex align-items-center justify-content-center">
              <div className="col-md-8 col-xm-4 col-sm-8 col-lg-5  pt-5 pb-5 d-flex align-items-center justify-content-center">
                {/* <div
                  className=" col-md-8 col-xm-3 col-sm-8 col-lg-8 col-8 custom-sign"
                  style={{ height: "90px" }}
                >
                  <h2 className="text-uppercase">
                    <strong>Forgot Password</strong>
                  </h2>
                </div> */}
                <div className="col-md-12 ">
                  <div className="row center form">
                    <div className="col-md-12">
                      <form
                        className="inner-form"
                        onSubmit={this.ForgotUserPassword}
                        style={{ marginTop: "30px" }}
                      >
                        <div className="form-row">
                          <div className="form-group col-md-12">
                            <p style={{ fontSize: "20px" }}>
                              {this.props.t("email_info")}
                            </p>
                            {this.state.emailLabel ? (
                              <label className="text-danger">
                                {this.props.t("only_email_req")}
                              </label>
                            ) : null}
                          </div>
                          <div className="form-group col-md-12">
                            <input
                              autocomplete="off"
                              ref="email"
                              id="inputDado"
                              type="email"
                              className="form-control mainLoginInput"
                              placeholder="  Email*"
                              value={this.state.email}
                              onInput={this.onEmailChange}
                            />
                          </div>

                          <button
                            className="col-md-6 col-7 mb-5 mt-3 container button-outer"
                            style={{ outline: "inherit" }}
                            type="submit"
                            value="save"
                            name="save"
                            disabled={this.state.submitDisabled}
                          >
                            <div className="col-md-6 container">
                              {this.state.loading ? (
                                <div style={{ color: "lightgrey" }}>
                                  {this.props.t("wait")}...
                                </div>
                              ) : (
                                <span>
                                  {" "}
                                  <strong>{this.props.t("submit")}</strong>
                                </span>
                              )}
                            </div>
                          </button>

                          <br />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
}

export default withNamespaces()(index);
// export default index;
