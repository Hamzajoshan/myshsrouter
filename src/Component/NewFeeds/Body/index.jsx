import React, { Component } from "react";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";
import { baseUrl } from "./../../../config.js";

// import '../Projects/node_modules/@trendmicro/react-sidenav/dist/react-sidenav.css';
import "./index.css";
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
      itemsPerPage: 9
    };
    // this.resultsDiv = React.createRef();
    // this.bignav = this.bignav.bind(this)
    // this.mynav = this.mynav.bind(this)
    // thsis.handlePageChange = this.handlePageChange.bind(this)
    this.handleClick = this.handleClick.bind(this);
    // this.resultsDiv = React.createRef();
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  componentWillMount() {
    fetch(
      `${baseUrl}api/services/app/Project/GetAllProjectAsync`
    )
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          console.log("result" + json.result[0].id);

          // let parentResult = json.result;
          // let pid = json.result[0].id;
          // console.log('pid: '+ pid)
          let result = json.result.map(function(key) {
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
                  height: "146px",
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
                >
                  <div>
                    <span
                      className="icon"
                      style={{
                        color: "#2699fb",
                        float: "left",
                        fontSize: "12px"
                      }}
                    >
                      <i className="fa fa-eye" />
                    </span>
                    <span
                      className="icon"
                      style={{
                        color: "#2699fb",
                        float: "right",
                        fontSize: "12px"
                      }}
                    >
                      <i className="fa fa-share-alt" />
                    </span>
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
                      style={{ float: "left", color: "#000", fontSize: "9px" }}
                    >
                      123
                    </span>
                    <span
                      className="icon"
                      style={{ float: "right", color: "#000", fontSize: "9px" }}
                    >
                      Share
                    </span>
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
                      fontSize: "12px",
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
                      fontSize: "9px"
                    }}
                  >
                    {/* JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for ... */}

                    {key.description
                      ? key.description.slice(0, 50) +
                        (key.description.length > 150 ? "..." : "")
                      : null}
                    {/*  console.log(key.description)
                        fn(key.description, 10);
                      } */}
                  </p>
                  {/* Button */}
                  <Link
                    to="/projectInfo"
                    className="btn btn-primary btn-sm"
                    style={{
                      borderRadius: "30px",
                      position: "absolute",
                      bottom: "27px",
                      fontSize: "9px"
                    }}
                  >
                    More Info
                  </Link>

                  <Link
                    to="/makebid"
                    className="btn btn-primary btn-sm"
                    style={{
                      borderRadius: "30px",
                      position: "absolute",
                      bottom: "27px",
                      right: "18px",
                      fontSize: "9px"
                    }}
                  >
                    Make Bid
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
                    <TimeAgo date={key.startDate} />
                  </small>
                </div>
              </div>

              // </div>
              //   <div className="card " key= {key.id} style={{width:'300px', height:'150px',boxShadow: '8px 8px 5px grey'}}>

              //     <div style={{display: 'inline-block', paddingTop: '8px', paddingRight: '20px', paddingLeft: '20px'}}>
              //       <div >
              //         <span className="icon" style={{color: '#2699fb', float: 'left',fontSize: '10px'}}><i className="fa fa-eye" /></span>
              //         <span className="icon" style={{color: '#2699fb', float: 'right',fontSize: '10px'}}><i className="fa fa-share-alt" /></span>
              //       </div>
              //     </div>
              //     <div style={{display: 'inline-block', paddingRight: '10px', paddingLeft: '20px', top: 0}}>
              //       <div>
              //         <span className="icon" style={{float: 'left',color:"#000" ,fontSize: '8px'}}>123</span>
              //         <span className="icon" style={{float: 'right',color:"#000",fontSize: '8px' }}>Share</span>
              //       </div>
              //     </div>

              //     <div className="card-body"      style={{height: '155px',top:'-25px',marginTop: '-18px'}}>

              //       <p className="card-title" style={{color: '#2699fb',fontSize:'12px'}}><b>{key.title}</b></p>

              //       <p className="card-text" style={{marginRight: '10px',color:"#000",fontSize: '9px'}}>
              //         {key.description?
              //          key.description.slice(0, 150) + (key.description.length > 150 ? "..." : ""):
              //          null
              //         }

              //          </p>

              //       <Link to="/bidding" className="btn btn-primary btn-sm" style={{borderRadius:'30px',position: 'absolute',fontSize: '9px', bottom: '12px'}}>More Info</Link>

              //       <Link to="/makebid" className="btn btn-primary btn-sm" style={{borderRadius:'30px',position: 'absolute', bottom: '12px',fontSize: '9px', right: '18px'}}>Make Bid</Link>
              //     </div>
              //     <div style={{height: '30px', width: '100%', backgroundColor: '#2699fb', color: '#fff', paddingLeft: '12px'}}><small>

              //     <TimeAgo date={key.startDate}/>

              //       </small></div>

              // </div>
              // </div>
              // </div>
              // </section>
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
    const { items, currentPage, itemsPerPage } = this.state;
    // letitems = this.state.result;
    const indexOfLastTodo = currentPage * itemsPerPage;
    const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
    const currentitems = items.slice(indexOfFirstTodo, indexOfLastTodo);

    const renderitems = currentitems.map((todo, index) => {
      return (
        <div key={index} className="col-md-4" style={{ marginBottom: "10px" }}>
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
        <a key={number}  id={number} onClick={this.handleClick}>
          {number}
        </a>
      );
    });

    return (
      <div>
        <section className="">
          <div className="container body-container mt-5 d-flex justify-content-center">
            <div
              className=" row col-md-12 "
              style={{ marginBottom: "30px", marginTop: "-27px" }}
            >
              {renderitems}
            </div>
          </div>
        </section>
        <section></section>

        <div
          className="pagination"
          style={{ position: "absolute", right: "10px", bottom: "2px" }}
        >
          {renderPageNumbers}
        </div>
      </div>
    );
  }
}

export default index;
