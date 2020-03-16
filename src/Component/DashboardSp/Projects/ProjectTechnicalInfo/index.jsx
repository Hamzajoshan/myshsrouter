import React, { Component } from "react";
import $ from "jquery";
// import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import "./index.css";
import Footer from "../../../Footer";
// import ok from "../../../../images/images-info/ok.png";
// import DatePicker from "react-datepicker";
import SweetAlert from "@sweetalert/with-react";
import { Redirect } from "react-router-dom";
import Navbar from "../navbar";
import { baseUrl } from "./../../../../config.js";
// import "react-datepicker/dist/react-datepicker.css";
// import { throwStatement } from '@babel/types';
// import { threadId } from 'worker_threads';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      errormessage: false,
      success: false,
      submitDisabled: false,
      contractType: "",
      subCategory: "",
      subChildCategory: "",
      subChil1dCategory: "",
      subChildCategoryError: "",
      subChil1dCategoryError: "",
      contractTypeError: false,
      subCategoryError: false,
      tecnicalInfo: "",
      child: "",
      subChild: "",
      subChild1: "",
      parentId: "",
      result: "",
      p2id: "",
      p3result: "",
      p3id: "",
      p4result: "",
      p4id: "",
      p5result: "",
      p5id: "",
      projectTechnicalInfo: true
    };
    // this.resultsDiv = React.createRef();
    this.contractTypeHandle = this.contractTypeHandle.bind(this);
    this.subCategoryHandle = this.subCategoryHandle.bind(this);
    this.finish = this.finish.bind(this);
    // this.descriptionHandle = this.descriptionHandle.bind(this);
    // this.lengthHandle = this.lengthHandle.bind(this);
    // this.bodiesHandle = this.bodiesHandle.bind(this);

    // this.resultsDiv = React.createRef();
  }
  componentWillMount() {
    const {
      startDate,
      endDate,
      length,
      bodies,
      description,
      projectTite,
      projectType,
      pid
    } = this.props;
    // console.log(startDate + endDate + length + bodies + description +projectTite + projectType, pid)
    // const { startDate, endDate, length, bodies, description } = this.props;
    if (
      startDate === "" ||
      endDate === "" ||
      length === "" ||
      bodies === "" ||
      description === "" ||
      projectTite === "" ||
      projectType === "" ||
      pid === ""
    ) {
      this.props.history.push("/addnew");
    }

    fetch(
      `${baseUrl}api/services/app/ProjectTypes/GetPtChildByParentId?ParentId=` +
        pid
    )
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          console.log(json.result);
          let result = json.result;
          let p2id = json.result[0].id;
          let tecnicalInfo = result.map(function(key) {
            return (
              <option key={key.id} value={key.typeName}>
                {key.typeName}
              </option>
            );
          });
          this.setState({
            tecnicalInfo,
            result,
            p2id
          });
          console.log("parent2 ID: " + p2id);

          this.subCategory(p2id);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  contractTypeHandle = e => {
    $(".p3").css("display", "none");
    $(".p4").css("display", "none");
    this.setState({
      contractType: e.target.value,
      contractTypeError: false
    });
    let inputArray = this.state.result;
    let data = e.target.value;
    const result = inputArray.find(({ typeName }) => typeName === data);
    let p2id = result.id;
    console.log("parent2 ID: " + p2id);
    this.setState({ p2id });
    this.subCategory(p2id);

    // this.updateParectSP(parentId)
  };
  subCategoryHandle = e => {
    $(".p3").css("display", "none");
    $(".p4").css("display", "none");

    this.setState({
      subCategory: e.target.value,
      subCategoryError: false,
      p4id: ""
    });
    let inputArray = this.state.p3result;
    let data = e.target.value;
    const result = inputArray.find(({ typeName }) => typeName === data);
    let p3id = result.id;
    console.log("parent2 ID: " + p3id);
    this.setState({ p3id });
    this.subCategory1(p3id);
  };
  subChildHandle = e => {
    $(".p4").css("display", "none");

    this.setState({
      subChildCategory: e.target.value,
      subChildCategoryError: false,
      p5id: ""
    });
    let inputArray = this.state.p4result;
    let data = e.target.value;
    const result = inputArray.find(({ typeName }) => typeName === data);
    let p4id = result.id;
    console.log("parent2 ID: " + p4id);
    this.setState({ p4id });
    this.subCategory2(p4id);
  };
  subChild1Handle = e => {
    this.setState({
      subChil1dCategory: e.target.value,
      subChild1CategoryError: false
    });
    let inputArray = this.state.p5result;
    let data = e.target.value;
    const result = inputArray.find(({ typeName }) => typeName === data);
    let p5id = result.id;
    console.log("parent2 ID: " + p5id);
    this.setState({ p5id });
  };

  finish = e => {
    e.preventDefault();
    const {
      startDate,
      endDate,
      length,
      bodies,
      description,
      projectTite,

      pid,
      userId
    } = this.props;
    const { p2id, p3id, p4id, p5id } = this.state;
    this.setState({
      loading: true,
      submitDisabled: true
    });
    // console.log(this.state.startDate)

    //  if (this.state.contractType === '') {
    //   // console.log('date '+this.state.startDate)

    //     $(this.refs['contractType']).focus();
    //     // $('.focus-border').attr('className','.focus-border1');
    //     this.setState({
    //       contractTypeError: !this.state.contractTypeError,
    //       loading: false,
    //       submitDisabled: false
    //     })
    //   }
    //   else if (this.state.subCategory === "") {
    //     $(this.refs['subCategory']).focus();
    //     // $('.focus-border').attr('className','.focus-border1');
    //     this.setState({
    //       subCategoryError: !this.state.subCategoryError,
    //       loading: false,
    //       submitDisabled: false
    //     })
    //   }
    // else if (this.state.subChildCategory === "") {
    //   $(this.refs['subChild']).focus();
    //   // $('.focus-border').attr('className','.focus-border1');
    //   this.setState({
    //     subChildCategoryError: !this.state.subChildCategoryError,
    //     loading: false,
    //     submitDisabled: false
    //   })
    // }
    // else if (this.state.subChild1Category === "") {
    //   $(this.refs['subChild1']).focus();
    //   // $('.focus-border').attr('className','.focus-border1');
    //   this.setState({
    //     subChild1CategoryError: !this.state.subChild1CategoryError,
    //     loading: false,
    //     submitDisabled: false
    //   })
    // }

    if (p4id === "") {
      fetch(
        `${baseUrl}api/services/app/Project/CreateProjectAsync`,
        {
          method: "post",
          redirect: "follow",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          mode: "cors",

          body: JSON.stringify({
            title: projectTite,
            description: description,
            startDate: startDate,
            endDate: endDate,
            lengths: length,
            bodies: bodies,
            customerId: userId,
            projectTypes: [pid, p2id, p3id]
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
                  <p style={{ fontSize: "20px" }}>{this.state.errormessage}</p>
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
                  <p style={{ fontSize: "20px" }}>Signed up successfully.</p>
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
    } else if (p5id === "") {
      fetch(
        `${baseUrl}api/services/app/Project/CreateProjectAsync`,
        {
          method: "post",
          redirect: "follow",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          mode: "cors",

          body: JSON.stringify({
            title: projectTite,
            description: description,
            startDate: startDate,
            endDate: endDate,
            lengths: length,
            bodies: bodies,
            customerId: userId,
            projectTypes: [pid, p2id, p3id, p4id]
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
                  <p style={{ fontSize: "20px" }}>{this.state.errormessage}</p>
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
              // return <Link to='/dashboard'/>
              // this.props.history.push('/dashboard');

              SweetAlert(
                <div style={{ color: "green" }}>
                  <h1>
                    {" "}
                    <strong>Success!</strong>
                  </h1>
                  <p style={{ fontSize: "20px" }}>Signed up successfully.</p>
                </div>
              );
              // this.props.history.push('/dashboard');

              //  return <Link to='/dashboard'/>
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
    } else {
      fetch(
        `${baseUrl}api/services/app/Project/CreateProjectAsync`,
        {
          method: "post",
          redirect: "follow",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          mode: "cors",

          body: JSON.stringify({
            title: projectTite,
            description: description,
            startDate: startDate,
            endDate: endDate,
            lengths: length,
            bodies: bodies,
            customerId: userId,
            projectTypes: [pid, p2id, p3id, p4id, p5id]
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
                  <p style={{ fontSize: "20px" }}>{this.state.errormessage}</p>
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

              // this.props.history.push('/Login');
              // SweetAlert("Are you sure you want to log out?", {
              //   buttons: {
              //     catch: {
              //       text: "Ok",
              //     },
              //   },
              // })
              // .then((value) => {
              //   switch (value) {

              //     case "catch":
              //       {

              // // this.props.history.push('/dashboard');

              //       //  <Link to='/dashboard'/>

              //       }
              //       break;
              //   }
              // });

              // this.props.history.push('/dashboard');

              SweetAlert(
                <div style={{ color: "green" }}>
                  <h1>
                    {" "}
                    <strong>Success!</strong>
                  </h1>
                  <p style={{ fontSize: "20px" }}>Signed up successfully.</p>
                </div>
              );

              //  return <Link to='/dashboard'/>
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
    // }
  };
  subCategory = id => {
    // const p2id = this.state.p2id;
    fetch(
      `${baseUrl}api/services/app/ProjectTypes/GetPtChildByParentId?ParentId=` +
        id
    )
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          //  console.log(json.result)
          let p3result = json.result;
          let p3id = json.result[0].id;
          let child = p3result.map(function(key) {
            return (
              <option key={key.id} value={key.typeName}>
                {key.typeName}
              </option>
            );
          });
          this.setState({
            child,
            p3result,
            p3id
          });
          this.subCategory1(p3id);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  subCategory1 = id => {
    fetch(
      `${baseUrl}api/services/app/ProjectTypes/GetPtChildByParentId?ParentId=` +
        id
    )
      .then(res => res.json())
      .then(json => {
        if (json.result[0]) {
          $(".p3").css("display", "block");
          console.log(json.result);
          let p4result = json.result;
          let p4id = json.result[0].id;
          let subChild = p4result.map(function(key) {
            return (
              <option key={key.id} value={key.typeName}>
                {key.typeName}
              </option>
            );
          });
          this.setState({
            subChild,
            p4id,
            p4result
          });
          this.subCategory2(p4id);
        }
        // else{
        //   $('.p3').css('display','none')
        // }
      })
      .catch(error => {
        console.error(error);
      });
  };
  subCategory2 = id => {
    fetch(
      `${baseUrl}api/services/app/ProjectTypes/GetPtChildByParentId?ParentId=` +
        id
    )
      .then(res => res.json())
      .then(json => {
        if (json.result[0]) {
          // if (json.success) {
          $(".p4").css("display", "block");

          //  console.log(json.resut)
          let p5result = json.result;
          let p5id = json.result[0].id;
          let subChild1 = p5result.map(function(key) {
            return (
              <option key={key.id} value={key.typeName}>
                {key.typeName}
              </option>
            );
          });
          this.setState({
            subChild1,
            p5id,
            p5result
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  render() {
    console.log("finish state: " + this.state.success);
    return (
      <div>
        <div className="bg-pt" id="technical-info">
          <section className="sign-body pt-5">
            <Navbar projectTechnicalInfo={true} projectInfo={true} />

            {/* <div className="col-md-12 justify-content-center d-flex align-items-center">
       <div className="col-md-10 container row justify-content-center " >

         <div className="bubble-pt previous-pt">
         <img src={ok} className="wiz3" alt="" />
         </div>

         <div className="bubble-separator-pt"></div>
         <div className="bubble-pt previous1-pt">
         <img src={ok} className="wiz3" alt="" />
         </div>

         <div className="bubble-separator2-pt"></div>
         <div className="bubble3-pt previous2-pt">
         {this.state.success?<img src={ok} className="wiz3" alt="" />: <i></i>}
         </div>


       </div>

     </div>
     <div className="col-md-12 col-12 col-sm-12 col-lg-12  col-lg-12 col-xl-9 container justify-content-center d-flex align-items-center" >
       <div className="col-md-10 col-12 col-sm-6 col-lg-5 col-lg-4 col-xl-6 container row justify-content-center " style={{marginBottom: "40px"}}>

         <div className="bubble1-pt text col-md-2 col-2 col-sm-4 col-lg-4 col-lg-4">
           <p>Basic Info</p>
         </div>

         
         <div className="bubble4-pt text1 col-md-2 col-2 col-sm-4 col-lg-4 col-lg-4">
           <p>Project Info</p>
         </div>
         <div className="bubble2-pt text2 col-md-2 col-2 col-sm-4 col-lg-4 col-lg-4">
           <p>Technical Info</p>
         </div>





       </div>

     </div> */}

            <div className="col-md-12 pb-5" id="basic-info">
              <h2>Technical Info</h2>

              <div className="col-md-12  d-flex justify-content-center">
                <form onSubmit={this.finish}>
                  <div className="col-md-12 ">
                    <div className="container row d-flex justify-content-center">
                      <div className="col-md-6 input-effect focus-border mt-5">
                        <select
                          name=""
                          id=""
                          ref="contractType"
                          className="effect-16"
                          style={{ borderBottom: "1px solid #2caae7" }}
                          onChange={this.contractTypeHandle}
                          value={this.state.contractType}
                          required
                        >
                          {/* <option value="" className="">CONTRACTOR TYPE</option> */}
                          {this.state.tecnicalInfo}
                        </select>
                        {this.state.contractTypeError ? (
                          <p className="text-danger">Contract type required.</p>
                        ) : null}
                      </div>

                      <div className="col-md-6 input-effect focus-border mt-5">
                        <select
                          name=""
                          id=""
                          ref="subCategory"
                          className="effect-16"
                          style={{ borderBottom: "1px solid #2caae7" }}
                          onChange={this.subCategoryHandle}
                          value={this.state.subCategory}
                        >
                          {this.state.child}
                          {/* <option value="" className="">SUB CATEGORY</option>
                   <option value="" className="">SUB CATEGORY</option>
                   <option value="" className="">SUB CATEGORY</option> */}
                        </select>

                        {this.state.subCategoryError ? (
                          <p className="text-danger">Sub Category required.</p>
                        ) : null}
                      </div>
                      <div
                        className="col-md-6 input-effect focus-border mt-5 p3"
                        style={{ display: "none" }}
                      >
                        <select
                          name=""
                          id=""
                          ref="subChild"
                          className="effect-16"
                          style={{ borderBottom: "1px solid #2caae7" }}
                          onChange={this.subChildHandle}
                          value={this.state.subChildCategory}
                        >
                          {/* <option value="" className="">CONTRACTOR TYPE</option> */}
                          {this.state.subChild}
                        </select>
                        {this.state.subChildCategoryError ? (
                          <p className="text-danger">Contract type required.</p>
                        ) : null}
                      </div>

                      <div
                        className="col-md-6 input-effect focus-border mt-5 p4"
                        style={{ display: "none" }}
                      >
                        <select
                          name=""
                          id=""
                          ref="subChild1"
                          className="effect-16"
                          style={{ borderBottom: "1px solid #2caae7" }}
                          onChange={this.subChild1Handle}
                          value={this.state.subChil1dCategory}
                        >
                          {this.state.subChild1}
                          {/* <option value="" className="">SUB CATEGORY</option>
                   <option value="" className="">SUB CATEGORY</option>
                   <option value="" className="">SUB CATEGORY</option> */}
                        </select>

                        {this.state.subChild1CategoryError ? (
                          <p className="text-danger">Sub Category required.</p>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12 col-12 mb-5">
                    <div className="container row">
                      <div className="col-md-6 col-6 mt-5"></div>

                      <div className="col-md-6 col-6  mt-5">
                        {/* <Link to='/dashboard'>  */}
                        {this.state.loading ? (
                          <button
                            id="btn-technical-info"
                            style={{ color: "lightgrey" }}
                            disabled={this.state.submitDisabled}
                          >
                            Wait...
                          </button>
                        ) : (
                          <button
                            id="btn-technical-info"
                            disabled={this.state.submitDisabled}
                          >
                            FINISH &nbsp;
                          </button>
                        )}
                        {this.state.success ? (
                          <Redirect to="/dashboard" />
                        ) : null}
                        {/* </Link> */}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {/* </div> */}
          </section>
        </div>
        <Footer />
      </div>
    );
  }
}

export default index;
