import React, { Component } from "react";
// import './Projects/node_modules/@trendmicro/react-sidenav/dist/react-sidenav.css';
import "./index.css";
// import Sidebar from "../Sidebar";
// import Content from "../Body";
// import Header from "../Header";
import { withNamespaces } from "react-i18next";
import cookie from "react-cookies";
import SweetAlert from "@sweetalert/with-react";
import { Redirect } from "react-router-dom";
import decode from "jwt-decode";
import { baseUrl } from "./../../../config.js";
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: true,
      scrollTop: 0,
      token: "",
      ProjectId: "",
      projectTitle: "",
      userType: "",
      fromId: "",
      accuracy: "",
      Attitude: "",
      responseRate: "",
      SticknessToRequirements: "",
      submitDisabled: false,
      success: false,
      comment: ""
    };
    // this.resultsDiv = React.createRef();
    // this.bignav = this.bignav.bind(this)
    // this.mynav = this.mynav.bind(this)
    // this.logout = this.logout.bind(this)

    // this.resultsDiv = React.createRef();
    this.SticknessToRequirementsHandle = this.SticknessToRequirementsHandle.bind(
      this
    );
    this.handleComment = this.handleComment.bind(this);
    this.responseRateHandle = this.responseRateHandle.bind(this);
    this.AttitudeHandle = this.AttitudeHandle.bind(this);
    this.AccuracyHandle = this.AccuracyHandle.bind(this);
    this.SubmitReview = this.SubmitReview.bind(this);
  }
  //I will Do all the things about the response rate
  handleComment = e => {
    this.setState({
      comment: e.target.value
    });
  };
  responseRateHandle = e => {
    this.setState({
      responseRate: e.target.value
    });
  };
  SticknessToRequirementsHandle = e => {
    this.setState({
      SticknessToRequirements: e.target.value
    });
  };
  AttitudeHandle = e => {
    this.setState({
      Attitude: e.target.value
    });
  };
  AccuracyHandle = e => {
    this.setState({
      accuracy: e.target.value
    });
  };
  //Put the logic about submit

  SubmitReview = e => {
    e.preventDefault();
    const {
      accuracy,
      SticknessToRequirements,
      Attitude,
      fromId,
      responseRate,
      ProjectId,
      comment,
      toId
    } = this.state;

    if (
      accuracy === "" ||
      SticknessToRequirements === "" ||
      Attitude === "" ||
      responseRate === "" ||
      comment === ""
    ) {
      //Here i will render a message to user that please select an option
    } else {
      //Will Make An API CALL here

      if (this.state.userType === "1") {
        fetch(
          `${baseUrl}api/services/app/Reviews/AddReviewsAsync`,
          {
            method: "post",
            redirect: "follow",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + this.state.token
            },
            mode: "cors",

            body: JSON.stringify({
              comments: comment,
              projectId: ProjectId,
              toId: toId,
              fromId: fromId,
              reviewType: 1,
              attitude: Attitude,
              paymentsAccuracy: accuracy,
              responceRate: responseRate,
              sticknessToRequirements: SticknessToRequirements
            })
          }
        )
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
                    <p style={{ fontSize: "20px" }}>
                      {this.state.errormessage}
                    </p>
                  </div>
                );
                this.setState({
                  submitDisabled: false,

                  errormessage: false,
                  success: responseData.success,
                  loading: false
                });
              }
              if (responseData.success === true) {
                this.setState({
                  success: !this.state.success
                });
                //  return <Link to='/dashboard'/>
                // this.props.history.push('/dashboard');

                SweetAlert(
                  <div style={{ color: "green" }}>
                    <h1>
                      {" "}
                      <strong>Success!</strong>
                    </h1>
                    <p style={{ fontSize: "20px" }}>
                      Review Posted successfully.
                    </p>
                  </div>
                );

                // this.props.history.push('/dashboard');
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
      } else if (this.state.userType === "2") {
        fetch(
          `${baseUrl}api/services/app/Reviews/AddReviewsAsync`,
          {
            method: "post",
            redirect: "follow",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + this.state.token
            },
            mode: "cors",

            body: JSON.stringify({
              comments: comment,
              projectId: ProjectId,
              toId: toId,
              fromId: fromId,
              reviewType: 1,
              attitude: Attitude,
              paymentsAccuracy: accuracy,
              responceRate: responseRate,
              sticknessToRequirements: SticknessToRequirements
            })
          }
        )
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
                    <p style={{ fontSize: "20px" }}>
                      {this.state.errormessage}
                    </p>
                  </div>
                );
                this.setState({
                  submitDisabled: false,

                  errormessage: false,
                  success: responseData.success,
                  loading: false
                });
              }
              if (responseData.success === true) {
                this.setState({
                  success: !this.state.success
                });
                //  return <Link to='/dashboard'/>
                // this.props.history.push('/dashboard');

                SweetAlert(
                  <div style={{ color: "green" }}>
                    <h1>
                      {" "}
                      <strong>Success!</strong>
                    </h1>
                    <p style={{ fontSize: "20px" }}>
                      Review Posted successfully.
                    </p>
                  </div>
                );

                // this.props.history.push('/dashboard');
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
    }
  };

  componentWillMount() {
    if (cookie.load("Token")) {
      let token = cookie.load("Token");
      let token1 = decode(cookie.load("Token"));
      let spId = this.props.match.params.spId;
      let custId = this.props.match.params.custId;

      if (token1.userType === "1") {
        this.setState({
          token: token,
          userType: token1.UserType,
          fromId: custId,
          toId: spId
        });
      } else if (token1.userType === "2") {
        this.setState({
          token: token,
          userType: token1.UserType,
          fromId: spId,
          toId: custId
        });
      }
    }
    this.setState({
      ProjectId: this.props.match.params.projectId
    });
  }
  componentDidMount() {}

  render() {
    // if (!cookie.load('Token')) {
    //   // return <LoginPanel onSuccess={this.onLogin} />
    //   this.props.history.push('/Login');
    // }

    return (
      <div className="Maindiv">
        <div>
          <section>
            <div className="col-md-12 pb-5 d-flex justify-content-center">
              <div className="col-md-8 mt-5  d-flex justify-content-center main-bid-form">
                <form onSubmit={this.SubmitReview}>
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="col-md-12 input-effect-bidding mt-5">
                          <label className="label">
                            {this.props.t("payment_accuracy")}
                          </label>

                          <select
                            className="form-control mainLoginInput"
                            id="inputDado22"
                            onChange={this.AccuracyHandle}
                            value={this.state.accuracy}
                            required
                          >
                            <option value="">Select Any One</option>
                            <option value="5">Outstanding</option>
                            <option value="4">Excellent</option>
                            <option value="3">Good</option>
                            <option value="2">Average</option>
                            <option value="1">Satisfactory</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="col-md-12 input-effect-bidding mt-5">
                          <label className="label">
                            {this.props.t("atitude")}
                          </label>
                          <select
                            className="form-control mainLoginInput"
                            id="inputDado22"
                            onChange={this.AttitudeHandle}
                            value={this.state.Attitude}
                            required
                          >
                            <option value="">Select Any One</option>
                            <option value="5">Outstanding</option>
                            <option value="4">Excellent</option>
                            <option value="3">Good</option>
                            <option value="2">Average</option>
                            <option value="1">Satisfactory</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="col-md-12 input-effect-bidding mt-5">
                          <label className="label">
                            {this.props.t("response_rate")}
                          </label>
                          <select
                            className="form-control mainLoginInput"
                            id="inputDado22"
                            onChange={this.responseRateHandle}
                            value={this.state.responseRate}
                            required
                          >
                            <option value="">Select Any One</option>
                            <option value="5">Outstanding</option>
                            <option value="4">Excellent</option>
                            <option value="3">Good</option>
                            <option value="2">Average</option>
                            <option value="1">Satisfactory</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="col-md-12 input-effect-bidding mt-5">
                          <label className="label">
                            {this.props.t("stickness_req")}
                          </label>
                          <select
                            className="form-control mainLoginInput"
                            id="inputDado22"
                            onChange={this.SticknessToRequirementsHandle}
                            value={this.state.SticknessToRequirements}
                            required
                          >
                            <option value="">Select Any One</option>
                            <option value="5">Outstanding</option>
                            <option value="4">Excellent</option>
                            <option value="3">Good</option>
                            <option value="2">Average</option>
                            <option value="1">Satisfactory</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-12 input-effect-bidding mt-4 pl-3">
                        <h4 className=" pb-4 pl-3" style={{ color: "#fff" }}>
                          {this.props.t("comments")}
                        </h4>
                        <textarea
                          id="textarea"
                          placeholder={this.props.t("put_your_comments_here")}
                          onChange={this.handleComment}
                          value={this.state.comment}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-12 col-12 mb-5">
                    <div class=" row d-flex justify-content-center">
                      <div class="col-md-4 col-6 mt-5 attach">
                        <input
                          type="submit"
                          className="button"
                          value={this.props.t("put_your_review")}
                          disabled={this.state.submitDisabled}
                        />
                        {this.state.success ? (
                          <Redirect to="/dashboard" />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {/* </div> */}
          </section>
        </div>
      </div>
    );
  }
}

export default withNamespaces()(index);
