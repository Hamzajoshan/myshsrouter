import React, { Component } from "react";
// import './Projects/node_modules/@trendmicro/react-sidenav/dist/react-sidenav.css';
import "./index.css";
import Sidebar from "../Sidebar";
// import Content from "../Body";
import Header from "../Header";
import { connect } from "react-redux";
import cookie from "react-cookies";
import TimeAgo from "react-timeago";
import Moment from "react-moment";
import Chat from "../Chat";
import { Link } from "react-router-dom";
import Loader from "./../../loader";
import { baseUrl } from "./../../../config.js";
// import moment from "moment";
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
      isDataAvalaible: false,
      items: []
    };
    // this.resultsDiv = React.createRef();
    // this.bignav = this.bignav.bind(this)
    // this.mynav = this.mynav.bind(this)
    // this.logout = this.logout.bind(this)

    // this.resultsDiv = React.createRef();
  }
  componentWillMount() {
    if (cookie.load("Token")) {
      let token = cookie.load("Token");
      this.setState({ token: token });
    }
    this.setState({
      bidId: this.props.match.params.projectId,
      projectTitle: this.props.match.params.project_title
    });
  }
  componentDidMount() {
    let id = this.state.bidId;
    fetch(
      `${baseUrl}api/services/app/BidAppservice/GetNewBidByProject?ProjectId=` +
        id,
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
          // console.log("result" + json.result[0].id);

          // let parentResult = json.result;
          // let pid = json.result[0].id;
          // console.log('pid: '+ pid)
          console.log(json.result.length);
          if (json.result.length === 0) {
            this.setState({
              isDataAvalaible: true
            });
          }
          let result = json.result.map(function(key) {
            // start of bid item
            return (
              <div class="container">
                <div class="col-md-12 d-flex justify-content-center">
                  <div class="col-md-9 main-style-back mt-3">
                    <div class="col-md-12 col-12 top-blue-back">
                      <div class="row">
                        <div class="col-md-6 col-4 top-blue-para-left">
                          <p class="top-blue-para-left-p">
                            {this.state.projectTitle}
                          </p>
                        </div>
                        <div class="col-md-6 col-8 top-blue-para-right">
                          <p class="top-blue-para-right-p">
                            POSTED &nbsp;
                            <span class="top-blue-para-right-p-span">
                              <TimeAgo date={key.creationTime} />
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12 col-12 col-sm-12 desription-style mt-5">
                      <div class="cotainer">
                        <div class="row">
                          <div class="col-md-6 col-12 col-sm-6 description-para-left">
                            <p class="description-para-left-p">Description</p>
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
                              <p class="budget-text-p">BUDGET :</p>
                            </div>
                            <div class="col-md-3 col-sm-3 col-6 budget-amout">
                              <p class="budget-amout-p">{key.price}</p>
                            </div>
                            <div class="col-md-3 col-sm-3 col-6 duration-txt">
                              <p class="duration-txt-p">Duration :</p>
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
                      <Link
                        className="make-bid-btnn"
                        to={`/bid_detail/${key.id}/${this.state.projectTitle}`}
                        style={{
                          paddingTop: "10px",
                          marginTop: " 0px",
                          textDecoration: "none",
                          float: "right"
                        }}
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              // End of bid item
            );
          }, this);
          this.setState({
            result,
            items: json.result
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
    const { isDataAvalaible, items } = this.state;
    console.log(items);
    const show =
      items.length === 0 ? (
        isDataAvalaible === false ? (
          <Loader />
        ) : (
          <h5 className="text-center pt-3">No Bids Availabe</h5>
        )
      ) : (
        this.state.result
      );

    return (
      <div className="dashboard-bg">
        <Chat />
        <Header />
        {show}
        <Sidebar />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    userId: state.places.userId
  };
};
export default connect(mapStateToProps)(index);
