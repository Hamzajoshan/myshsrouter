import React, { Component } from "react";
import $ from "jquery";
// import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import "./index.css";
import { Link } from "react-router-dom";
import Footer from "../../../Footer";
import { connect } from "react-redux";
import Navbar from "../navbar";
// import ok from '../../../images/images-info/ok.png';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { throwStatement } from '@babel/types';
// import { threadId } from 'worker_threads';
// import ProjectType from "../ProjectType";
// import moment from 'moment';
// import cookie from "react-cookies";
import SweetAlert from "@sweetalert/with-react";
import { baseUrl } from "./../../../../config.js";
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: true,
      scrollTop: 0,
      startDate: "",
      endDate: "",
      description: "",
      length: "",
      bodies: "",
      startDateError: false,
      endDateError: false,
      endDateShowError: "",
      startDateShowError: "",
      loading: false,
      errormessage: false,
      success: false,
      submitDisabled: false,
      bodiesError: false,
      descriptionError: false,
      lengthError: false,
      file: "",
      fileError: "",
      // currentDate:moment().format("L"),
      dateContext: new Date(),
      projectInfo: false,
      //project type

      projectTite: "",
      projectTitleError: false,
      projectType: "",
      projectTypedata: "",
      result: [],
      pid: "",
      projectInfo: true,
      parentInfo: false,
      //project technical info
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
    this.startDateHandle = this.startDateHandle.bind(this);
    this.addNewProject = this.addNewProject.bind(this);
    this.endDateHandle = this.endDateHandle.bind(this);
    this.descriptionHandle = this.descriptionHandle.bind(this);
    this.lengthHandle = this.lengthHandle.bind(this);
    this.bodiesHandle = this.bodiesHandle.bind(this);
    this.fileHandler = this.fileHandler.bind(this);
    this.backToBasicInfo = this.backToBasicInfo.bind(this);
    this.projectTitleHandle = this.projectTitleHandle.bind(this);
    this.submitProjectType = this.submitProjectType.bind(this);
    this.projectTypeHandle = this.projectTypeHandle.bind(this);
    this.contractTypeHandle = this.contractTypeHandle.bind(this);
    this.subCategoryHandle = this.subCategoryHandle.bind(this);

    this.attach = this.attach.bind(this);

    // this.resultsDiv = React.createRef();
  }
  //Finish the project
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
  projectTitleHandle = e => {
    this.setState({
      projectTite: e.target.value,
      projectTitleError: false
    });
  };
  projectTypeHandle = e => {
    this.setState({
      projectType: e.target.value,
      projectTypeError: false
    });
    console.log("target: " + this.state.projectType);

    let inputArray = this.state.result;
    console.log("inputArray: " + inputArray);

    let data = e.target.value;
    const result = inputArray.find(({ typeName }) => typeName === data);
    let pid = result.id;
    console.log("parent ID: " + pid);
    this.setState({ pid });

    // this.updateParectSP(parentId)
  };

  submitProjectType = e => {
    e.preventDefault();
    this.setState({
      loading: false,
      submitDisabled: false
    });
    console.log("working");
    // console.log(this.state.startDate)

    // if (this.state.projectTite === '') {
    //   // console.log('date '+this.state.startDate)

    //   $(this.refs['title']).focus();
    //   // $('.focus-border').attr('className','.focus-border1');
    //   this.setState({
    //     projectTitleError: !this.state.projectTitleError,
    //     loading: false,
    //     submitDisabled: false
    //   })
    // }
    // else {
    this.setState({
      success: true
    });
    const { pid } = this.state;
    //Make API call

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

    $(".add_new_project_w1").css("display", "none");
    $(".project_type_w2").css("display", "none");
    $(".project_techical_info_w3").css("display", "block");
    // alert("data entered successfully!!!!")
  };

  backToBasicInfo = e => {
    e.preventDefault();
    $(".add_new_project_w1").css("display", "block");
    $(".project_type_w2").css("display", "none");
    $(".project_techical_info_w3").css("display", "none");
    // $(".contractType").css("display", "none");
  };
  // componentWillMount(){
  //   this.attach();
  // }

  startDateHandle = e => {
    this.setState({
      startDate: e.target.value,
      startDateError: false
    });
  };
  endDateHandle = e => {
    this.setState({
      endDate: e.target.value,
      endDateError: false
    });
    $(this.refs["endDate"]).css({
      border: 0,
      padding: "4px 0",
      "border-bottom": "1px solid #fff",
      "background-color": "transparent"
    });
  };
  descriptionHandle = e => {
    this.setState({
      description: e.target.value,
      descriptionError: false
    });
  };
  lengthHandle = e => {
    this.setState({
      length: e.target.value,
      lengthError: false
    });
  };
  bodiesHandle = e => {
    this.setState({
      bodies: e.target.value,
      bodiesError: false
    });
  };
  fileHandler = e => {
    this.setState({
      file: e.target.value,
      fileError: false
    });
  };

  addNewProject = e => {
    e.preventDefault();

    this.setState({
      loading: true,
      submitDisabled: true
    });
    // console.log(this.state.startDate)
    var q = new Date();
    var m = ("0" + (q.getMonth() + 1)).slice(-2);
    // var d = ('0' +( q.getDay()-1)).slice(-2);
    var d = ("0" + (q.getDay() + 1)).slice(-2);

    var y = q.getFullYear();

    var currentDate = y + "-" + m + "-" + d;
    console.log(d);
    console.log("start: " + this.state.startDate + " current: " + currentDate);
    //  if (this.state.startDate === '') {
    //   // console.log('date '+this.state.startDate)

    //     $(this.refs['startDate']).focus();
    //     // $('.focus-border').attr('className','.focus-border1');
    //     this.setState({
    //       startDateError: !this.state.startDateError,
    //       startDateShowError: "Start date required",
    //       loading: false,
    //       submitDisabled: false
    //     })
    //   }

    if (this.state.startDate < currentDate) {
      console.log("date " + this.state.startDate);

      $(this.refs["startDate"]).focus();
      $(this.refs["startDate"]).css({
        border: 0,
        width: "100%",
        padding: "4px 0",
        "border-bottom": "2px solid rgb(250, 4, 4)",
        "background-color": "transparent"
      });
      this.setState({
        startDateError: !this.state.startDateError,
        startDateShowError:
          "Start date must be greater than or equal to current date.",
        loading: false,
        submitDisabled: false
      });
    }
    // else if (this.state.endDate === "") {
    //   $(this.refs['endDate']).focus();
    //   // $('.focus-border').attr('className','.focus-border1');
    //   this.setState({
    //     endDateError: !this.state.endDateError,
    //     loading: false,
    //     endDateShowError:  "End date  required",
    //     submitDisabled: false
    //   })
    // }
    else if (this.state.startDate > this.state.endDate) {
      console.log("End date should be greater than start date");
      $(this.refs["endDate"]).focus();
      $(this.refs["endDate"]).css({
        border: 0,
        width: "100%",
        padding: "4px 0",
        "border-bottom": "2px solid rgb(250, 4, 4)",
        "background-color": "transparent"
      });
      this.setState({
        endDateError: !this.state.endDateError,
        loading: false,
        submitDisabled: false,
        endDateShowError: "End date must be greater than start date"
      });
    }
    // else if (this.state.description === "") {
    //   $(this.refs['description']).focus();
    //   $(this.refs['des-border']).css(
    //     {border: 0,
    //       width: "100%",
    //        padding: '4px 0',
    //         'border-bottom': '2px solid rgb(250, 4, 4)',
    //          'background-color': 'transparent'
    //     }
    //   );
    //    this.setState({
    //     descriptionError: !this.state.descriptionError,
    //     loading: false,
    //     submitDisabled: false
    //   })
    // }
    // else if (this.state.length === "") {
    //   $(this.refs['length']).focus();
    //   // $('.focus-border').attr('className','.focus-border1');
    //   this.setState({
    //     lengthError: !this.state.lengthError,
    //     loading: false,
    //     submitDisabled: false
    //   })
    // }
    // else if (this.state.bodies === "") {
    //   $(this.refs['bodies']).focus();
    //   // $('.focus-border').attr('className','.focus-border1');
    //   this.setState({
    //     bodiesError: !this.state.bodiesError,
    //     loading: false,
    //     submitDisabled: false
    //   })
    // }
    // else if (this.state.file === "") {
    //   $(this.refs['file']).focus();
    //   // $('.focus-border').attr('className','.focus-border1');
    //   this.setState({
    //     fileError: !this.state.fileError,
    //     loading: false,
    //     submitDisabled: false
    //   })
    // }
    else {
      this.setState({
        loading: false,
        submitDisabled: false
      });
      //Make api call
      fetch(
        `${baseUrl}api/services/app/ProjectTypes/GetParentProjectTypes`
      )
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            console.log(json.result);
            let result = json.result;
            let pid = json.result[0].id;
            console.log("pid: " + pid);
            let projectTypedata = result.map(function(key) {
              return (
                <option key={key.id} value={key.typeName}>
                  {key.typeName}
                </option>
              );
            });
            this.setState({
              projectTypedata,
              result,
              pid
            });
          }
        })
        .catch(error => {
          console.error(error);
        });
      $(".add_new_project_w1").css("display", "none");
      $(".project_techical_info_w3").css("display", "none");
      $(".project_type_w2").css("display", "block");
      console.log("target: " + this.state.projectType);

      this.setState({
        success: true,
        projectInfo: !this.state.projectInfo
      });
      // alert("data entered successfully!!!!")
    }
  };
  attach = e => {
    e.preventDefault();
    $(".attach").click(function() {
      $("#fileInput").click();
    });
  };
  currentDay = () => {
    return this.state.dateContext.getDay();
  };
  render() {
    // var q = new Date();
    // var m = ("0" + (q.getMonth() + 1)).slice(-2);
    // var d = ("0" + (q.getDay() + 1)).slice(-2);
    // console.log(d);

    // var y = q.getFullYear();

    // var currentDate = y + "-" + m + "-" + d;
    // this.currentDay();
    // // console.log(typeof this.state.startDate)

    // //  let mydate=new Date('2011-04-11');
    // // // console.log(mydate);
    // // // let currentDate = new Date();
    // //  console.log('current date: '+)
    // //  if(this.state.startDate> currentDate){
    // //  console.log(currentDate);
    // //  }

    return (
      <div>
        <div className="bg-pt" id="basic-info">
          <section className="sign-body pt-5">
            <Navbar />

            {/* <div className="col-md-12 justify-content-center d-flex align-items-center">
       <div className="col-md-10 container row justify-content-center " >

         <div className="bubble-pt previous-pt">
           <LinK to='/'><i></i></LinK>
         </div>

         <div className="bubble-separator-pt"></div>
         <div className="bubble-pt previous1-pt">
             
         </div>

         <div className="bubble-separator2-pt"></div>
         <div className="bubble3-pt previous2-pt">

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

            <div className="col-md-12 pb-5 add_new_project_w1" id="basic-info">
              <h2>ADD NEW PROJECT</h2>

              <div className="col-md-12  d-flex justify-content-center">
                <form onSubmit={this.addNewProject}>
                  <div className="col-md-12 ">
                    <div className="container row">
                      <div className="col-md-5 input-effect mt-5">
                        <label>START DATE</label>

                        <input
                          id="input"
                          className="effect-16"
                          title={this.state.startDateShowError}
                          ref="startDate"
                          autoFocus={true}
                          type="date"
                          onChange={this.startDateHandle}
                          value={this.state.startdate}
                          required
                        />
                        {/* <span className="focus-border"></span><br/> */}
                        {/* {this.state.startDate ? <p className="text-danger">{this.state.startDateShowError}</p> : null} */}
                      </div>
                      <div className="col-md-2 mt-5"></div>
                      <div className="col-md-5 input-effect mt-5">
                        <label>END DATE</label>
                        <input
                          id="input"
                          className="effect-16"
                          title={this.state.endDateShowError}
                          ref="endDate"
                          type="date"
                          onChange={this.endDateHandle}
                          value={this.state.enddate}
                          required
                        />
                        {/* <span ref='border' className="focus-border"></span> */}
                        {/* {this.state.endDateError ? <p className="text-danger">{this.state.endDateShowError}</p> : null} */}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 ">
                    <div className="container row">
                      <div className="col-md-12 input-effect mt-5">
                        <label>DESCRIPTION</label>
                        <input
                          autocomplete="off"
                          id="input"
                          title="start date"
                          className="effect-16"
                          ref="description"
                          type="text"
                          onChange={this.descriptionHandle}
                          value={this.state.description}
                          required
                        />
                        <span
                          ref="des-border"
                          className="focus-border description"
                        ></span>
                        {/* {this.state.descriptionError ? <p className="text-danger">Project description required.</p> : null} */}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="container row">
                      <div className="col-md-5 input-effect mt-5">
                        <label>LENGTH</label>
                        <input
                          autocomplete="off"
                          id="input"
                          className="effect-16"
                          ref="length"
                          type="text"
                          onChange={this.lengthHandle}
                          value={this.state.length}
                          required
                        />
                        <span className="focus-border"></span>
                        {this.state.lengthError ? (
                          <p className="text-danger">
                            Project Length required.
                          </p>
                        ) : null}
                      </div>
                      <div className="col-md-2 mt-5"></div>

                      <div className="col-md-5 input-effect mt-5">
                        <label>BODIES</label>
                        <input
                          autocomplete="off"
                          id="input"
                          className="effect-16"
                          ref="bodies"
                          type="text"
                          onChange={this.bodiesHandle}
                          value={this.state.bodies}
                          required
                        />
                        <span className="focus-border"></span>
                        {this.state.bodiesError ? (
                          <p className="text-danger">
                            Project bodies required.
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-12 mb-5">
                    <div className="container row">
                      <div className="col-md-6 col-12 mt-5">
                        {/* <label className='attach'  for="fileInput" onClick={this.attach}>ATTACH &nbsp;<i className="fa fa-paperclip"></i></label> */}
                        {/* <label for="fileInput" > */}
                        <button
                          ref="file"
                          id="btn-basic-info"
                          className="attach"
                          for="fileInput"
                          onClick={this.attach}
                        >
                          ATTACH &nbsp;<i className="fa fa-paperclip"></i>
                        </button>
                        {/* </label> */}
                        <input
                          type="file"
                          style={{ display: "none" }}
                          id="fileInput"
                          onChange={this.fileHandler}
                          value={this.state.file}
                        />
                        {/* // {this.state.fileError ? <p className="text-danger">Attachment required.</p> : null} */}
                      </div>

                      <div className="col-md-6 col-12  mt-5">
                        <button
                          id="btn-basic-info"
                          type="submit"
                          disabled={this.state.submitDisabled}
                        >
                          {this.state.loading ? (
                            <div style={{ color: "lightgrey" }}>Wait...</div>
                          ) : (
                            <span>
                              {" "}
                              NEXT &nbsp;
                              <i className="fal fa fa-long-arrow-right"></i>
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {/* </div> */}
            <div
              className="col-md-12 pb-5 project_type_w2"
              id="basic-info"
              style={{ display: "none" }}
            >
              <h2>SELECT PROJECT TYPE</h2>

              <div className="col-md-12  d-flex justify-content-center">
                <form onSubmit={this.submitProjectType}>
                  <div className="col-md-12 ">
                    <div className="container row">
                      <div className="col-md-6 input-effect mt-5">
                        <label>PROJECT TITLE</label>
                        <input
                          autocomplete="off"
                          id="input"
                          className="effect-16"
                          ref="title"
                          type="text"
                          onChange={this.projectTitleHandle}
                          value={this.state.projectTite}
                          required
                        />
                        <span className="focus-border"></span>
                        {/* {this.state.projectTitleError ? <p className="text-danger">Project title required.</p> : null} */}
                      </div>

                      <div className="col-md-6 input-effect focus-border mt-5">
                        <label>PROJECT TYPE</label>
                        <div>
                          <select
                            name=""
                            ref="type"
                            className="effect-16"
                            style={{ borderBottom: "1px solid #2caae7" }}
                            onChange={this.projectTypeHandle}
                            value={this.state.projectType}
                            required
                          >
                            {this.state.projectTypedata}
                            {/* <option value="sgfsg" className="">Select</option>
                            <option value="sfgf" className="">Select1</option>

                            <option value="fsgfg" className="">Select2</option> */}
                          </select>
                          {this.state.projectTypeError ? (
                            <p className="text-danger">
                              Project type required.
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12 col-12 mb-5">
                    <div className="container row">
                      <div className="col-md-6 col-6 mt-5">
                        <button
                          id="btn-basic-info"
                          onClick={this.backToBasicInfo}
                        >
                          <span>
                            {" "}
                            <i className="fal fa fa-long-arrow-left"></i>&nbsp;
                            Back
                          </span>
                        </button>
                      </div>

                      <div className="col-md-6 col-6  mt-5 row">
                        {/* <Link to='/projectTechnicalInfo'> */}
                        <button
                          id="btn-project-type"
                          disabled={this.state.submitDisabled}
                        >
                          NEXT &nbsp;
                          <i className="fal fa fa-long-arrow-right"></i>
                        </button>

                        {/* </Link> */}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Techincal Info */}
            <div
              className="col-md-12 pb-5 project_techical_info_w3"
              id="basic-info"
              style={{ display: "none" }}
            >
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
                      <div className="col-md-6 col-6 mt-5">
                        <button
                          id="btn-basic-info"
                          onClick={this.backToBasicInfo}
                        >
                          <span>
                            {" "}
                            <i className="fal fa fa-long-arrow-left"></i>&nbsp;
                            Back
                          </span>
                        </button>
                      </div>

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
                        {this.state.success ? <Link to="/dashboard" /> : null}
                        {/* </Link> */}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    Token: state.places.Token,
    userId: state.places.userId
  };
};
export default connect(mapStateToProps)(index);
