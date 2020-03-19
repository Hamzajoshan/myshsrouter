import React, { Component } from "react";

import SweetAlert from "@sweetalert/with-react";
import queryString from "querystring";
import "./index.css";
// import Header from "../../Component/Header";
// import Footer from "../../Component/Footer";
import { withNamespaces } from "react-i18next";
import { Redirect } from "react-router-dom";

import { baseUrl } from "../../config.js";
// import cookie from "react-cookies";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      newPassword: "",
      repeatePassword: "",
      passwordLable: false,
      repeatPassword: "",
      repeatPasswordLable: false,
      success: false,
      token: "",
      passwordLengthLable: false
    };
    this.ForgotUserPassword = this.ForgotUserPassword.bind(this);
  }
  componentWillMount() {
    let params = queryString.parse(this.props.location.search);
    const query = new URLSearchParams(this.props.location.search);
    const token = query.get("key");
    console.log("token", token);
    this.setState({
      token: token
    });
    let url = window.location.href;
    console.log("window.location.href", window.location.href);
    let a = url.slice(45, url.length);
    console.log("a", a);
    this.setState({
      token: a
    });
  }
  ForgotUserPassword = e => {
    e.preventDefault();
    this.setState({
      submitDisabled: true,
      loading: true
    });
    const { newPassword, repeatPassword, token } = this.state;
    if (newPassword === "") {
      this.setState({
        submitDisabled: false,
        loading: false,
        passwordLable: true
      });
    } else if (newPassword.length < 3) {
      this.setState({
        submitDisabled: false,
        loading: false,
        passwordLengthLable: true
      });
    } else if (newPassword !== repeatPassword) {
      this.setState({
        submitDisabled: false,
        loading: false,
        repeatPasswordLable: true
      });
    } else {
      console.log("token", token);
      console.log("new password", newPassword);
      //Here I Will Make API Call
      //https://shsbackend1.azurewebsites.net/api/services/app/User/ResetPasswordByToken
      //vgv%2fBdcMOBozjv%2foz4lOmXQLwX1YncqSGU%2bLdS%2fW3Dp%2fD5ylpD6Q%2bEPty5jesFwy5zkPrcqWLpHh4cq0G%2bO6ig%3d%3d
      fetch(
        `${baseUrl}api/services/app/User/ResetPasswordByToken`,

        {
          method: "post",

          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            token: token,

            newPassword: newPassword
          })
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
                <p style={{ fontSize: "20px" }}>
                  Password Changed Successfully.
                </p>
              </div>
            );
            this.setState({
              success: responseData.success
            });
            if (!responseData.success) {
              console.log(responseData);
              this.setState({
                errormessage: responseData.error.message,
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
  onRepeatePasswordChange = e => {
    let passwordRepeat = e.target.value.split(" ").join("");

    this.setState({
      repeatPassword: passwordRepeat,
      repeatPasswordLable: false
    });
  };

  onNewPasswordChange = e => {
    let passwordNew = e.target.value.split(" ").join("");

    this.setState({
      newPassword: passwordNew,
      passwordLable: false,
      passwordLengthLable: false
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
                              {this.props.t("new_password")}
                            </p>
                            {this.state.passwordLable ? (
                              <label className="text-danger">
                                {this.props.t("password_req")}
                              </label>
                            ) : null}
                          </div>
                          <div className="form-group col-md-12">
                            <input
                              autocomplete="off"
                              id="inputDado"
                              type="password"
                              className="form-control mainLoginInput"
                              placeholder="Password"
                              value={this.state.newPassword}
                              onInput={this.onNewPasswordChange}
                            />
                          </div>
                          {this.state.repeatPasswordLable ? (
                            <label className="text-danger">
                              {this.props.t("password_mismatch")}
                            </label>
                          ) : null}
                          <div className="form-group col-md-12">
                            <input
                              autocomplete="off"
                              id="inputDado"
                              type="password"
                              className="form-control mainLoginInput"
                              placeholder="Repeat Password"
                              value={this.state.repeatPassword}
                              onInput={this.onRepeatePasswordChange}
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
                          {this.state.success ? <Redirect to="/Login" /> : null}
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
