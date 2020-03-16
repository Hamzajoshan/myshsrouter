import React, { Component } from "react";
import ok from "../../images/images-info/ok.png";
import SweetAlert from "@sweetalert/with-react";
import { connect } from "react-redux";
import cookie from "react-cookies";
import { Redirect } from "react-router-dom";
import "./index.css";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { baseUrl } from "./../../config.js";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      success: false,
      finish: false,
      serviceProvider: "",
      serviveProviderValue: "Contractors",
      result: [],
      parentData: "",
      complete: !!this.props.complete || false,
      acceptedAgreement: false,
      isChecked: false,
      checkboxData: "",
      childResult: "",
      childId: "",
      parentId: ""
    };
    this.handleChecked = this.handleChecked.bind(this);
    this.finish = this.finish.bind(this);
    this.selectedServiveProvider = this.selectedServiveProvider.bind(this);
    // this.handleAcceptAgreementChange = this.handleAcceptAgreementChange.bind(this)
  }

  handleChecked(e) {
    this.setState({
      isChecked: !this.state.isChecked,
      checkboxData: e.target.value
    });
    let data = e.target.value;
    // console.log(data)
    const result = this.state.childResult.find(
      ({ typeName }) => typeName === data
    );
    let childId = result.id;
    // console.log('id: '+childId)
    this.setState({ childId });
  }
  async selectedServiveProvider(e) {
    this.setState({ serviveProviderValue: e.target.value });
    let inputArray = this.state.result;
    // console.log("inputarray"+ e)
    let data = e.target.value;
    // console.log("inputarray"+ typeof data)
    // let user = inputArray.find(item => item.typeName === data);

    const result = await inputArray.find(item => item.typeName === data);
    // console.log("inputarray"+result.id)

    let parentId = result.id;
    this.setState({ parentId });

    this.updateParectSP(parentId);
  }
  updateParectSP = value => {
    fetch(
      `${baseUrl}api/services/app/ServiceProviderType/GetSpChildByParentId?ParentId=` +
        value
    )
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          let childResult = json.result;
          // let user = result.find(item => item.typeName === "Contractors");
          // console.log(result1);
          //   console.log(result1);
          //  this.setState({childResult})
          //  let ar1 = [
          //    {id: 1, typeName: 'malik'},
          //    {id: 2, typeName: 'aamir'},
          //    {id: 3, typeName: 'awan'}
          //  ]
          this.setState({ childResult });

          let result = json.result.map(data => {
            //  let result = ar1.map(data=>{

            return (
              <div className="form-group col-md-11 ml-5" key={data.id}>
                {/* //   <div className="round">
      //     <input type="checkbox" name={data.typeName} id="checkbox" onChange={ this.handleChecked } />
      //     <label for="checkbox"></label>
      //     <span>{data.typeName}</span>
      //   </div>

      // </div> */}
                <input
                  type="radio"
                  class="option-input radio"
                  value={data.typeName}
                  name="example"
                  onChange={this.handleChecked}
                  required
                />

                <label className="lable">{data.typeName}</label>
              </div>
            );
          });
          this.setState({
            parentData: result
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  componentWillMount() {
    // SweetAlert(
    //   <div style={{color: 'red'}}>
    //     <h1> <strong >Error!</strong></h1>
    //     <p style={{ fontSize: "20px" }}>Kindly select properly!!!</p>
    //   </div>
    // )
    // console.log("legalType: "+this.props.workInterest+" "+ this.props.legalType)
    this.selectedCheckboxes = new Set();
    // console.log(this.state.serviveProviderValue);
    fetch(
      `${baseUrl}api/services/app/ServiceProviderType/GetParentSpTypes`
    )
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          let parentId = json.result[0].id;
          let result = json.result;
          this.setState({ result });
          let serviceProvider = result.map(function(key) {
            return (
              <option key={key.id} vlaue={key.typeName}>
                {key.typeName}
              </option>
            );
          });
          this.setState({
            serviceProvider,
            parentId
          });
          this.updateParectSP(json.result[0].id);

          // this.selectedServiveProvider(result);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  // componentWillReceiveProps(){
  //   this.selectedServiveProvider();
  // }
  finish(e) {
    e.preventDefault();
    // console.log("child "+this.state.childId)
    // console.log("parent "+ this.state.parentId)
    if (!this.props.spId) {
      // return <LoginPanel onSuccess={this.onLogin} />
      // return <Dashboard />
      SweetAlert("You need to provide some basic info.", {
        buttons: {
          catch: {
            text: "BasicInfo",
            value: "catch"
          }
        }
      }).then(value => {
        switch (value) {
          case "catch":
            {
              this.props.history.push("/basicinfo");
            }
            break;

          default:
            break;
          // SweetAlert("Got away safely!");
        }
      });
      // this.props.history.push('/dashboard');
    }
    this.setState({ loading: true });
    if (this.state.parentId === "" || this.state.childId === "") {
      this.setState({
        success: false,
        // errormessage:"Password does not match!!!",
        loading: false,
        submitDisabled: false
      });
      SweetAlert(
        <div style={{ color: "red" }}>
          <h1>
            {" "}
            <strong>Error!</strong>
          </h1>
          <p style={{ fontSize: "20px" }}>Kindly select properly!!!</p>
        </div>
      );
    } else {
      // make API call

      fetch(
        `${baseUrl}api/services/app/ServiceProvider/CreateServiceProviderAsync`,
        {
          method: "post",
          // mode: 'cors',
          // 'contentType': 'application/json',

          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId: this.props.spId,
            spTypes: [
              this.props.workInterest,
              this.props.legalType,
              this.state.parentId,
              this.state.childId
            ]
          })
        }
      )
        .then(function(response) {
          return response.json(); //response.json() is resolving its promise. It waits for the body to load
        })
        .then(
          responseData => {
            //  alert(responseData);
            if (responseData.success) {
              SweetAlert(
                <div style={{ color: "green" }}>
                  <h1>
                    {" "}
                    <strong>Success!</strong>
                  </h1>
                  <p style={{ fontSize: "20px" }}>Signed up successfully.</p>
                </div>
              );

              this.setState({
                success: !this.state.success,
                finish: !this.state.finish
              });
              // this.props.history.push('/Login');
            }
            if (!responseData.success) {
              this.setState({
                errormessage: responseData.error.message,
                success: false,
                submitDisabled: false,
                loading: false
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
            }
          },
          error => {
            // console.log(error)
            // this.setState({
            //   errormessage:error,
            // });
          }
        )
        .catch(error => {
          console.log(error);
        });
    }
    // SweetAlert(
    //   <div className="alert alert-success alert-dismissible fade show">
    //                          <h1> <strong>Success!</strong></h1>
    //                           <p style={{fontSize:"30px"}}>Signed up successfully.</p>

    //                       </div>
    // )
  }

  render() {
    // console.log(this.state.checkboxData)
    // console.log('spid: '+ this.props.spId)
    if (cookie.load("Token")) {
      // return <LoginPanel onSuccess={this.onLogin} />
      // return <Dashboard />
      this.props.history.push("/dashboard");
    }
    if (!this.props.spId) {
      // return <LoginPanel onSuccess={this.onLogin} />
      // return <Dashboard />
      SweetAlert("You need to provide some basic info.", {
        buttons: {
          catch: {
            text: "BasicInfo",
            value: "catch"
          }
        }
      }).then(value => {
        switch (value) {
          case "catch":
            {
              this.props.history.push("/basicinfo");
            }
            break;

          default:
            break;
          //   SweetAlert("Got away safely!");
        }
      });
      // this.props.history.push('/dashboard');
    }
    return (
      <div>
        <div className="bg">
          <Header />

          <section className="sign-body" id="form">
            <div className="col-md-12 justify-content-center d-flex align-items-center">
              <div className="col-md-10 container row justify-content-center ">
                {/* <img src={ok} classNameName="twiter" /> */}
                <div className="bubble previous">
                  <i></i>
                </div>

                <div className="bubble-separator"></div>

                {this.state.finish ? (
                  <div>
                    <div
                      className="bubble previous1"
                      style={{ backgroundColor: "#fff" }}
                    >
                      <img src={ok} className="twiter" alt="" />
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="bubble previous1"></div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-12 container justify-content-center d-flex align-items-center">
              <div
                className="col-md-9  container row justify-content-center "
                style={{ marginBottom: "40px" }}
              >
                <div className="col-md-1"></div>
                <div
                  className="bubble1-contract text col-md-2 col-4"
                  style={{ fontSize: "13" }}
                >
                  <p>Contract Type</p>
                </div>

                <div className="bubble-separator1"></div>
                <div
                  className="bubble2-contract text1 col-md-4 col-2"
                  style={{ fontSize: "13" }}
                >
                  <p>Finish</p>
                </div>
              </div>
            </div>
            <div className="col-md-12 d-flex align-items-center justify-content-center">
              <div className="col-md-8 col-xm-4 col-sm-8 col-lg-7  pt-5 pb-5 d-flex align-items-center justify-content-center">
                <div className=" col-md-8 col-xm-3 col-sm-8 col-lg-8 col-8 contract-sign">
                  <h2 className="text-uppercase">
                    <strong>Contract Type</strong>
                  </h2>
                </div>

                <div className="col-md-12 ">
                  <div className="row center form">
                    <div className="col-md-12 col-12">
                      <form className="inner-form">
                        {this.state.success ? (
                          <div className="alert alert-success alert-dismissible fade show">
                            <strong>Success!</strong> Signed up successfully.
                          </div>
                        ) : null}
                        <div className="form-row">
                          <div className="form-group col-md-11 ml-5">
                            <select
                              onChange={this.selectedServiveProvider}
                              placeholder="Select an option"
                              value={this.state.serviveProviderValue}
                              className="form-control mainLoginInput"
                              id="contract-dropdown"
                            >
                              {this.state.serviceProvider}
                              {/* <option value="sgfsg" className="">Select</option>
                            <option value="sfgf" className="">Select1</option>

                            <option value="fsgfg" className="">Select2</option> */}
                            </select>
                          </div>
                          {this.state.parentData}
                          {/* <div className="form-group col-md-11 ml-5">
    <input type="radio" class="option-input radio" name="example" />
                       
                          <label className='lable'>
    <span>Radio option</span> 
  </label>
  </div>
  <div className="form-group col-md-11 ml-5">
  <input type="radio" class="option-input radio" name="example" />

  <label className='lable'>
    Radio option
  </label>
  </div>
  <div className="form-group col-md-11 ml-5">
  <input type="radio" class="option-input radio" name="example" />

  <label className='lable'>
    Radio option
  </label>
  </div> */}

                          {/* <div className="form-group col-md-11 ml-5">

                            <div className="round">
                              <input type="checkbox" name="check" id="checkbox"  />
                              <label for="checkbox"></label>
                              <span>Trunkey</span>
                            </div>

                          </div>

                          <div className="form-group col-md-11 ml-5">

                            <div className="round1">
                              <input type="checkbox" name="check" id="checkbox1" />
                              <label for="checkbox1"></label>
                              <span>Standing Structure</span>
                            </div>
                          </div>
                          <div className="form-group col-md-11 ml-5">

                            <div className="round2">
                              <input type="checkbox" name="check" id="checkbox2" />
                              <label for="checkbox2"></label>
                              <span>Reconstraction</span>
                            </div>
                          </div> */}

                          <div
                            className="col-md-6 col-7 container button-outer"
                            onClick={this.finish}
                          >
                            {/* <a className="button-inner" style={{ textDecoration: "none" }}> */}
                            <div className="col-md-6 container">
                              {this.state.loading ? (
                                <div style={{ color: "lightgrey" }}>
                                  Wait...
                                </div>
                              ) : (
                                <span>
                                  <strong>Finish </strong>
                                </span>
                              )}
                              {/* <span ><strong>Finish </strong></span> */}
                            </div>
                            {this.state.success ? (
                              <Redirect to="/Login" />
                            ) : null}
                            {/* </a> */}
                          </div>
                        </div>
                      </form>
                      <br />

                      <div className="col-md-12 pt-3"></div>
                    </div>
                  </div>
                </div>
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
    Income: state.places.Income,
    spId: state.places.spId
  };
};
// const mapDispatchToProps = dispatch => {
//   return {
//     add2: (value) => {
//       dispatch(spid(value))
//     },

//   }
// }
export default connect(mapStateToProps)(index);
