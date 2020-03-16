import React, { Component } from "react";
import cookie from "react-cookies";
import { Multiselect } from "multiselect-react-dropdown";
// import SweetAlert from "@sweetalert/with-react";
// import { connect } from "react-redux";
// import { tokenState } from "../../../actions/userAccessToken";
// import { Link } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import logo from "../../../images/logo.png";
import "./index.css";
import Loader from "./../../loader";
import { Redirect } from "react-router-dom";
// import $ from "jquery";
import SweetAlert from "@sweetalert/with-react";
import decode from "jwt-decode";
import { baseUrl } from "./../../../config.js";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: "",
      currentSp: "",
      token: "",
      myProjects: "",
      userId: "",
      result: "",
      loading: false,
      selectedWorkIntersts: [],
      selectedSpType: [],
      workInterestValuesMultiSelect: [],
      Fname: "",
      FnameLabel: false,
      Lname: "",
      LnameLabel: false,
      pnumber: "",
      pnumberLabel: "",
      username: "",
      usernameLabel: false,
      dateLoading: true,
      submitDisabled: false,
      success: false,
      sub: ""
    };
    this.onSelectWorkInterest = this.onSelectWorkInterest.bind(this);
    this.onRemoveWorkInterest = this.onRemoveWorkInterest.bind(this);
    this.userRegistration = this.userRegistration.bind(this);

    // this.resultsDiv = React.createRef();
  }
  onFnameChange = e => {
    let Fname = e.target.value.split(" ").join("");

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
  onPnumberChange = e => {
    if (/^[0-9\b]+$/.test(e.target.value) || e.target.value === "") {
      this.setState({
        pnumber: e.target.value,
        pnumberLabel: false
      });
    }
  };
  onEmailChange = e => {
    this.setState({
      email: e.target.value,
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
  onSelectWorkInterest = (optionsList, selectedItem) => {
    let workinterstArray = [];
    for (let i = 0; i < optionsList.length; i++) {
      workinterstArray.push(optionsList[i].id);
    }

    this.setState({
      workInterestValuesMultiSelect: workinterstArray
    });
  };
  onRemoveWorkInterest = (optionList, removedItem) => {
    let workinterstArray = [];
    for (let i = 0; i < optionList.length; i++) {
      workinterstArray.push(optionList[i].id);
    }

    this.setState({
      workInterestValuesMultiSelect: workinterstArray
    });
  };
  userRegistration = e => {
    const { Fname, Lname, email, username, userId, sub, pnumber } = this.state;
    e.preventDefault();
    this.setState({
      loading: true,
      submitDisabled: true
    });
    // const =this.state.{Fname,Lname,email,password, confirmPassword}
    if (
      Fname === "" ||
      Lname === "" ||
      email === "" ||
      username === "" ||
      pnumber === ""
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
          pnumberLabel: !this.state.pnumberLabel,
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
    } else {
      fetch(`${baseUrl}api/services/app/User/Update`, {
        method: "PUT",

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.state.token
        },
        body: JSON.stringify({
          userName: username,
          name: Fname,
          surname: Lname,
          emailAddress: email,
          phoneNumber: pnumber,
          reffId: userId,
          id: sub
        })
      })
        .then(function(response) {
          return response.json(); //response.json() is resolving its promise. It waits for the body to load
        })
        .then(
          responseData => {
            if (!responseData.success) {
              SweetAlert(
                <div className="alert alert-danger fade show">
                  <h1>
                    {" "}
                    <strong>Error!</strong>
                  </h1>
                  <p style={{ fontSize: "30px" }}>
                    {responseData.error.message}
                  </p>
                </div>
              );
              this.setState({
                loading: false,
                submitDisabled: false,
                success: false
              });
            } else {
              SweetAlert(
                <div style={{ color: "green" }}>
                  <h1>
                    {" "}
                    <strong>Success!</strong>
                  </h1>
                  <p style={{ fontSize: "30px" }}>Data Updated Successfully</p>
                </div>
              );
              this.setState({
                success: true
              });
              //Here If the record Updated Successfully
            }
          },
          error => {
            //
            // this.setState({
            //   errormessage:error,
            // });
          }
        )
        .catch(error => {});
    }
  };
  componentDidMount() {
    if (cookie.load("Token")) {
      let tokenuncoded = cookie.load("Token");
      let token = decode(cookie.load("Token"));
      this.setState({ userId: token.ReffID, sub: token.sub });

      this.setState({
        token: tokenuncoded
      });
      fetch(`${baseUrl}api/services/app/User/Get?Id=` + token.sub)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            //  console.log(json.result)
            let user = json.result;
            let Fname = user.name;
            let Lname = user.surname;
            let pnumber = user.phoneNumber;
            let emailAddress = user.emailAddress;
            let userName = user.userName;
            this.setState({
              currentUser: user,
              username: userName,
              Fname: Fname,
              Lname: Lname,
              pnumber: pnumber,
              email: emailAddress,
              dateLoading: false
            });
          }
        })
        .catch(error => {
          // console.error(error);
        });
    }
  }

  render() {
    const show = this.state.dateLoading ? (
      <Loader />
    ) : (
      <div class="bg-pt">
        <section class="sign-body">
          <div class="col-md-12 profile-img pt-5 m-0">
            <div class="d-flex justify-content-center">
              <div class="row">
                <div class="col-xs-12 col-md-12 d-flex justify-content-center">
                  <label class="cabinet ">
                    <img
                      src={logo}
                      class="gambar img-responsive img-thumbnail"
                      id="item-img-output"
                    />
                  </label>
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="d-flex justify-content-center">
                <span class="profile-name">
                  <p class="profile-name-p">
                    {this.state.currentUser.fullName}
                  </p>
                </span>
              </div>
            </div>
          </div>

          <div class="col-md-12 pb-5">
            <div class="col-md-12  d-flex justify-content-center">
              <form onSubmit={this.userRegistration}>
                <div class="col-md-12 ">
                  <div class=" row">
                    <div class="col-md-6 input-effect-profile mt-5">
                      <label>First Name</label>
                      {this.state.FnameLabel ? (
                        <label className="text-danger">
                          {this.props.t("f_name_req")}
                        </label>
                      ) : null}
                      <input
                        class="effect-16-profile"
                        type="text"
                        placeholder=""
                        onChange={this.onFnameChange}
                        value={this.state.Fname}
                      />
                      <span class="focus-border-profile"></span>
                    </div>

                    <div class="col-md-6 input-effect-profile mt-5">
                      {this.state.LnameLabel ? (
                        <label className="text-danger">
                          {this.props.t("lastname_req")}
                        </label>
                      ) : null}
                      <label>Last Name</label>
                      <input
                        class="effect-16-profile"
                        type="text"
                        placeholder=""
                        onChange={this.onLnameChange}
                        value={this.state.Lname}
                      />
                      <span class="focus-border-profile"></span>
                    </div>
                  </div>
                </div>
                <div class="col-md-12 ">
                  <div class=" row">
                    <div class="col-md-6 input-effect-profile mt-5">
                      <label>Email</label>
                      {this.state.emailLabel ? (
                        <label className="text-danger">
                          {this.props.t("email_address_req")}
                        </label>
                      ) : null}
                      <input
                        class="effect-16-profile"
                        type="text"
                        placeholder=""
                        onChange={this.onEmailChange}
                        value={this.state.email}
                      />
                      <span class="focus-border-profile"></span>
                    </div>

                    <div class="col-md-6 input-effect-profile mt-5">
                      <label>Phone</label>
                      {this.state.pnumberLabel ? (
                        <label className="text-danger">
                          {this.props.t("phone_req")}
                        </label>
                      ) : null}
                      <input
                        class="effect-16-profile"
                        type="text"
                        pattern="^(?:05|\\+)[0-9\\s.\\/-]{8}$"
                        maxLength="10"
                        placeholder=""
                        onChange={this.onPnumberChange}
                        value={this.state.pnumber}
                      />
                      <span class="focus-border-profile"></span>
                    </div>
                  </div>
                </div>
                <div class="col-md-12 ">
                  <div class=" row">
                    <div class="col-md-12 input-effect-profile mt-5">
                      <label>UserName</label>
                      {this.state.usernameLabel ? (
                        <label className="text-danger">
                          {this.props.t("username_req")}
                        </label>
                      ) : null}
                      <input
                        class="effect-16-profile"
                        type="text"
                        placeholder=""
                        onChange={this.onUsernameChange}
                        value={this.state.username}
                      />
                      <span class="focus-border-profile"></span>
                    </div>
                  </div>
                </div>
                <div class="col-md-12 col-12 mb-5">
                  <div class=" row d-flex justify-content-center">
                    <div class="col-md-6 col-6 mt-5 submit">
                      <button
                        type="submit"
                        disabled={this.state.submitDisabled}
                        class="submit-button"
                      >
                        <div className="col-md-6 container">
                          {this.state.loading ? (
                            <div style={{ color: "lightgrey" }}>
                              {this.props.t("wait")}...
                            </div>
                          ) : (
                            <span>
                              {" "}
                              <strong>
                                <strong>{this.props.t("submit")}</strong>{" "}
                              </strong>
                            </span>
                          )}
                          {this.state.success ? (
                            <Redirect to="/dashboard" />
                          ) : null}
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    );
    return <div className="MainDiv">{show}</div>;
  }
}

export default withNamespaces()(index);
