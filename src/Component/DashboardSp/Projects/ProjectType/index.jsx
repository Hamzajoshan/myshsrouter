import React, { Component } from "react";
// import $ from "jquery";
import "./index.css";
import Footer from "../../../Footer";
import { Link } from "react-router-dom";
// import ok from "../../../../images/images-info/ok.png";
// import DatePicker from "react-datepicker";
import { connect } from "react-redux";
import Navbar from "../navbar";
import ProjectTechnicalInfo from "../ProjectTechnicalInfo";
import { baseUrl } from "./../../../../config.js";
// import { tupleTypeAnnotation } from "@babel/types";
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
      projectTite: "",
      projectTitleError: false,
      projectType: "",
      projectTypedata: "",
      result: [],
      pid: "",
      projectInfo: true,
      parentInfo: false
    };
    // this.resultsDiv = React.createRef();
    this.projectTitleHandle = this.projectTitleHandle.bind(this);
    this.submitProjectType = this.submitProjectType.bind(this);
    this.projectTypeHandle = this.projectTypeHandle.bind(this);
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
      parentInfo
    } = this.props;
    console.log(
      "values: " + startDate + endDate + length + bodies + description
    );
    this.setState({ parentInfo });

    // console.log(startDate + endDate + length + bodies + description)
    //  this.setState({
    //    projectInfo: !this.state.projectInfo
    //  })

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
    console.log("target: " + this.state.projectType);
  }
  componentDidMount() {
    // console.log('target: '+this.state.projectType)
  }
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
      loading: true,
      submitDisabled: true
    });
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
    return <Link to="/projectTechnicalInfo" />;
    // alert("data entered successfully!!!!")
  };
  // }
  render() {
    const {
      startDate,
      endDate,
      length,
      bodies,
      description,
      parentInfo
    } = this.props;
    console.log("userId: " + parentInfo);

    const { projectTite, projectType } = this.state;
    //  if(!parentInfo){
    //   this.props.history.push('/addnew');

    //  }
    if (this.state.success) {
      return (
        <ProjectTechnicalInfo
          startDate={startDate}
          endDate={endDate}
          length={length}
          bodies={bodies}
          description={description}
          projectType={projectType}
          projectTite={projectTite}
          pid={this.state.pid}
        />
      );
    }
    // console.log('userId: '+ this.props.userId)
    return (
      <div>
        <div className="bg-pt" id="project-type">
          <section className="sign-body pt-5">
            <Navbar projectInfo={this.state.projectInfo} />
            {/* 
            <div className="col-md-12 justify-content-center d-flex align-items-center">
              <div className="col-md-10 container row justify-content-center " >

                <div className="bubble-pt previous-pt">
                  <img src={ok} className="wiz2" alt="" />

                   <img src="images-info/ok.png" alt=""/> 
                </div>

                <div className="bubble-separator-pt"></div>
                <div className="bubble-pt previous1-pt">
                  <i></i>
                </div>

                <div className="bubble-separator2-pt"></div>
                <div className="bubble3-pt previous2-pt">

                </div>


              </div>

            </div>
            <div className="col-md-12 col-12 col-sm-12 col-lg-12  col-lg-12 col-xl-9 container justify-content-center d-flex align-items-center" >
              <div className="col-md-10 col-12 col-sm-6 col-lg-5 col-lg-4 col-xl-6 container row justify-content-center " style={{ marginBottom: "40px" }}>

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
                      <div className="col-md-6 col-6 mt-5"></div>

                      <div className="col-md-6 col-6  mt-5">
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
            {/* </div> */}
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
