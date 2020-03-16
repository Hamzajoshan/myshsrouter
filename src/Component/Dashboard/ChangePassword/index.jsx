import React, { Component } from "react";

import cookie from "react-cookies";
// the hoc
import { withNamespaces } from "react-i18next";
// import SweetAlert from "@sweetalert/with-react";

import { tokenState } from "../../../actions/userAccessToken";
// import { Link } from "react-router-dom";
// import imglogo from "../../../images/logo.png";
import "./index.css";
import $ from "jquery";
import "../index.css";
import { baseUrl } from "./../../../config.js";

// import $ from "jquery";
import decode from "jwt-decode";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: "",
      currentPassword: "",
      newPassword: "",
      newPasswordRepeat: "",
      submitDisabled: false,
      token: "",
      bothPasswordsEqual: false,
      isCurrentPasswordError: false,
      isNewPasswordError: false,
      isNewPasswordRepeatError: false,
      isPasswordPatterenError: false
    };

    this.HandleCurrentPassword = this.HandleCurrentPassword.bind(this);
    this.HandleNewPassword = this.HandleNewPassword.bind(this);
    this.HandleNewPasswordRepet = this.HandleNewPasswordRepet.bind(this);
    this.SubmitChangPassword = this.SubmitChangPassword.bind(this);
  }
  componentDidMount(){
    if (cookie.load("Language")) {
      let langCookie=cookie.load("Language");
      if(langCookie=="ar"){
        $('.form').css('direction','rtl');
        $('.form').css('text-align','right');
        

      }else if(langCookie=="en"){
        $('.form').css('direction','ltr');
        $('.form').css('text-align','left');
        
      }
    }else {
      $('.form').css('direction','rtl');
      $('.form').css('text-align','right');

    }
  }
  HandleCurrentPassword = e => {
    this.setState({
      currentPassword: e.target.value,
      isCurrentPasswordError: false
    });
  };
  HandleNewPassword = e => {
    this.setState({
      newPassword: e.target.value,
      isNewPasswordError: false,
      isPasswordPatterenError: false
    });
  };
  HandleNewPasswordRepet = e => {
    if (this.state.newPassword !== e.target.value) {
      this.setState({
        bothPasswordsEqual: true
      });
    } else {
      this.setState({
        bothPasswordsEqual: false
      });
    }
    this.setState({
      newPasswordRepeat: e.target.value,
      isNewPasswordRepeatError: false
    });
  };
  SubmitChangPassword = e => {
    e.preventDefault();
    this.setState({
      submitDisabled: true
    });
    const { currentPassword, newPassword, newPasswordRepeat } = this.state;

    if (
      currentPassword === "" ||
      newPassword === "" ||
      newPasswordRepeat === "" ||
      newPasswordRepeat !== newPassword ||
      !this.countCapitalLettersLength(newPassword) > 0 ||
      !this.countSmallettersLength(newPassword) > 0 ||
      !this.countNumericLength(newPassword) > 0
    ) {
      if (currentPassword === "") {
        this.setState({
          isCurrentPasswordError: true,
          submitDisabled: false
        });
      }
      if (newPassword === "") {
        this.setState({
          isNewPasswordError: true,
          submitDisabled: false
        });
      } else {
        if (!this.countCapitalLettersLength(newPassword) > 0) {
          this.setState({
            isPasswordPatterenError: true,
            submitDisabled: false
          });
        }
        if (!this.countSmallettersLength(newPassword) > 0) {
          this.setState({
            isPasswordPatterenError: true,
            submitDisabled: false
          });
        }
        if (!this.countNumericLength(newPassword) > 0) {
          this.setState({
            isPasswordPatterenError: true,
            submitDisabled: false
          });
        }
        if (newPassword.length < 8) {
          this.setState({
            isPasswordPatterenError: true,
            submitDisabled: false
          });
        }
      }

      if (newPasswordRepeat === "") {
        this.setState({
          isNewPasswordRepeatError: true,
          submitDisabled: false
        });
      }

      if (newPassword !== newPasswordRepeat) {
        this.setState({
          bothPasswordsEqual: true,
          submitDisabled: false
        });
      }
    } else {
      //Make API Call

      fetch(
        `${baseUrl}api/services/app/User/ChangePassword`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + this.state.token
          },
          body: JSON.stringify({
            currentPassword: currentPassword,
            newPassword: newPassword
          })
        }
      )
        .then(function(response) {
          return response.json(); //response.json() is resolving its promise. It waits for the body to load
        })
        .then(
          responseData => {
            if (!responseData.success) {
              //here we write the logic if request is failed
            } else {
              //here we write the logic if the request is success
            }
          },
          error => {
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
  countCapitalLettersLength = str => {
    var count = 0,
      len = str.length;
    for (let i = 0; i < len; i++) {
      if (/[A-Z]/.test(str.charAt(i))) count++;
    }
    return count;
  };
  countSmallettersLength = str => {
    var count = 0,
      len = str.length;
    for (let i = 0; i < len; i++) {
      if (/[a-z]/.test(str.charAt(i))) count++;
    }
    return count;
  };
  countNumericLength = str => {
    var iCount = 0;
    for (let iIndex in str) {
      if (!isNaN(parseInt(str[iIndex]))) {
        iCount++;
      }
    }
    return iCount;
  };
  componentWillMount() {
    if (cookie.load("Token")) {
      this.setState({
        token: cookie.load("Token")
      });
      let token = decode(cookie.load("Token"));

      fetch(
        `${baseUrl}api/services/app/User/Get?Id=` +
          token.sub
      )
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            let user = json.result.name;

            this.setState({
              currentUser: user
            });
          }
        })
        .catch(error => {
          // console.error(error);
        });
    }
  }

  render() {
    return (
      <div className="MainDiv">
        <div className="bg-sign-up " style={{ paddingBottom: "15%" }}>
          <section className="sign-body" id="form">
            <div className="col-md-12 d-flex align-items-center justify-content-center">
              <div className="col-md-8 col-xm-4 col-sm-8 col-lg-5  pt-5 pb-5 d-flex align-items-center justify-content-center">
                <div className="col-md-12 ">
                  <div className="row center form">
                    <div className="col-md-12">
                      <form
                        className="inner-form"
                        onSubmit={this.SubmitChangPassword}
                        style={{ marginTop: "30px" }}
                      >
                        <div className="form-row">
                          <div className="form-group col-md-12">
                            <h3>{this.props.t("change_password")}</h3>
                          </div>
                          <div className="form-group col-md-12">
                            <input
                              id="inputDado"
                              className="form-control mainLoginInput"
                              type="password"
                              onChange={this.HandleCurrentPassword}
                              placeholder={this.props.t("current_password")}
                            />
                            {this.state.isCurrentPasswordError ? (
                              <span style={{ color: "red" }}>
                                {this.props.t("enter_old_pass")}
                              </span>
                            ) : null}
                          </div>
                          <div className="form-group col-md-12">
                            <input
                              id="inputDado"
                              className="form-control mainLoginInput"
                              type="password"
                              onChange={this.HandleNewPassword}
                              placeholder={this.props.t("new_password")}
                            />
                            {this.state.isNewPasswordError ? (
                              <span style={{ color: "red" }}>
                                {this.props.t("enter_new_pass")}
                              </span>
                            ) : null}
                            {this.state.isPasswordPatterenError ? (
                              <span style={{ color: "red" }}>
                                {this.props.t("passwor_error")}
                              </span>
                            ) : null}
                          </div>
                          <div className="form-group col-md-12">
                            <input
                              id="inputDado"
                              className="form-control mainLoginInput"
                              type="password"
                              onChange={this.HandleNewPasswordRepet}
                              placeholder={this.props.t("re-type_password")}
                            />
                            {this.state.isNewPasswordRepeatError ? (
                              <span style={{ color: "red" }}>
                                {this.props.t("enter_rep_pass")}
                              </span>
                            ) : null}
                            {this.state.bothPasswordsEqual ? (
                              <span style={{ color: "red" }}>
                                {this.props.t("password_mismatch")}
                              </span>
                            ) : null}
                          </div>

                          <button
                            className="col-md-6 col-7 mb-5 mt-3 container button-outer"
                            style={{ outline: "inherit" }}
                            type="submit"
                            disabled={this.state.submitDisabled}
                          >
                            <div className="col-md-6 container">
                              {this.state.loading ? (
                                <div style={{ color: "lightgrey" }}>
                                  {this.props.t("wait")}
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
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    Token: state.places.Token,
    userId: state.places.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    accessToken: value => {
      dispatch(tokenState(value));
    }
  };
};
export default withNamespaces()(index);
