import React, { Component } from "react";
// import cookie from "react-cookies";
// import SweetAlert from "@sweetalert/with-react";
// import { Link } from "react-router-dom";
// import Loader from "./../../loader";
// import TimeAgo from "react-timeago";
// import Moment from "react-moment";
import { withNamespaces } from "react-i18next";
// import { Link } from "react-router-dom";
import poke from "../../../images/poke.jpg";
import "./index.css";
// import $ from "jquery";
// import decode from "jwt-decode";
import { baseUrl } from "./../../../config.js";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: "",
      token: "",
      myProjects: "",
      userId: "",
      result: ""
    };

    // this.resultsDiv = React.createRef();
  }

  componentDidMount() {
    this.setState({
      userId: this.props.match.params.custId
    });

    fetch(
      `${baseUrl}api/services/app/User/Get?Id=` + this.props.match.params.custId
    )
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          //  console.log(json.result)
          let user = json.result;

          this.setState({
            currentUser: user
          });
        }
      })
      .catch(error => {
        // console.error(error);
      });
  }

  render() {
    return (
      <div className="MainDiv">
        <section>
          <div className="container pt-4 pb-4">
            <div className="col-md-12">
              <h3 className="sp-profile-top-h3">
                <span className="sp-profile-inner-bottom-border">
                  <span className="sp-profile-top-inner-h3">
                    {this.props.t("your_profile")} {"   "}
                  </span>
                </span>
              </h3>
            </div>
          </div>
        </section>
        <section className="sp-profile-top-bgcolor-section">
          <div className="container">
            <div className="col-md-12 col-sm-12 col-lg-12 col-12 row">
              <div className="col-md-8 col-12 col-sm-12 row">
                <div className="col-md-4 col-3 col-sm-3 col-lg-3 col-xl-2">
                  <img src={poke} alt="" className="sp-profile-image-top" />
                  <span className="sp-profile-image-top-inner-circle"></span>
                </div>
                <div className="col-md-8 col-sm-9 col-12">
                  <h3 className="sp-profile-top-name">
                    {this.state.currentUser.fullName}
                  </h3>
                  <p className="sp-profile-top-location">
                    <i className="fa fa-envelope fa-2x pr-2">
                      {" "}
                      {this.state.currentUser.emailAddress}
                    </i>
                  </p>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="sp-profile-labels">
                  <span className="sp-profile-labels-inner-span">100%</span>
                </div>
                <div className="progress sp-profile-progress-bar-outer">
                  <div
                    className="progress-bar sp-profile-progress-bar-outer"
                    role="progressbar"
                    aria-valuenow="60"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: " 100%" }}
                  ></div>
                </div>
                <div className="col-md-12">
                  <p className="text-center">Job Success</p>
                </div>

                <div className="col-md-12">
                  <div className="col-md-12">
                    <div className="d-flex justify-content-center">
                      <fieldset className="rating">
                        <input
                          type="radio"
                          id="star5"
                          name="rating"
                          value="5"
                        />
                        <label
                          className="full"
                          for="star5"
                          title="Awesome - 5 stars"
                        ></label>
                        <input
                          type="radio"
                          id="star4half"
                          name="rating"
                          value="4 and a half"
                        />
                        <label
                          className="half"
                          for="star4half"
                          title="Pretty good - 4.5 stars"
                        ></label>
                        <input
                          type="radio"
                          id="star4"
                          name="rating"
                          value="4"
                        />
                        <label
                          className="full"
                          for="star4"
                          title="Pretty good - 4 stars"
                        ></label>
                        <input
                          type="radio"
                          id="star3half"
                          name="rating"
                          value="3 and a half"
                        />
                        <label
                          className="half"
                          for="star3half"
                          title="Meh - 3.5 stars"
                        ></label>
                        <input
                          type="radio"
                          id="star3"
                          name="rating"
                          value="3"
                        />
                        <label
                          className="half"
                          for="star3half"
                          title="Meh - 3.5 stars"
                        ></label>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <h3 className="sp-profile-name-type-h3">Customer</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Odit, at doloribus officiis placeat dignissimos amet error
                  possimus explicabo, numquam excepturi optio nihil in quis quae
                  maxime, itaque aliquam! Quasi, accusamus!Lorem ipsum dolor sit
                  amet, consectetur adipisicing elit. Odit, at doloribus
                  officiis placeat dignissimos amet error possimus explicabo,
                  numquam excepturi optio nihil in quis quae maxime, itaque
                  aliquam! Quasi, accusamus!
                </p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <div className="col-md-12">
              <div className="col-md-12 pt-5">
                <h3>
                  <span className="sp-profile-work-history-h3">
                    {this.props.t("Work_History_and_Feedback")}
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </section>
        <section className="mb-5">
          <div className="container"></div>
        </section>
      </div>
    );
  }
}

export default withNamespaces()(index);
