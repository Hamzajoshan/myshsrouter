import React, { Component } from "react";

import SweetAlert from "@sweetalert/with-react";

import "./index.css";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import cookie from "react-cookies";
import { withNamespaces } from "react-i18next";
import { baseUrl } from "./../../config.js";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      Fname: "",
      Lname: "",
      email: "",
      username: "",
      pnumber: "",
      password: "",
      confirmpassword: "",
      errormessage: false,
      success: false,
      FnameLabel: false,
      LnameLabel: false,
      emailLabel: false,
      pnumberLabel: false,
      usernameLabel: false,
      passwordLabel: false,
      confirmpasswordLabel: false,
      matchLabel: false,
      lengthLabelPassword: false
    };
    this.userRegistration = this.userRegistration.bind(this);
  }

  onFnameChange = e => {
    // function removeSpaces(string) {
    let Fname = e.target.value.split(" ").join("");

    //  }
    this.setState({
      Fname: Fname,
      FnameLabel: false
    });
  };
  onLnameChange = e => {
    let Lname = e.target.value.split(" ").join("");

    this.setState({
      Lname: Lname,
      LnameLabel: false
    });
  };
  onEmailChange = e => {
    let email = e.target.value.split(" ").join("");

    this.setState({
      email: email,
      emailLabel: false
    });
  };
  onUsernameChange = e => {
    let username = e.target.value.split(" ").join("");

    this.setState({
      username: username,
      usernameLabel: false
    });
  };
  onPnumberChange = e => {
    if (/^[0-9\b]+$/.test(e.target.value) || e.target.value === "") {
      this.setState({
        pnumber: e.target.value,
        pnumberLabel: false
      });
    }
  };
  onPasswordChange = e => {
    // let Lname= e.target.value.split(' ').join('');
    this.setState({
      password: e.target.value,
      passwordLabel: false,
      lengthLabelPassword: false
    });
  };
  onConfirmpasswordChange = e => {
    // let Lname= e.target.value.split(' ').join('');
    this.setState({
      confirmpassword: e.target.value,
      confirmpasswordLabel: false
    });
    if (this.state.password !== e.target.value) {
      // let Lname= e.target.value.split(' ').join('');
      this.setState({
        match: false,
        matchLabel: true
      });
    } else {
      this.setState({
        match: false,
        matchLabel: false
      });
    }
  };

  userRegistration = e => {
    const {
      Fname,
      Lname,
      email,
      username,
      password,
      confirmpassword
    } = this.state;
    e.preventDefault();
    this.setState({
      loading: true,
      submitDisabled: true
    });
    if (
      Fname === "" ||
      Lname === "" ||
      email === "" ||
      username === "" ||
      password === "" ||
      confirmpassword === ""
    ) {

      if (this.state.Fname === "") {
        // $(this.refs['fname']).focus();

        this.setState({
          FnameLabel: !this.state.FnameLabel,
          loading: false,
          submitDisabled: false
        });
      }
      if (this.state.Lname === "") {
        // $(this.refs['lname']).focus();

        this.setState({
          LnameLabel: !this.state.LnameLabel,
          loading: false,
          submitDisabled: false
        });
      }
      if (this.state.email === "") {
        // $(this.refs['email']).focus();

        this.setState({
          emailLabel: !this.state.emailLabel,
          loading: false,
          submitDisabled: false
        });
      }
      if (this.state.pnumber === "") {
        // $(this.refs['phone']).focus();

        this.setState({
          pnumberLabel: !this.state.pumberLabel,
          loading: false,
          submitDisabled: false
        });
      }
      if (this.state.username === "") {
        // $(this.refs['username']).focus();

        this.setState({
          usernameLabel: !this.state.usernameLabel,
          loading: false,
          submitDisabled: false
        });
      }
      if (this.state.password === "") {
        // $(this.refs['password']).focus();

        this.setState({
          passwordLabel: !this.state.passwordLabel,
          loading: false,
          submitDisabled: false
        });
      } else if (this.state.password.length < 3) {
        this.setState({
          lengthLabelPassword: !this.state.lengthLabelPassword,
          loading: false,
          submitDisabled: false
        });
      }
      if (this.state.confirmpassword === "") {
        // $(this.refs['password']).focus();

        this.setState({
          confirmpasswordLabel: !this.state.confirmpasswordLabel,
          loading: false,
          submitDisabled: false
        });
      }
    } else if (this.state.password !== this.state.confirmpassword) {
      this.setState({
        success: false,
        // errormessage:"Password does not match!!!",
        loading: false,
        submitDisabled: false
      });
    } else {
      // make API call
        const {Fname,Lname,email,password, confirmPassword,pnumber,username}=this.state;
        console.log('Fname',Fname);
        console.log('Lname',Lname);
        console.log('email',email);
        console.log('password',password);
        // console.log('confirmPassword',confirmPassword);
        console.log('pnumber',pnumber);
        console.log('username',username);

      fetch(
          `${baseUrl
          }api/services/app/User/Create`,
        // `${baseUrl}api/services/app/User/Create`,
        {
          method: "post",


          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userName: username,
            name: Fname,
            surname: Lname,
            emailAddress: email,
            isActive: true,
            password: password,
            userType: 1,
            phoneNumber:pnumber
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
                <p style={{ fontSize: "20px" }}>Signed up successfully.</p>
              </div>
            );
            this.setState({
              Fname: "",
              Lname: "",
              username: "",
              email: "",

              pnumber: "",
              text: "",
              emailValid: false, // valid flags for each field
              textValid: false,
              submitDisabled: false,
              password: "",
              confirmpassword: "",
              errormessage: false,
              success: responseData.success,

              loading: false
            });
            if (!responseData.success) {
              // console.log(responseData.error.message)
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
  // onFnameChange=(e)=>{
  //   this.setState({
  //     Fname:e.target.value,
  //     FnameLabel:false
  //   })
  // }
  // onLnameChange=(e)=>{
  //   this.setState({
  //     Lname:e.target.value,
  //     LnameLabel:false
  //   })
  // }
  // onEmailChange=(e)=>{
  //   this.setState({
  //     email:e.target.value,
  //     emailLabel:false
  //   })
  // }
  // onUsernameChange=(e)=>{
  //   this.setState({
  //     username:e.target.value,
  //     usernameLabel:false
  //   })
  // }
  // onPasswordChange=(e)=>{
  //   this.setState({
  //     password:e.target.value,
  //     passwordLabel:false
  //   })
  // }
  // onConfirmpasswordChange=(e)=>{

  //   this.setState({
  //     confirmpassword:e.target.value,
  //     // passwordLabel:false
  //   })
  //   if(this.state.password!=e.target.value){
  //     this.setState({
  //       match:false,
  //       matchLabel:true
  //     })

  //   }
  //   else{
  //     this.setState({
  //       match:false,
  //       matchLabel:false
  //     })

  //   }
  // }
  render() {
    if (cookie.load("Token")) {
      // return <LoginPanel onSuccess={this.onLogin} />
      // return <Dashboard />
      this.props.history.push("/dashboard");
    }
    return (
      <div>
        <div className="bg-sign-up">
          <Header />
          <section className="sign-body" id="form">
            <div className="col-md-12 d-flex align-items-center justify-content-center">
              <div className="col-md-8 col-xm-4 col-sm-8 col-lg-7  pt-5 pb-5 d-flex align-items-center justify-content-center">
                <div className=" col-md-8 col-xm-3 col-sm-8 col-lg-8 col-8 custom-sign">
                  <h2 className="text-uppercase">
                    <strong>{this.props.t("signup")}</strong>
                  </h2>
                </div>
                <div className="col-md-12 ">
                  <div className="row center form">
                    <div className="col-md-12">
                      <form
                        className="inner-form"
                        onSubmit={this.userRegistration}
                      >
                        {/* {this.state.errormessage? 
                            <div className="alert alert-danger fade show">
                            <strong>Error!</strong> {this.state.errormessage}
                              </div>
                            :null}
                             {this.state.success? 
                            <div className="alert alert-success alert-dismissible fade show">
                            <strong>Success!</strong> signed up successfully.
                           
                        </div>
                            :null} */}
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <input
                              autocomplete="off"
                              id="inputDado"
                              ref="fname"
                              autoFocus={true}
                              type="name"
                              maxLength="20"
                              className="form-control mainLoginInput"
                              placeholder={this.props.t("first_name")}
                              value={this.state.Fname}
                              onChange={this.onFnameChange}
                            />
                            {this.state.FnameLabel ? (
                              <label className="text-danger">
                                {this.props.t("f_name_req")}
                              </label>
                            ) : null}
                          </div>

                          <div className="form-group col-md-6">
                            <input
                              autocomplete="off"
                              ref="lname"
                              id="inputDado"
                              type="name"
                              maxLength="20"
                              className="form-control mainLoginInput"
                              placeholder={this.props.t("first_name")}
                              value={this.state.Lname}
                              onChange={this.onLnameChange}
                            />
                            {this.state.LnameLabel ? (
                              <label className="text-danger">
                                {this.props.t("lastname_req")}
                              </label>
                            ) : null}
                          </div>
                          {/* <div className="form-group col-md-6">
                                <input  ref="email" type="email"  maxLength="30" className="form-control mainLoginInput" id="inputDado" placeholder=" Email*" value={this.state.email} onChange={this.onEmailChange}/>
                                {this.state.emailLabel?<label className="text-danger">Email Address required.</label>:null}
                              
                              </div> */}
                          <div className="form-group col-md-6">
                            <input
                              autocomplete="off"
                              ref="email"
                              id="inputDado"
                              type="email"
                              maxLength="30"
                              className="form-control mainLoginInput"
                              placeholder={this.props.t("email_placeholder")}
                              value={this.state.email}
                              onChange={this.onEmailChange}
                            />
                            {/* <input autocomplete="off" ref="email" type="email"  maxLength="30" className="form-control mainLoginInput" id="inputDado" placeholder=" Email*" value={this.state.email} onChange={this.onEmailChange} required/> */}

                            {this.state.emailLabel ? (
                              <label className="text-danger">
                                {this.props.t("email_address_req")}
                              </label>
                            ) : null}
                          </div>

                          <div className="form-group col-md-6">
                            <input
                              autocomplete="off"
                              ref="phone"
                              id="inputDado"
                              type="text"
                              pattern="^(?:05|\\+)[0-9\\s.\\/-]{8}$"
                              maxLength="10"
                              className="form-control mainLoginInput"
                              placeholder="05XXXXXXXX *"
                              value={this.state.pnumber}
                              onInput={this.onPnumberChange}
                            />
                            {this.state.pnumberLabel ? (
                              <label className="text-danger">
                                {this.props.t("phone_req")}
                              </label>
                            ) : null}
                          </div>
                          {/*  */}
                          <div className="form-group col-md-6">
                            <input
                              autocomplete="off"
                              ref="username"
                              id="inputDado"
                              type="name"
                              maxLength="20"
                              className="form-control mainLoginInput"
                              placeholder={this.props.t("username_star")}
                              value={this.state.username}
                              onChange={this.onUsernameChange}
                            />
                            {this.state.usernameLabel ? (
                              <label className="text-danger">
                                {this.props.t("username_req")}
                              </label>
                            ) : null}
                          </div>

                          <div className="form-group col-md-6">
                            <input
                              autocomplete="off"
                              ref="password"
                              id="inputDado"
                              type="password"
                              maxLength="10"
                              className="form-control mainLoginInput"
                              placeholder={this.props.t("password_star")}
                              value={this.state.password}
                              onChange={this.onPasswordChange}
                            />
                            {this.state.passwordLabel ? (
                              <label className="text-danger">
                                {this.props.t("password_req")}
                              </label>
                            ) : null}
                            {this.state.lengthLabelPassword ? (
                              <label className="text-danger">
                                {this.props.t("min_length_3")}
                              </label>
                            ) : null}
                          </div>
                          {/*  */}
                          <div className="form-group col-md-6">
                            <input
                              autocomplete="off"
                              ref="phone"
                              id="inputDado"
                              type="password"
                              maxLength="10"
                              className="form-control mainLoginInput"
                              placeholder={this.props.t(
                                "re-type_password_star"
                              )}
                              value={this.state.confirmpassword}
                              onChange={this.onConfirmpasswordChange}
                            />
                            {this.state.confirmpasswordLabel ? (
                              <label className="text-danger">
                                {this.props.t("confirm_pass_req")}
                              </label>
                            ) : null}
                            {this.state.matchLabel ? (
                              <label className="text-danger">
                                {this.props.t("password_mismatch")}
                              </label>
                            ) : null}
                          </div>
                          {/* <br/> <br/> <br/> */}
                          <div className="form-group col-md-6"></div>

                          <button
                            className="col-md-6 col-7 container button-outer"
                            style={{ outline: "inherit" }}
                            type="submit"
                            value="save"
                            name="save"
                            disabled={this.state.submitDisabled}
                          >
                            {/* <a href="#" className="button-inner" onClick={this.userRegistration} > */}
                            <div className="col-md-6 container">
                              {this.state.loading ? (
                                <div style={{ color: "lightgrey" }}>
                                  {this.props.t("wait")}...
                                </div>
                              ) : (
                                <span>
                                  {" "}
                                  <strong>{this.props.t("signup")}</strong>
                                </span>
                              )}
                            </div>
                            {/* </a> */}
                          </button>
                          {this.state.success ? <Redirect to="/Login" /> : null}

                          <br />
                          <div className="col-md-12 pt-3">
                            <span>
                              <p style={{ color: "#000" }}>
                                {this.props.t("already_account")}{" "}
                                <Link
                                  to="/Login"
                                  style={{ textDecoration: "none" }}
                                >
                                  {this.props.t("signin")}
                                </Link>
                              </p>
                            </span>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    // date: state.places.date,
    // places: state.places.places,
    Income: state.places.Income
    // Expense: state.places.Expense
  };
};
// const mapDispatchToProps = dispatch => {
// return {
//   add1: (name) => {
//     dispatch(incomeState(name))
//   },
// add2: (name) => {
//   dispatch(incomeArrayState(name))
// },
// add3: (name) => {
//   dispatch(expenseState(name))
// },
// add4: (name) => {
//   dispatch(expenseArrayState(name))
// },
// add5: (name) => {
//   dispatch(dateState(name))
// },

// changeStateToReducer1: (name) => {
//   dispatch(incomeState(name))
// }

//   }
// }
export default withNamespaces()(connect(mapStateToProps)(index));
// export default index;
