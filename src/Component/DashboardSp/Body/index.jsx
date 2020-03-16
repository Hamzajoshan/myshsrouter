import React, { Component } from "react";
import { Link } from "react-router-dom";
import Loader from "./../../loader";
import TimeAgo from "react-timeago";
import { baseUrl } from "./../../../config.js";
// import i18n from "./../../../i18n";
// import '../Projects/node_modules/@trendmicro/react-sidenav/dist/react-sidenav.css';
import "./index.css";

import cookie from "react-cookies";
// the hoc
import { withNamespaces } from "react-i18next";
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: true,
      scrollTop: 0,
      result: "",
      isDataAvailable: false,
      activePage: 15,
      items: [],
      currentPage: 1,
      itemsPerPage: 6,
      token: ""
    };
    // this.resultsDiv = React.createRef();
    // this.bignav = this.bignav.bind(this)
    // this.mynav = this.mynav.bind(this)
    // this.logout = this.logout.bind(this)

    // this.resultsDiv = React.createRef();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    this.setState({ currentPage: Number(event.target.id) });
  }
  componentWillMount() {
    let getmane = this.props.t("home");

    if (cookie.load("Token")) {
      let token = cookie.load("Token");
      this.setState({ token: token });
    }
  }
  componentDidMount() {
    fetch(`${baseUrl}api/services/app/Project/GetApprovedProjects`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.token
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          // let parentResult = json.result;
          // let pid = json.result[0].id;
          // console.log('pid: '+ pid)
          // console.log(json.result);
        
          let MorInfo = this.props.t("more_info");
          let MakeBid = this.props.t("make_bid");

          if (json.result.length === 0) {
            this.setState({
              isDataAvailable: true
            });
          }
          let result = json.result.map(function(key) {
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

            return (
              // <section  className=''>
              // <div className="container body-container mt-5 d-flex justify-content-center">
              //    <div className=" row col-md-12 " style={{marginBottom: '30px'}}>
              // <div key= {key.id}  className="col-md-4" style={{marginBottom: '30px'}}>
              // <div  className="col-md-4" style={{marginBottom: '30px'}}>
              <div
                key={key.id}
                className="card "
                style={{
                  width: "250px",
                  minHeight: "175px",
                  boxShadow: "0px 8px 8px 5px lightgrey"
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    paddingTop: "8px",
                    paddingRight: "20px",
                    paddingLeft: "20px"
                  }}
                >
                  <div>
                    <span
                      className="icon"
                      style={{
                        color: "#2699fb",
                        float: "left",
                        fontSize: "14px"
                      }}
                    >
                      <i className="fa fa-eye" />
                    </span>

                    {/* <span
                      className="icon"
                      style={{
                        color: "#2699fb",
                        float: "right",
                        fontSize: "14px"
                      }}
                    >
                      <i className="fa fa-share-alt" />
                    </span> */}
                  </div>
                </div>
                <div
                  style={{
                    display: "inline-block",
                    paddingRight: "10px",
                    paddingLeft: "20px",
                    top: 0
                  }}
                >
                  <div>
                    <span
                      className="icon"
                      style={{ float: "left", color: "#000", fontSize: "14px" }}
                    >
                      {key.views}
                    </span>

                    {/* <span
                      className="icon"
                      style={{
                        float: "right",
                        color: "#000",
                        fontSize: "14px"
                      }}
                    >
                      Share
                    </span> */}
                  </div>
                </div>

                <div
                  className="card-body"
                  style={{ top: "-25px", marginTop: "-18px" }}
                >
                  <p
                    className="card-title"
                    style={{
                      color: "#2699fb",
                      fontSize: "14px",
                      marginBottom: "3px"
                    }}
                  >
                    <b>{key.title}</b>
                  </p>

                  <p
                    className="card-text"
                    style={{
                      marginRight: "10px",
                      color: "#000",
                      fontSize: "14px"
                    }}
                  >
                    {/* JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for ... */}

                    {key.description
                      ? key.description.slice(0, 100) +
                        (key.description.length > 50 ? "..." : "")
                      : null}
                    {/*  console.log(key.description)
                        fn(key.description, 10);"/bidding"
                      } */}
                  </p>
                  {/* Button */}
                  <Link
                    to={`/project_details/${key.id}`}
                    className="btn btn-primary btn-sm"
                    style={{
                      borderRadius: "30px",

                      bottom: "27px",
                      fontSize: "14px"
                    }}
                  >
                    {MorInfo}
                  </Link>

                  <Link
                    to={`/makebid/${key.id}`}
                    className="btn btn-primary btn-sm"
                    style={{
                      borderRadius: "30px",
                      float: "right",
                      bottom: "27px",
                      right: "18px",
                      fontSize: "14px"
                    }}
                  >
                    {MakeBid}
                  </Link>
                </div>
                <div
                  style={{
                    height: "30px",
                    width: "100%",
                    backgroundColor: "#2699fb",
                    color: "#fff",
                    paddingLeft: "12px"
                  }}
                >
                  <small>
                    {/* 3 sec ago */}
                    <TimeAgo date={nT} />
                  </small>
                </div>
              </div>
            );
          });

          this.setState({
            result,
            items: result
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  render() {
    const { items, currentPage, itemsPerPage, isDataAvailable } = this.state;
    // letitems = this.state.result;

    const indexOfLastTodo = currentPage * itemsPerPage;
    const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
    const currentitems = items.slice(indexOfFirstTodo, indexOfLastTodo);

    const renderitems = currentitems.map((todo, index) => {
      return (
        <div key={index} className="col-md-4" style={{ marginBottom: "45px" }}>
          {todo}
        </div>
      );
    });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <a
          style={{ color: "#fff" }}
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </a>
      );
    });
    const show =
      items.length === 0 ? (
        isDataAvailable === false ? (
          <Loader />
        ) : (
          <h1>{this.props.t("zero_projects")}</h1>
        )
      ) : (
        <div>
          <section className="">
            <div className="container body-container mt-5 d-flex justify-content-center">
              <div
                className=" row col-md-12  mt-5"
                style={{ marginBottom: "19px", marginTop: "-27px" }}
              >
                {renderitems}
              </div>
            </div>
          </section>
          <section></section>
          <div class="col-md-12 d-flex justify-content-center mb-3">
            <div
              className="pagination"
              // style={{ position: "absolute", right: "10px" }}
            >
              {renderPageNumbers}
            </div>
          </div>
        </div>
      );

    return (
      <div>
        <div class="col-md-12">
          <div
            style={{
              float: "right",
              // position: "absolute",
              marginRight: "20%"
            }}
          ></div>
        </div>
        {show}
      </div>
    );
  }
}

export default withNamespaces()(index);
