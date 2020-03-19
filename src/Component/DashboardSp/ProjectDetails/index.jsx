import React, { Component } from "react";
// import './Projects/node_modules/@trendmicro/react-sidenav/dist/react-sidenav.css';
import "./index.css";
import Sidebar from "../Sidebar";
import Chat from "../Chat";
import TimeAgo from "react-timeago";
import { baseUrl } from "./../../../config.js";
import Loader from "./../../loader";
import Header from "../Header";

import cookie from "react-cookies";
import * as moment from "moment";
import { withNamespaces } from "react-i18next";
import Moment from "react-moment";
import { Link } from "react-router-dom";
// import SweetAlert from "@sweetalert/with-react";
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: true,
      scrollTop: 0,
      token: "",
      result: "",
      isOpen: false,
      custId: "",
      reason: "",
      reasonLoading: false,
      closeDisabled: false,
      reasonError: false,
      errormessage: false,
      success: false,
      projectBids: "",
      projectId: "",
      ProjectDocuments: "",
      ext: "",
      d_file: ""
    };
    this.showImage = this.showImage.bind(this);
  }
  componentWillMount() {
    if (cookie.load("Token")) {
      let token = cookie.load("Token");
      this.setState({ token: token });
    }

    this.setState({
      projectId: this.props.match.params.projectId
    });
  }
  showImage = url => e => {
    console.log("working");
    e.preventDefault();
    let file_n = "";
    let exten = "";
    let a = url.slice(8, url.length);
    var i = a.split(".").pop();
    exten = i;
    file_n = a;
    console.log(url);
    console.log(file_n);
    console.log("exten", exten);
    this.setState({
      ext: exten,
      d_file: file_n
    });
  };
  //accept bid

  componentDidMount() {
    let id = this.state.projectId;
    fetch(`${baseUrl}api/services/app/Project/GetProjectDetailById?Id=` + id, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + this.state.token
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          // console.log("result", json.result);
          let result = json.result;
          console.log("cutsId", result.customer.id);
          let duration_props = this.props.t("duration");
          let budget_props = this.props.t("budget");
          let description_props = this.props.t("description");
          let posted_props = this.props.t("posted");
          let rejected_props = this.props.t("rejected");
          let accepte_props = this.props.t("accepted");
          let details_props = this.props.t("details");
          let projectBids = json.result.projectBids.map(function(key) {
            // kh code start
            var d = new Date();
            var s1 = key.creationTime;
            var s2 = s1.slice(11, 19);
            var s3 = s2.slice(0, 2);
            var diff = d.getTimezoneOffset() / 60;
            var t = "";
            var a = parseInt(s3) + parseInt(diff) * -1;
            if (a < 10) {
              t = "0" + a;
            } else {
              t = a;
            }
            var j = s1.slice(0, 11);
            var k = s1.slice(13, 25);
            var nT = j + t + k;
            // kh code end

            // start of bid item
            let disabled = false;
            let linked = (
              <Link
                className="make-bid-btnn mt-3"
                to={`/bid_detail/${key.id}/${result.title}/${id}`}
                style={{
                  paddingTop: "14px",
                  marginTop: " 0px",
                  textDecoration: "none",
                  float: "right"
                }}
              >
                {details_props}
              </Link>
            );
            if (key.status == 1) {
              disabled = false;
            }
            if (key.status == 2) {
              disabled = true;
              linked = (
                <p
                  className="mt-3 mb-2"
                  style={{
                    paddingTop: "10px",
                    marginTop: " 0px",
                    textDecoration: "none",
                    float: "right",
                    color: "green"
                  }}
                >
                  {accepte_props}
                </p>
              );
            }
            if (key.status == -1) {
              linked = (
                <p
                  className="mt-3 mb-2"
                  style={{
                    paddingTop: "10px",
                    marginTop: " 0px",
                    textDecoration: "none",
                    float: "right",
                    color: "red"
                  }}
                >
                  {rejected_props}
                </p>
              );
            }
            return (
              <div class="container">
                <div class="col-md-12 d-flex justify-content-center">
                  <div class="col-md-9 main-style-back mt-3">
                    <div class="col-md-12 col-12 top-blue-back">
                      <div class="row">
                        <div class="col-md-12 col-12  top-blue-para-right">
                          <p class="top-blue-para-right-p row">
                            {posted_props} &nbsp;
                            <span class="top-blue-para-right-p-span">
                              <TimeAgo date={nT} />
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12 col-12 col-sm-12 desription-style mt-5">
                      <div class="cotainer">
                        <div class="row">
                          <div class="col-md-6 col-12 col-sm-6 description-para-left">
                            <p class="description-para-left-p">
                              {description_props}
                            </p>
                          </div>
                          <div class="col-md-6 col-12 col-sm-6 description-para-right">
                            {/* <p class="description-para-right-p">
                            Total Bidding &nbsp;
                            <span class="description-para-right-p-span">609</span>
                          </p> */}
                          </div>
                          <div class="col-md-12 description-padding-style">
                            <p
                              class="description-padding-style-p"
                              style={{ minHeight: "65px" }}
                            >
                              {key.description
                                ? key.description.slice(0, 100) +
                                  (key.description.length > 50 ? "..." : "")
                                : null}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12 col-lg-12 col-12 third-row-main">
                      <div class="cotainer">
                        <div class="row">
                          <div class="col-md-12 col-12 col-sm-12 col-12 col-lg-4 row">
                            {/* <div class="col-md-6 col-6 col-sm-6 col-3 name-icon text-center">
                            <span class="fa fa-user fa-2x"></span>
                            <p>Name</p>
                          </div> */}
                            {/* <div class="col-md-6 col-6 col-sm-6 col-3 eye-icon text-center">
                            <span class="fa fa-eye fa-2x eye-icon-span"></span>
                            <p class="eye-icon-span-p">120</p>
                          </div> */}
                          </div>
                          <div class="col-md-12 col-sm-12 col-lg-8 col-12 row ml-1 four-style pt-0">
                            <div class="col-md-3 col-sm-3 col-6 budget-text">
                              <p class="budget-text-p">{budget_props} </p>
                            </div>
                            <div class="col-md-3 col-sm-3 col-6 budget-amout">
                              <p class="budget-amout-p">{key.price}</p>
                            </div>
                            <div class="col-md-3 col-sm-3 col-6 duration-txt">
                              <p class="duration-txt-p">{duration_props} </p>
                            </div>
                            <div class="col-md-3 col-sm-3 col-6 duration-tym">
                              <p class="duration-tym-p">
                                <Moment fromNow>{key.completionTime}</Moment>
                                {/* <TimeAgo date={key.completionTime} /> */}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="col-md-12 col-lg-3 col-12 col-sm-12 col-12 make-bid justify-content-center d-flex mb-3"
                      style={{ float: "right" }}
                    >
                      {linked}
                      {/* <Link
                        className="make-bid-btnn mt-3"
                        to={`/bid_detail/${key.id}/${result.title}`}
                        style={{
                          paddingTop: "10px",
                          marginTop: " 0px",
                          textDecoration: "none",
                          float: "right"
                        }}
                      >
                        Details
                      </Link> */}
                    </div>
                  </div>
                </div>
              </div>
              // End of bid item
            );
          });

          this.setState({
            result: result,
            projectBids: projectBids,
            custId: result.customer.id
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
    fetch(
      `${baseUrl}api/services/app/Uploads/GetUploadByProject?ProjectId=` + id,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + this.state.token
        }
      }
    )
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          console.log(json.result);
          let ProjectDocuments = json.result.map(function(key) {
            // start of bid item

            return (
              // <a
              //   key={key.id}
              //   target="blank"
              //   href={`https://shsbackend.azurewebsites.net/${a}`}
              // >
              <button
                className="document-btn-p-btnn"
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={this.showImage(key.url)}
              >
                {key.title}
              </button>
              // </a>
            );
          }, this);

          {
            console.log("Entention = " + this.state.ext);
          }

          this.setState({
            ProjectDocuments: ProjectDocuments
          });
        }
      })
      .catch(error => {
        console.error(error);
      });

    //Make Call To Add View API

    //https://shsbackend.azurewebsites.net/api/services/app/Project/AddProjectViewsAsync?ProjectId=183

    fetch(
      `${baseUrl}api/services/app/Project/AddProjectViewsAsync?ProjectId=` + id,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",

          Authorization: "Bearer " + this.state.token
        }
      }
    )
      .then(res => res.json())
      .then(json => {
        if (json.success) {
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  backButton = () => {
    this.props.history.push("/mydashboard");
  };
  gotoCustomerProfile = () => {
    this.props.history.push(`/customerDetails/${this.state.custId}`);
  };
  render() {
    const show =
      this.state.result.length === 0 ? (
        <Loader />
      ) : (
        <div class="container">
          <div class="col-md-12 col-12 d-flex justify-content-center">
            <div class="col-md-9 main-style-back">
              <div class="col-md-12 col-12 top-blue-back">
                <div class="row">
                  <div class="col-md-6 col-4 top-blue-para-left">
                    <p class="top-blue-para-left-p">
                      {this.state.result.title}
                    </p>
                  </div>
                  <div class="col-md-6 col-8 top-blue-para-right">
                    {/* <p class="top-blue-para-right-p">
                      POSTED &nbsp;
                      <span class="top-blue-para-right-p-span">
                        API
                        
                      </span>
                    </p> */}
                  </div>
                </div>
              </div>
              <div class="col-md-12 col-12 col-sm-12 desription-style">
                <div class="cotainer">
                  <div class="row">
                    <div class="col-md-6 col-12 col-sm-6 description-para-left">
                      <p class="description-para-left-p">
                        {this.props.t("description")}
                      </p>
                    </div>
                    <div class="col-md-6 col-12 col-sm-6 description-para-right"></div>
                    <div class="col-md-12 description-padding-style">
                      <p class="description-padding-style-p">
                        {this.state.result.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12 col-lg-12 col-12 third-row-main">
                <div class="cotainer">
                  <div class="row">
                    <div class="col-md-12 col-sm-12 col-lg-12 col-12 row  four-style">
                      <div class="col-md-3 col-sm-3 col-6 budget-text">
                        <p class="budget-text-p" style={{ float: "left" }}>
                          {this.props.t("start_date")} :{" "}
                          {/* <Moment>{}</Moment> */}
                        </p>
                      </div>
                      <div class="col-md-3 col-sm-3 col-6 budget-amout">
                        <p class="budget-amout-p">
                          {moment(this.state.result.startDate).format(
                            "DD-MM-YYYY "
                          )}
                        </p>
                      </div>
                      <div class="col-md-3 col-sm-3 col-6 duration-txt">
                        <p class="duration-txt-p" style={{ float: "left" }}>
                          {this.props.t("end_date")}
                        </p>
                      </div>
                      <div class="col-md-3 col-sm-3 col-6 duration-tym">
                        <p class="duration-tym-p">
                          {moment(this.state.result.startDate).format(
                            "DD-MM-YYYY "
                          )}
                          {/* <Moment fromNow>
                            {this.state.result.completionTime}
                          </Moment>{" "} */}
                        </p>
                      </div>
                    </div>
                    <div class="col-md-12 col-sm-12 col-lg-12 col-12 row  ">
                      <div class="col-md-3 col-sm-3 col-6 budget-text">
                        <p
                          class="budget-text-p text-left"
                          style={{ float: "left" }}
                        >
                          {this.props.t("length")}
                        </p>
                      </div>
                      <div class="col-md-3 col-sm-3 col-6 budget-amout">
                        <p class="budget-amout-p">
                          {this.state.result.lengths}
                        </p>
                      </div>
                      <div class="col-md-3 col-sm-3 col-6 duration-txt">
                        <p
                          class="duration-txt-p"
                          style={{ float: "left", paddingLeft: "8px" }}
                        >
                          {this.props.t("bodies")}
                        </p>
                      </div>
                      <div class="col-md-3 col-sm-3 col-6 duration-tym">
                        <p class="duration-tym-p">
                          {this.state.result.bodies}
                          {/* <Moment fromNow>
                            {this.state.result.completionTime}
                          </Moment>{" "} */}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12 col-12 row ">
                <div class="col-md-12 col-lg-12   col-sm-12 col-12">
                  <div class="col-md-12 col-12 row document-btn-p">
                    <div class="col-md-12 col-sm-12 col-12 col-lg-2">
                      <p class="document-btn-p-p">
                        {this.props.t("dobidscuments")}
                      </p>
                    </div>
                    <div class="col-md-12 col-sm-12 col-12 col-lg-10">
                      {this.state.ProjectDocuments}
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12 col-12 mb-5 d-flex justify-content-center">
                {/* <button onClick={() =>this.backButton()}>Back</button>                  */}
                <div class=" row ">
                  <div class="col-md-12 col-12 mt-5 attach">
                    <button
                      onClick={() => this.backButton()}
                      className="button"
                      style={{ width: "200px" }}
                    >
                      {this.props.t("back")}
                    </button>
                  </div>
                </div>
                <div class=" row ">
                  <div class="col-md-12 col-12 mt-5 attach">
                    <button
                      onClick={() => this.gotoCustomerProfile()}
                      className="button"
                      style={{ width: "200px" }}
                    >
                      {this.props.t("customer_profile")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-12 mb-5">
            <div className="">
              <h1 className="text-center pt-3 pb-3">
                <span style={{ borderBottom: "3px solid #0891f9" }}>
                  {this.props.t("bids")}
                </span>
              </h1>
              {this.state.projectBids}
            </div>
          </div>
        </div>
      );
    const showFile = () => {
      if (
        this.state.ext === "docx" ||
        this.state.ext === "pdf" ||
        this.state.ext === "ppt" ||
        this.state.ext === "pptx" ||
        this.state.ext === "ppsx" ||
        this.state.ext === "pptm" ||
        this.state.ext === "doc" ||
        this.state.ext === "docm" ||
        this.state.ext === "docx"
      ) {
        return (
          <a target="blank" href={`${baseUrl}${this.state.d_file}`}>
            <button className="btn btn-primary">Download</button>
          </a>
        );
      } else if (
        this.state.ext === "png" ||
        this.state.ext === "jpg" ||
        this.state.ext === "jpeg" ||
        this.state.ext === "gif" ||
        this.state.ext === "PNG" ||
        this.state.ext === "JPG" ||
        this.state.ext === "JPEG" ||
        this.state.ext === "GIF"
      ) {
        return (
          <img
            style={{ width: "100%", height: "100%" }}
            src={`${baseUrl}${this.state.d_file}`}
            alt="file"
          />
        );
      }
    };
    return (
      <div className="dashboard-bg">
        <Chat />
        <Header />
        <Sidebar />

        {show}

        {/* model kh */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {this.props.t("display_file")}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">{showFile()}</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  {this.props.t("close")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withNamespaces()(index);
