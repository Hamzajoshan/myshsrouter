import React, { Component } from "react";
import { Link } from "react-router-dom";
import Loader from "./../../../loader";
import TimeAgo from "react-timeago";
// import '../Projects/node_modules/@trendmicro/react-sidenav/dist/react-sidenav.css';
import cookie from "react-cookies";
// the hoc
import { withNamespaces } from "react-i18next";
import "./index.css";
import decode from "jwt-decode";
import { baseUrl } from "./../../../../config.js";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: true,
      scrollTop: 0,
      result: "",
      activePage: 15,
      items: [],
      currentPage: 1,
      isDataAvailable: false,
      itemsPerPage: 9,
      token: "",
      userId: "",
      userSub: ""
    };
    // this.resultsDiv = React.createRef();
    // this.bignav = this.bignav.bind(this)
    // this.mynav = this.mynav.bind(this)
    // this.logout = this.logout.bind(this)

    // this.resultsDiv = React.createRef();

    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }
  componentWillMount() {
    if (cookie.load("Token")) {
      let token = cookie.load("Token");
      this.setState({ token: token });
      let token1 = decode(cookie.load("Token"));
      this.setState({ userId: token1.ReffID, userSub: token1.sub });
    }
  }
  componentDidMount() {
    fetch(
      `${baseUrl}api/services/app/Project/GetCancelProjectBySPId?SpId=` +
        this.state.userId,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.state.token
        }
      }
    )
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          // console.log("result" + json.result[0].id);
          if (json.result.length === 0) {
            this.setState({
              isDataAvailable: true
            });
          }
          // let parentResult = json.result;
          // let pid = json.result[0].id;
          // console.log('pid: '+ pid)

          let addReview = this.props.t("add_review");
          let spId = this.state.userSub;
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
                  minHeight: "157px",
                  boxShadow: "8px 8px 5px grey"
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    paddingTop: "8px",
                    paddingRight: "20px",
                    paddingLeft: "20px"
                  }}
                ></div>
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
                  style={{ height: "155px", top: "-25px", marginTop: "-18px" }}
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
                </div>
                <Link
                  to={`/givereviews/${spId}/${key.customer.user.id}/${key.id}`}
                  className="btn btn-primary btn-sm"
                  style={{
                    borderRadius: "30px",
                    position: "relative",
                    bottom: "3px",
                    width: "130px",
                    marginLeft: "20px",
                    fontSize: "14px"
                  }}
                >
                  {addReview}
                </Link>
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
          <h1>No Project Available</h1>
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
