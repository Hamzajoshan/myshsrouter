import React, { Component } from "react";
// import { useHistory } from "react-router-dom";

// import './Projects/node_modules/@trendmicro/react-sidenav/dist/react-sidenav.css';
import "./index.css";
import Sidebar from "../Sidebar";
import TimeAgo from "react-timeago";
import Loader from "./../../loader";
import Header from "../Header";

import cookie from "react-cookies";
// the hoc
import { withNamespaces } from "react-i18next";
import Moment from "react-moment";
import { Link, Redirect } from "react-router-dom";
import SweetAlert from "@sweetalert/with-react";
import { baseUrl } from "./../../../config.js";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: true,
      scrollTop: 0,
      token: "",
      bidId: "",
      projectTitle: "",
      result: "",
      isOpen: false,
      reason: "",
      submitReasonDisabled: false,
      reasonLoading: false,
      closeDisabled: false,
      reasonError: false,
      errormessage: false,
      success: false,
      ProjectDocuments: "",
      projectId: "",
      linkToBack: ""
    };
    this.handleSubmitReason = this.handleSubmitReason.bind(this);
    this.handleReason = this.handleReason.bind(this);
    this.handleAcceptBid = this.handleAcceptBid.bind(this);
    this.goBack = this.goBack.bind(this);
    this.showImage = this.showImage.bind(this);

    // this.resultsDiv = React.createRef();
    // this.bignav = this.bignav.bind(this)
    // this.mynav = this.mynav.bind(this)
    // this.logout = this.logout.bind(this)

    // this.resultsDiv = React.createRef();
  }
  goBack = e => {
    this.props.history.push("/project_details/" + this.state.projectId);
  };
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
  componentWillMount() {
    if (cookie.load("Token")) {
      let token = cookie.load("Token");
      this.setState({ token: token });
    }

    this.setState({
      bidId: this.props.match.params.bid_id,
      projectTitle: this.props.match.params.project_title,
      projectId: this.props.match.params.project_id
    });
  }
  //accept bid
  handleAcceptBid = e => {
    e.preventDefault();

    // i have to make the call for accept bid now so
    //make api call
    const { bidId } = this.state;
    fetch(
      `${baseUrl}api/services/app/BidAppservice/AcceptBidAsync?BidId=` + bidId,
      {
        method: "post",
        redirect: "follow",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + this.state.token
        }
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
              errormessage: responseData.error.details
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
              submitReasonDisabled: false,

              errormessage: false,
              success: responseData.success,
              reasonLoading: false,
              closeDisabled: false
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
                <p style={{ fontSize: "20px" }}>Bid Accepted successfully.</p>
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
  };

  handleSubmitReason = e => {
    e.preventDefault();
    const { reason, bidId } = this.state;

    this.setState({
      submitReasonDisabled: true,
      closeDisabled: true,
      reasonLoading: true
    });
    if (reason === "") {
      this.setState({
        submitReasonDisabled: false,
        closeDisabled: false,
        reasonLoading: false,
        reasonError: true
      });
    } else if (reason.length < 25) {
      this.setState({
        submitReasonDisabled: false,
        closeDisabled: false,
        reasonLoading: false,
        reasonError: true
      });
    } else {
      //here we make api call now
      //https://shsbackend.azurewebsites.net/api/services/app/BidAppservice/CancelBidAsync
      fetch(
        `${baseUrl}api/services/app/BidAppservice/CancelBidAsync?BidId=${bidId}&RejectReason=${reason}`,
        {
          method: "post",
          redirect: "follow",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + this.state.token
          }
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
                errormessage: responseData.error.details
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
                submitReasonDisabled: false,

                errormessage: false,
                success: responseData.success,
                reasonLoading: false,
                closeDisabled: false
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
                  <p style={{ fontSize: "20px" }}>Bid Rejected successfully.</p>
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
      //end of api call
    }
  };
  handleReason = e => {
    this.setState({
      reason: e.target.value
    });
  };
  componentDidMount() {
    const { projectTitle, projectId } = this.state;
    let linkToBack = `project_details/${projectId}`;
    this.setState({
      linkToBack: linkToBack
    });

    let id = this.state.bidId;
    fetch(
      `${baseUrl}api/services/app/BidAppservice/GetBidDetailById?BidId=` + id,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + this.state.token
        }
      }
    )
      //  new
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          let result = json.result;
          this.setState({
            result: result
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
    //Make API Call To get Bid documents

    fetch(`${baseUrl}api/services/app/Uploads/GetUploadByBid?BidId=` + id, {
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
          // console.log(result);
          let ProjectDocuments = json.result.map(function(key) {
            // start of bid item

            return (
              <button
                className="document-btn-p-btnn"
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={this.showImage(key.url)}
              >
                {key.title}
              </button>
            );
          }, this);

          this.setState({
            ProjectDocuments: ProjectDocuments
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    // if (!cookie.load('Token')) {
    //   // return <LoginPanel onSuccess={this.onLogin} />
    //   this.props.history.push('/Login');
    // }

    // kh code start
    var d = new Date();
    var nT = "";
    if (this.state.result !== "") {
      var s1 = this.state.result.creationTime;
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
      nT = j + t + k;
    }

    // kh code end
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
    const show =
      this.state.result.length === 0 ? (
        <Loader />
      ) : (
        <div class="container">
          <div class="col-md-12 mb-4 d-flex justify-content-center">
            <div class="col-md-9 main-style-back">
              <div class="col-md-12 col-12 top-blue-back">
                <div class="row">
                  <div class="col-md-6 col-4 top-blue-para-left">
                    <p class="top-blue-para-left-p">
                      {this.state.projectTitle}
                    </p>
                  </div>
                  <div class="col-md-6 col-8 top-blue-para-right">
                    <p class="top-blue-para-right-p">
                      {this.props.t("posted")} &nbsp;
                      <span class="top-blue-para-right-p-span">
                        <TimeAgo date={nT} />
                      </span>
                    </p>
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
                    <div class="col-md-6 col-12 col-sm-6 description-para-right">
                      <p class="description-para-right-p">
                        {this.props.t("validity")} &nbsp;
                        <span class="description-para-right-p-span">
                          {this.state.result.offerValidity}
                        </span>
                      </p>
                    </div>
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
                    <div class="col-md-12 col-12 col-sm-12 col-12 col-lg-4 row">
                      <div class="col-md-6 col-6 col-sm-6 col-3 name-icon text-center">
                        <span class="fa fa-user fa-2x"></span>
                        <p>{this.state.result.serviceProvider.user.fullName}</p>
                      </div>
                      <div class="col-md-6 col-6 col-sm-6 col-3 eye-icon text-center"></div>
                    </div>
                    <div class="col-md-12 col-sm-12 col-lg-8 col-12 row ml-1 four-style">
                      <div class="col-md-3 col-sm-3 col-6 budget-text">
                        <p class="budget-text-p">{this.props.t("budget")}</p>
                      </div>
                      <div class="col-md-3 col-sm-3 col-6 budget-amout">
                        <p class="budget-amout-p">
                          {this.state.result.price} $
                        </p>
                      </div>
                      <div class="col-md-3 col-sm-3 col-6 duration-txt">
                        <p class="duration-txt-p">{this.props.t("duration")}</p>
                      </div>
                      <div class="col-md-3 col-sm-3 col-6 duration-tym">
                        <p class="duration-tym-p">
                          <Moment fromNow>
                            {this.state.result.completionTime}
                          </Moment>{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12 col-12 row mb-5">
                <div class="col-md-12 col-lg-8   col-sm-12 col-12">
                  <div class="col-md-12 col-12 row document-btn-p">
                    <div class="col-md-12 col-sm-12 col-12 col-lg-3">
                      <p class="document-btn-p-p">
                        {this.props.t("documents")}
                      </p>
                    </div>
                    <div class="col-md-12 col-sm-12 col-12 col-lg-9">
                      {this.state.ProjectDocuments}
                    </div>
                  </div>
                  {/* <div class="col-md-12 row tag-btn-p">
                    <div class="col-md-12 col-sm-12 col-12 col-lg-3">
                      <p class="tag-btn-p-p">{this.props.t("tags")}</p>
                    </div>
                    <div class="col-md-12 col-sm-12 col-12 col-lg-9">
                      <button class="tag-btn-p-btnn">TAG 1</button>
                      <button class="tag-btn-p-btnn">TAG 1</button>
                      <button class="tag-btn-p-btnn">TAG 1</button>
                    </div>
                  </div> */}
                </div>
                {/* <div class="col-md-12 col-lg-4 col-12 col-sm-12 col-12 make-bid justify-content-center d-flex mt-2">
                  <button
                    onClick={this.handleAcceptBid}
                    className="make-bid-btnn"
                    style={{
                      marginTop: " 0px",
                      textDecoration: "none",
                      float: "right"
                      // paddingTop: "-20px"
                    }}
                  >
                    {this.props.t("accept")}
                  </button>
                  <Link
                    className="make-bid-btnn ml-2"
                    to="#"
                    data-toggle="modal"
                    data-target="#largeModal"
                    style={{
                      paddingTop: "13px",
                      marginTop: " 0px",
                      textDecoration: "none",
                      float: "right",
                      backgroundColor: "#ff0000"
                    }}
                  >
                    {this.props.t("reject")}
                  </Link>
                </div> */}

                <div class="col-md-12 col-lg-12 col-12 col-sm-12 col-12 make-bid justify-content-center d-flex mt-4">
                  <button
                    className="make-bid-btnn ml-2"
                    onClick={this.goBack}
                    style={{
                      marginTop: " 0px",
                      textDecoration: "none",
                      float: "right",
                      backgroundColor: "rgb(8, 145, 249)"
                    }}
                  >
                    {this.props.t("back")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    return (
      <div className="dashboard-bg">
        <Header />

        <Sidebar />
        {/* {this.state.result} */}
        {show}
        <div
          class="modal fade"
          id="largeModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="basicModal"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h6 class="modal-title text-center" id="myModalLabel">
                  {this.props.t("type_reason")}
                </h6>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  disabled={this.state.closeDisabled}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <h1 class="text-center" style={{ color: "#000000" }}>
                  {this.props.t("type_reason")}
                </h1>
                <form
                  action=""
                  method="post"
                  onSubmit={this.handleSubmitReason}
                >
                  {this.state.reasonError ? (
                    <p className="text-danger">{this.props.t("min_words")}</p>
                  ) : null}

                  <textarea
                    name=""
                    id=""
                    onChange={this.handleReason}
                    value={this.state.reason}
                    cols="30"
                    class="col-md-12"
                    style={{ borderRadius: "20px", minHeight: "140px" }}
                    placeholder="Why you reject this offer ? "
                  ></textarea>
                  <button
                    style={{
                      float: "right",
                      height: "40px",
                      borderRadius: "5px",
                      backgroundColor: "transparent",
                      border: "none"
                    }}
                    disabled={this.state.submitReasonDisabled}
                  >
                    {this.state.reasonLoading ? (
                      <div style={{ color: "lightgrey" }}>
                        {this.props.t("wait")}...
                      </div>
                    ) : (
                      <span> {this.props.t("submit")} &nbsp;</span>
                    )}
                  </button>
                  {this.state.success ? <Redirect to="/dashboard" /> : null}
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                  disabled={this.state.closeDisabled}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
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
