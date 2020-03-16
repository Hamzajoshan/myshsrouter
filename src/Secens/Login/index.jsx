import React, { Component } from "react";
import { baseUrl } from "./../../config.js";
import "./index.css";
import Header from "../../Component/Header";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import $ from "jquery";
import decode from "jwt-decode";
import cookie from "react-cookies";
import SweetAlert from "@sweetalert/with-react";
// the hoc
import { withNamespaces } from "react-i18next";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,

      email: "",
      password: "",
      Token: "",
      errormessage: false,
      success: false,
      alert: false,
      login: false,
      emailLabel: false,
      userId: "",
      passwordLabel: false,
      next: false,
      userType: ""
    };
    this.userLogin = this.userLogin.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
  }
  componentWillUnmount() {
    // console.log("Login unmounted")
  }
  componentWillMount() {
    console.log(baseUrl);
    // console.log('googtrans= '+cookie.load('googtrans'))
    // $(this.refs['email']).scrollIntoView(true)
    this.setState({ Token: cookie.load("Token") });
    this.setState({
      login: true
    });
  }

  onEmailChange = e => {
    let email = e.target.value.split(" ").join("");
    this.setState({
      email: email,
      emailLabel: false
    });
  };
  onPasswordChange = e => {
    // let Lname= e.target.value.split(' ').join('');
    this.setState({
      password: e.target.value,
      passwordLabel: false
    });
  };

  userLogin = e => {
    const { email, password } = this.state;
    e.preventDefault();
    this.setState({
      loading: true,
      submitDisabled: true
    });
    // const =this.state.{Fname,Lname,email,password, confirmPassword}

    if (this.state.email === "") {
      this.setState({
        emailLabel: !this.state.emailLabel,
        loading: false,
        submitDisabled: false
      });
    } else if (this.state.password === "") {
      this.setState({
        passwordLabel: !this.state.passwordLabel,
        loading: false,
        submitDisabled: false
      });
    } else {
      // make API call
      // console.log(email)
      // this.props.accessToken(email);
      // cookie.save('Token', email)
      // this.props.accessToken(token.accessToken);
      // this.setState({
      //   next: true
      // })
      // this.props.history.push('/dashboard');

      fetch(`${baseUrl}api/TokenAuth/Authenticate`, {
        method: "post",
        // redirect: 'follow',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        mode: "cors",

        body: JSON.stringify({
          userNameOrEmailAddress: email,
          rememberClient: true,

          password: password
        })
      })
        .then(function(response) {
          return response.json(); //response.json() is resolving its promise. It waits for the body to load
        })
        .then(
          responseData => {
            if (!responseData.success) {
              // console.log(responseData.error.message)
              this.setState({
                errormessage: responseData.error.details,
                success: false
              });
              SweetAlert(
                <div style={{ color: "red" }}>
                  <h1>
                    {" "}
                    <strong>Error!</strong>
                  </h1>
                  <p style={{ fontSize: "20px" }}>{this.state.errormessage}</p>
                </div>
              );
              this.setState({
                email: "",

                password: "",
                submitDisabled: false,

                errormessage: false,
                success: responseData.success,
                loading: false
              });
            }
            if (responseData.success === true) {
              let token = responseData.result;

              let token1 = decode(responseData.result.accessToken);
              let userType = token1.UserType;
              // console.log(userType);
              this.setState({
                success: responseData.success,
                Token: token,
                userId: token.userId,
                userType
              });
              cookie.save("Token", token.accessToken);
              cookie.save("UserType", userType);

              if (userType == "1") {
                this.props.history.push("/dashboard");
              } else if (userType == "2") {
                this.props.history.push("/mydashboard");
              }

              //  alert(responseData);
              //  this.deleteThisGoal();
              // SweetAlert(
              //    <div className="alert alert-success alert-dismissible fade show">
              //                            <h1> <strong>Success!</strong></h1>
              //                             <p style={{fontSize:"30px"}}><strong>Congrats!</strong> Login successful...</p>

              //                         </div>
              // )

              // return <Dashboard Token={this.state.Token} />
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
          // console.log(error)
        });
    }
  };
  deleteThisGoal() {
    const getAlert = () => (
      <SweetAlert success title="Woot!" onConfirm={() => this.hideAlert()}>
        Hello world!
      </SweetAlert>
    );

    this.setState({
      alert: getAlert()
    });
  }

  hideAlert() {
    this.setState({
      alert: false
    });
  }
  cursorFocus = elem => {
    var x = window.scrollX,
      y = window.scrollY;
    window.scrollTo(x, y);
    $(this.refs["email"]).focus();
  };
  render() {
    if (cookie.load("Token")) {
      if (cookie.load("UserType") === "1") {
        this.props.history.push("/dashboard");
      } else if (cookie.load("UserType") === "2") {
        this.props.history.push("/mydashboard");
      }
    }

    return (
      <div className="bg-login ">
        <Header login={this.state.login} />
        <section>
          {/* <div className="container pb-3 pt-2 animated bounceIn"> */}
          <div className="container pb-3 pt-2 animated  zoomIn delay-0.5s">
            <div className="row container col-md-12 col-12  main-login ml-1">
              <div className="col-md-6 col-12 left-side">
                <div className="col-md-12 login">
                  <div className="triangle-left"></div>
                  <h3 className="text-uppercase">{this.props.t("signin")}</h3>
                </div>

                <Link to="/choose-signup">
                  <div className="col-md-12 sign-up">
                    <h3 className="text-uppercase">{this.props.t("signup")}</h3>
                  </div>
                </Link>
              </div>
              <div className="col-md-6 col-12 left-side1">
                <Link to="/choose-signup">
                  <div className="col-md-12 sign-up1">
                    <h3 className="text-uppercase">{this.props.t("signup")}</h3>
                  </div>
                </Link>

                <div className="col-md-12  login1">
                  <h3 className="text-uppercase">Log in</h3>
                  <div className="triangle-left1"></div>
                </div>
              </div>
              <div className="col-md-6 right-side">
                <h1>
                  <strong style={{ color: "#203957" }}>
                    S<span style={{ color: "#88bdef" }}>H</span>S
                  </strong>
                </h1>
                <span style={{ color: "#000" }}>
                  <h4>{this.props.t("signin_to_shs")}</h4>
                </span>
                <form>
                  {/* {this.state.success? 
                        ( )
                            :null} */}
                  <div className="form-group">
                    <label style={{ fontSize: "25px" }}>
                      {this.props.t("email")}{" "}
                      <span style={{ color: "#203957" }}>
                        {this.props.t("asteric")}
                      </span>
                    </label>
                    <input
                      type="text"
                      autocomplete="off"
                      autoFocus={true}
                      ref="email"
                      className="login-email form-control"
                      id="divFirst"
                      placeholder={this.props.t("enter_your_email_or_username")}
                      value={this.state.email}
                      onChange={this.onEmailChange}
                    />
                    {this.state.emailLabel ? (
                      <label className="text-danger">
                        {this.props.t("email_req")}
                      </label>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label style={{ fontSize: "25px" }}>
                      {this.props.t("password")}{" "}
                      <span style={{ color: "#203957" }}>
                        {this.props.t("asteric")}
                      </span>
                    </label>
                    <input
                      type="password"
                      className="form-control login-pass"
                      placeholder={this.props.t("password")}
                      value={this.state.password}
                      onChange={this.onPasswordChange}
                    />
                    {this.state.passwordLabel ? (
                      <label className="text-danger">
                        {this.props.t("password_req")}
                      </label>
                    ) : null}
                  </div>
                  {/* <div className="form-group "> */}
                  <div className="container row col-md-12 col-12 col-sm-12 col-lg-12 col-xl-12 btnForgetPwd">
                    <div className="col-md-12 col-12 col-sm-12 col-lg-8 col-xl-6">
                      <label className="check checkbox">
                        {this.props.t("remember_me")}
                        <input type="checkbox" name="is_name" />
                        <span className="checkmark"></span>
                      </label>
                    </div>

                    <div className="col-md-8 col-9  col-sm-5 col-lg-8 col-xl-6">
                      <Link
                        to="/forgotpassword"
                        className="forgot float-right"
                        // value="Login"
                      >
                        {this.props.t("forgot_password")}
                      </Link>
                    </div>
                  </div>

                  <div
                    className="form-group col-md-12 mt-5 text-center"
                    onClick={this.userLogin}
                    disabled={this.state.submitDisabled}
                  >
                    {this.state.loading ? (
                      <input
                        type="button"
                        className="btSnubmit"
                        value={this.props.t("wait")}
                      />
                    ) : (
                      <input
                        value="save"
                        name="save"
                        type="submit"
                        className="btSnubmit"
                        value={this.props.t("signin")}
                      />
                    )}
                    {/* { this.state.success?<Redirect to="/dashboard"/>:null} */}
                  </div>
                  <div className="form-group col-md-12 mt-3 text-center user">
                    <span>{this.props.t("new_user")}</span>
                    <Link to="/choose-signup">
                      &nbsp;{this.props.t("signup")}
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        {/* <Footer/> */}
      </div>
    );
  }
}

export default withNamespaces()(index);
