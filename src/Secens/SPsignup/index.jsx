import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import ok from "../../images/images-info/ok.png";
import { baseUrl } from "./../../config.js";
import { Multiselect } from "multiselect-react-dropdown";
import "./index.css";
import $ from "jquery";
import { connect } from "react-redux";
import { spid } from "../../actions/spid";
import cookie from "react-cookies";
// the hoc
import { withNamespaces } from "react-i18next";
import SweetAlert from "@sweetalert/with-react";

// import Media from 'react-media';
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pref_loc: [
        { pref_location_Type: this.props.t("riyadh"), id: "Riyadh" },
        { pref_location_Type: this.props.t("jeddah"), id: "Jeddah" },
        { pref_location_Type: this.props.t("ad_Dammām"), id: "Ad Dammām" },
        { pref_location_Type: this.props.t("medina"), id: "Medina" },
        { pref_location_Type: this.props.t("al_Kharj"), id: "AlKharj" },
        { pref_location_Type: this.props.t("mecca"), id: "Mecca" },
        { pref_location_Type: this.props.t("dhahran"), id: "Dhahran" }
      ],

      // Basic Info
      loading: false,
      Fname: "",
      Lname: "",
      email: "",
      username: "",
      pnumber: "",
      password: "",
      confirmpassword: "",
      id: "",
      city: "",
      district: "",
      address: "",
      plocation: "Makkah",
      errormessage: false,
      FnameLabel: false,
      LnameLabel: false,
      emailLabel: false,
      pnumberLabel: false,
      usernameLabel: false,
      workInterestId: "13",
      legalTypeId: "5",
      passwordLabel: false,
      confirmpasswordLabel: false,
      matchLabel: false,
      idLabel: false,
      cityLabel: false,
      districtLabel: false,
      addressLabel: false,
      plocationLabel: false,

      // Teccnical Info
      login: this.props.login,
      scrollTop: 0,
      workInterest: "",
      legalType: "",
      serviceProvider: "",
      selectedWorkInterest: "",
      workInterestValue: "",
      legalTypeValue: "",
      workInterestValuesMultiSelect: [],
      prefLocValuesMultiSelect: [],
      legalTypeValuesMultiSelect: [],
      spId: "",
      // contract Type
      finish: false,

      serviveProviderValue: "Contractors",
      result: [],
      parentData: "",
      complete: !!this.props.complete || false,
      acceptedAgreement: false,
      isChecked: false,
      checkboxData: "",
      childResult: [],
      childId: "",
      parentId: "",
      serviceProviderTypesMultiSelect: [],
      success: false,
      //check weather the basic info is correct or not
      basicInfoCheck: false,
      refId: "",
      userId: ""
    };
    this.userRegistration = this.userRegistration.bind(this);
    this.selectedWorkInterest = this.selectedWorkInterest.bind(this);
    this.selectedLegalType = this.selectedLegalType.bind(this);
    this.postTechnicalInfo = this.postTechnicalInfo.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
    this.finish = this.finish.bind(this);
    this.selectedServiveProvider = this.selectedServiveProvider.bind(this);
    this.backToBasicInfo = this.backToBasicInfo.bind(this);
    this.backToTechnicalInfo = this.backToTechnicalInfo.bind(this);
    this.onSelectWorkInterest = this.onSelectWorkInterest.bind(this);
    this.onRemoveWorkInterest = this.onRemoveWorkInterest.bind(this);
    this.onSelectLegalType = this.onSelectLegalType.bind(this);
    this.onRemoveLegalType = this.onRemoveLegalType.bind(this);
    this.onSelectServiceProvider = this.onSelectServiceProvider.bind(this);
    this.onRemoveServiceProvider = this.onRemoveServiceProvider.bind(this);
  }

  onSelectWorkInterest = (optionsList, selectedItem) => {
    let workinterstArray = [];
    for (let i = 0; i < optionsList.length; i++) {
      workinterstArray.push(optionsList[i].id);
    }

    this.setState({
      workInterestValuesMultiSelect: workinterstArray
    });
  };

  onSelectPrefLoc = (optionsList, selectedItem) => {
    let prefLocArray = [];
    for (let i = 0; i < optionsList.length; i++) {
      prefLocArray.push(optionsList[i].id);
    }

    this.setState({
      prefLocValuesMultiSelect: prefLocArray
    });
  };

  onSelectServiceProvider = (optionsList, selectedItem) => {
    let spArray = [];
    for (let i = 0; i < optionsList.length; i++) {
      spArray.push(optionsList[i].id);
    }

    this.setState(
      {
        serviceProviderTypesMultiSelect: spArray
      },
      () => {}
    );
  };

  onRemoveServiceProvider = (optionList, removedItem) => {
    let spArray = [];
    for (let i = 0; i < optionList.length; i++) {
      spArray.push(optionList[i].id);
    }

    this.setState(
      {
        serviceProviderTypesMultiSelect: spArray
      },
      () => {}
    );
  };

  onRemoveWorkInterest = (optionList, removedItem) => {
    let workinterstArray = [];
    for (let i = 0; i < optionList.length; i++) {
      workinterstArray.push(optionList[i].id);
    }

    this.setState({
      workInterestValuesMultiSelect: workinterstArray
    });
  };

  onRemovePrefLoc = (optionList, removedItem) => {
    let prefLocArray = [];
    for (let i = 0; i < optionList.length; i++) {
      prefLocArray.push(optionList[i].id);
    }

    this.setState({
      prefLocValuesMultiSelect: prefLocArray
    });
  };

  onSelectLegalType = (optionsList, selectedItem) => {
    let legaltypeeArray = [];
    for (let i = 0; i < optionsList.length; i++) {
      legaltypeeArray.push(optionsList[i].id);
    }

    this.setState({
      legalTypeValuesMultiSelect: legaltypeeArray
    });
  };

  onRemoveLegalType = (optionList, removedItem) => {
    let legaltypeeArray = [];
    for (let i = 0; i < optionList.length; i++) {
      legaltypeeArray.push(optionList[i].id);
    }

    this.setState({
      legalTypeValuesMultiSelect: legaltypeeArray
    });
  };
  onFnameChange = e => {
    let Fname = e.target.value.split(" ").join("");

    this.setState({
      Fname: Fname,
      FnameLabel: false
    });
  };
  onLnameChange = e => {
    let Lname = e.target.value.split(" ").join("");

    this.setState({
      Lname: Lname,
      LnameLabel: false
    });
  };
  onEmailChange = e => {
    this.setState({
      email: e.target.value,
      emailLabel: false
    });
  };
  onUsernameChange = e => {
    let username = e.target.value.split(" ").join("");

    this.setState({
      username: username,
      usernameLabel: false
    });
  };
  onPnumberChange = e => {
    if (/^[0-9\b]+$/.test(e.target.value) || e.target.value === "") {
      this.setState({
        pnumber: e.target.value,
        pnumberLabel: false
      });
    }
  };
  onPasswordChange = e => {
    this.setState({
      password: e.target.value,
      passwordLabel: false
    });
  };
  onIdChange = e => {
    this.setState({
      id: e.target.value,
      idLabel: false
    });
  };
  onCityChange = e => {
    this.setState({
      city: e.target.value,
      cityLabel: false
    });
  };
  onDistrictChange = e => {
    this.setState({
      district: e.target.value,
      districtLabel: false
    });
  };
  onAddressChange = e => {
    this.setState({
      address: e.target.value,
      addressLabel: false
    });
  };
  onPlocationChange = e => {
    this.setState({
      plocation: e.target.value,
      plocationLabel: false
    });
  };
  onConfirmpasswordChange = e => {
    this.setState({
      confirmpassword: e.target.value,
      confirmpasswordLabel: false
      // passwordLabel:false
    });
    if (this.state.password !== e.target.value) {
      this.setState({
        match: false,
        matchLabel: true
      });
    } else {
      this.setState({
        match: false,
        matchLabel: false
      });
    }
  };

  selectedWorkInterest = e => {
    this.setState({ workInterestValue: e.target.value });
    //
    let inputArray = this.state.workResult;
    //
    let data = e.target.value;

    //
    // let user = inputArray.find(item => item.typeName === data);

    const result = inputArray.find(item => item.workIntrestType === data);
    //
    // let parentId = result.id;

    this.setState({ workInterestId: result.id });
  };
  selectedLegalType = e => {
    this.setState({ legalTypeValue: e.target.value });
    //
    let inputArray = this.state.legalResult;
    //
    let data = e.target.value;
    //
    // let user = inputArray.find(item => item.typeName === data);

    const result = inputArray.find(item => item.legelTypeName === data);
    //

    //
    this.setState({ legalTypeId: result.id });
  };

  postTechnicalInfo = e => {
    e.preventDefault();
    // if (!this.props.spId) {
    //   // return <LoginPanel onSuccess={this.onLogin} />
    //   // return <Dashboard />
    //   SweetAlert("You need to provide some basic info.", {
    //     buttons: {
    //       catch: {
    //         text: "BasicInfo",
    //         value: "catch",
    //       },

    //     },
    //   })
    //   .then((value) => {
    //     switch (value) {

    //       case "catch":
    //         {
    //           this.props.history.push('/basicinfo');
    //         }
    //         break;

    //       // default:
    //       //   SweetAlert("Got away safely!");
    //     }
    //   });
    //     // this.props.history.push('/dashboard');

    // }
    this.setState({ loading: true });
    if (this.state.workInterestId === "" || this.state.legalTypeId === "") {
      SweetAlert(
        <div style={{ color: "red" }}>
          <h1>
            {" "}
            <strong>Error!</strong>
          </h1>
          <p style={{ fontSize: "20px" }}>Kindly select properly!!!</p>
        </div>
      );
      this.setState({
        success: false,

        loading: false,
        submitDisabled: false
      });
    } else {
      // this.setState({success:!this.state.success});
      fetch(`${baseUrl}api/services/app/ServiceProviderType/GetParentSpTypes`)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            //
            let parentId = json.result[0].id;
            let result = json.result;
            console.log(result);
            this.setState({ result });
            let typeName;
            let serviceProvider = result.map(function(key) {
              if (cookie.load("Language")) {
                //hamzajoshan
                let langCookie = cookie.load("Language");
                if (langCookie == "ar") {
                  typeName = key.typeNameArabic;
                } else if (langCookie == "en") {
                  typeName = key.typeName;
                }
              } else {
                typeName = key.typeNameArabic;
              }
              return (
                <option key={key.id} value={key.typeName}>
                  {typeName}
                </option>
              );
            });
            this.setState({
              serviceProvider,
              parentId,
              loading: false,
              submitDisabled: false
            });
            this.updateParectSP(json.result[0].id);

            // this.selectedServiveProvider(result);
          }
        })
        .catch(error => {
          console.error(error);
        });
      $(".basicInfo").css("display", "none");
      $(".tecnicalInfo").css("display", "none");
      $(".contractType").css("display", "block");
    }
  };

  handleChecked(e) {
    this.setState({
      isChecked: !this.state.isChecked,
      checkboxData: e.target.value
    });
    let data = e.target.value;
    //
    const result = this.state.childResult.find(
      ({ typeName }) => typeName === data
    );
    let childId = result.id;
    //
    this.setState({ childId });
  }
  async selectedServiveProvider(e) {
    this.setState({ serviveProviderValue: e.target.value });
    let inputArray = this.state.result;
    //
    let data = e.target.value;
    //
    // let user = inputArray.find(item => item.typeName === data);

    const result = await inputArray.find(item => item.typeName === data);
    //

    let parentId = result.id;

    this.setState({ parentId });

    this.updateParectSP(parentId);
  }
  updateParectSP = value => {
    this.setState({
      serviceProviderTypesMultiSelect: [],
      childResult: []
    });
    fetch(
      `${baseUrl}api/services/app/ServiceProviderType/GetSpChildByParentId?ParentId=` +
        value
    )
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          let childResult = json.result;

          // let user = result.find(item => item.typeName === "Contractors");
          //
          //
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

  createSP = id => {
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
          userId: id,
          spTypes: [
            this.state.workInterestId,
            this.state.legalTypeId,
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
          //
          // this.setState({
          //   errormessage:error,
          // });
        }
      )
      .catch(error => {});
  };
  basicInfo = () => {
    const { username, Fname, Lname, email, password } = this.state;
    fetch(`${baseUrl}api/services/app/User/Create`, {
      method: "post",
      mode: "cors",
      redirect: "follow",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        userName: username,
        name: Fname,
        surname: Lname,
        emailAddress: email,
        isActive: true,
        password: password,
        userType: 2
      })
    })
      .then(function(response) {
        // this.props.history.push('/SP_TechnicalInfo');
        return response.json(); //response.json() is resolving its promise. It waits for the body to load
      })
      .then(
        responseData => {
          //  alert(responseData);

          if (!responseData.success) {
            //
            if (responseData.error.message === "") {
              if (!this.state.spId) {
                // return <LoginPanel onSuccess={this.onLogin} />
                // return <Dashboard />
                SweetAlert(responseData.error.message, {
                  buttons: {
                    catch: {
                      text: "Login",
                      value: "catch"
                    }
                  }
                }).then(value => {
                  switch (value) {
                    case "catch":
                      this.props.history.push("/Login");

                      break;

                    // default:
                    //   SweetAlert("Got away safely!");
                  }
                });
                // this.props.history.push('/dashboard');
              }
            }
            this.setState({
              errormessage: responseData.error.message,
              submitDisabled: false,
              success: false,
              loading: false
            });
          } else {
            this.setState({ spId: responseData.result.id });
            // this.props.add2(responseData.result.id);
            this.createSP(responseData.result.id);
            this.setState({
              Fname: "",
              Lname: "",
              username: "",
              email: "",
              pnumber: "",
              text: "",
              id: "",
              city: "",
              district: "",
              address: "",
              plocation: "",
              emailValid: false, // valid flags for each field
              textValid: false,
              submitDisabled: false,
              password: "",
              confirmpassword: "",
              errormessage: false,
              success: responseData.success,

              loading: false
            });
            // this.props.history.push('/SP_TechnicalInfo');
          }
        },
        error => {
          //
          // this.setState({
          //   errormessage:error,
          // });
        }
      )
      .catch(error => {
        console.log(error);
      });
  };
  finish(e) {
    e.preventDefault();
    const {
      Fname,
      Lname,
      email,
      username,
      password,
      id,
      city,
      district,
      address,
      prefLocValuesMultiSelect,
      legalTypeId,
      pnumber,
      workInterestValuesMultiSelect,
      serviceProviderTypesMultiSelect
    } = this.state;
    console.log("Fname", Fname);
    console.log("Lname", Lname);
    console.log("email", email);
    console.log("username", username);
    console.log("password", password);
    console.log("id", id);
    console.log("city", city);
    console.log("district", district);
    console.log("address", address);
    console.log("prefLocValuesMultiSelect", prefLocValuesMultiSelect);
    console.log("workInterestValuesMultiSelect", workInterestValuesMultiSelect);
    console.log("legalTypeId", legalTypeId);

    console.log("pnumber", pnumber);
    console.log(
      "serviceProviderTypesMultiSelect",
      serviceProviderTypesMultiSelect
    );

    this.setState({ loading: true });
    if (
      this.state.parentId === "" ||
      serviceProviderTypesMultiSelect.length < 1
    ) {
      this.setState({
        success: false,
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
      //this.basicInfo();
      // this.createSP();
      //Make a call to API for Create
      fetch(`${baseUrl}api/services/app/User/Create`, {
        method: "post",
        // mode: 'cors',
        // 'contentType': 'application/json',

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userName: username,
          name: Fname,
          surname: Lname,
          emailAddress: email,
          isActive: true,
          password: password,
          userType: 2,
          phoneNumber: pnumber
        })
      })
        .then(function(response) {
          return response.json(); //response.json() is resolving its promise. It waits for the body to load
        })
        .then(
          responseData => {
            if (!responseData.success) {
              SweetAlert(
                <div className="alert alert-danger fade show">
                  <h1>
                    {" "}
                    <strong>Error!</strong>
                  </h1>
                  <p style={{ fontSize: "30px" }}>
                    {responseData.error.message}
                  </p>
                </div>
              );
            } else {
              //Here I will Make Second API Call

              //
              //Make API Call
              fetch(
                `${baseUrl}api/services/app/ServiceProvider/UpdateServiceProviderAsync`,
                {
                  method: "put",
                  // mode: 'cors',
                  // 'contentType': 'application/json',

                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    userId: responseData.result.id,
                    spId: responseData.result.reffId,
                    idNumber: id,
                    province: address,
                    city: city,
                    district: district,
                    preferableLocations: "prefLocValuesMultiSelect",
                    spTypes: serviceProviderTypesMultiSelect,
                    workIntrests: workInterestValuesMultiSelect,
                    legelTypeId: legalTypeId
                  })
                }
              )
                .then(function(response) {
                  return response.json(); //response.json() is resolving its promise. It waits for the body to load
                })
                .then(
                  responseData => {
                    //  alert(responseData);
                    SweetAlert(
                      <div style={{ color: "green" }}>
                        <h1>
                          {" "}
                          <strong>Success!</strong>
                        </h1>
                        <p style={{ fontSize: "20px" }}>
                          Signed up successfully.
                        </p>
                      </div>
                    );
                    this.setState({
                      Fname: "",
                      Lname: "",
                      username: "",

                      email: "",
                      pnumber: "",
                      text: "",
                      emailValid: false, // valid flags for each field
                      textValid: false,
                      submitDisabled: false,
                      password: "",
                      confirmpassword: "",
                      errormessage: false,
                      success: responseData.success,

                      loading: false
                    });
                    if (!responseData.success) {
                      //
                      this.setState({
                        errormessage: responseData.error.message,
                        success: false
                      });
                      SweetAlert(
                        <div className="alert alert-danger fade show">
                          <h1>
                            {" "}
                            <strong>Error!</strong>
                          </h1>
                          <p style={{ fontSize: "30px" }}>
                            {this.state.errormessage}
                          </p>
                        </div>
                      );
                    }
                  },
                  error => {
                    //
                    // this.setState({
                    //   errormessage:error,
                    // });
                  }
                )
                .catch(error => {});
            }
          },
          error => {
            //
            // this.setState({
            //   errormessage:error,
            // });
          }
        )
        .catch(error => {});
    }
  }

  userRegistration = e => {
    const {
      Fname,
      Lname,
      email,
      username,
      password,
      confirmpassword,
      id,
      city,
      district,
      address,
      plocation,
      pnumber
    } = this.state;
    e.preventDefault();
    this.setState({
      loading: true,
      submitDisabled: true
    });
    // const =this.state.{Fname,Lname,email,password, confirmPassword}
    if (
      Fname === "" ||
      Lname === "" ||
      email === "" ||
      username === "" ||
      password === "" ||
      confirmpassword === "" ||
      id === "" ||
      city === "" ||
      district === "" ||
      address === "" ||
      plocation === "" ||
      pnumber === ""
    ) {
      if (this.state.Fname === "") {
        // $(this.refs['fname']).focus();
        this.setState({
          FnameLabel: !this.state.FnameLabel,
          loading: false,
          submitDisabled: false
        });
      }
      if (this.state.Lname === "") {
        // $(this.refs['lname']).focus();

        this.setState({
          LnameLabel: !this.state.LnameLabel,
          loading: false,
          submitDisabled: false
        });
      }
      if (this.state.email === "") {
        // $(this.refs['email']).focus();

        this.setState({
          emailLabel: !this.state.emailLabel,
          loading: false,
          submitDisabled: false
        });
      }
      if (this.state.pnumber === "") {
        // $(this.refs['phone']).focus();

        this.setState({
          pnumberLabel: !this.state.pnumberLabel,
          loading: false,
          submitDisabled: false
        });
      }
      if (this.state.username === "") {
        // $(this.refs['username']).focus();

        this.setState({
          usernameLabel: !this.state.usernameLabel,
          loading: false,
          submitDisabled: false
        });
      }
      if (this.state.password === "") {
        // $(this.refs['password']).focus();

        this.setState({
          passwordLabel: !this.state.passwordLabel,
          loading: false,
          submitDisabled: false
        });
      }
      if (this.state.confirmpassword === "") {
        // $(this.refs['confirmpassword']).focus();

        this.setState({
          confirmpasswordLabel: !this.state.confirmpasswordLabel,
          loading: false,
          submitDisabled: false
        });
      }
      if (this.state.id === "") {
        // $(this.refs['id']).focus();

        this.setState({
          idLabel: !this.state.idLabel,
          loading: false,
          submitDisabled: false
        });
      }
      if (this.state.city === "") {
        this.setState({
          cityLabel: !this.state.cityLabel,
          loading: false,
          submitDisabled: false
        });
      }
      if (this.state.district === "") {
        // $(this.refs['district']).focus();

        this.setState({
          districtLabel: !this.state.districtLabel,
          loading: false,
          submitDisabled: false
        });
      }
      if (this.state.address === "") {
        // $(this.refs['address']).focus();

        this.setState({
          addressLabel: !this.state.addressLabel,
          loading: false,
          submitDisabled: false
        });
      }
      if (this.state.plocation === "") {
        // $(this.refs['location']).focus();

        this.setState({
          plocationLabel: !this.state.plocationLabel,
          loading: false,
          submitDisabled: false
        });
      }
    } else if (this.state.password !== this.state.confirmpassword) {
      $(this.refs["password"]).focus();

      this.setState({
        success: false,
        // errormessage:"Password does not match!!!",
        loading: false,
        submitDisabled: false
      });
    } else {
      // make API call
      //https://shsbackend.azurewebsites.net/api/services/app/User/IsUserExist?Email=laptop321%40gmail.com&UserName=this
      fetch(
        `${baseUrl}api/services/app/User/IsUserExist?Email=${email}&UserName=${username}`,
        {
          method: "post",
          // mode: 'cors',
          // 'contentType': 'application/json',

          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      )
        .then(function(response) {
          return response.json(); //response.json() is resolving its promise. It waits for the body to load
        })
        .then(
          responseData => {
            if (responseData.result == "not exist") {
              console.log(responseData.result);
              $(".basicInfo").css("display", "none");
              $(".tecnicalInfo").css("display", "block");
              $(".contractType").css("display", "none");
              fetch(
                `${baseUrl}api/services/app/WorkIntrest/GetActiveWorkIntrestTypesAsync`
              )
                .then(res => res.json())
                .then(json => {
                  if (json.success) {
                    let workResult = json.result;

                    console.log("work result", workResult);
                    // kh
                    this.setState({
                      workResult
                    });
                  }
                })
                .catch(error => {
                  console.error(error);
                });
              fetch(
                `${baseUrl}api/services/app/LegelType/GetActiveLegelTypesAsync`
              )
                .then(res => res.json())
                .then(json => {
                  if (json.success) {
                    let legalResult = json.result;
                    console.log("legalResult ", legalResult);
                    this.setState({
                      legalResult,
                      loading: false,
                      submitDisabled: false
                    });
                  }
                })
                .catch(error => {
                  console.error(error);
                });
              this.setState({
                loading: false,
                submitDisabled: false
              });
            } else {
              console.log(responseData.result);
              $(".basicInfo").css("display", "block");
              $(".tecnicalInfo").css("display", "none");
              $(".contractType").css("display", "none");

              SweetAlert(
                <div className="alert alert-danger fade show">
                  <h1>
                    {" "}
                    <strong>Error!</strong>
                  </h1>
                  <p style={{ fontSize: "30px" }}>{responseData.result}</p>
                </div>
              );
              this.setState({
                errormessage: responseData.result,
                loading: false,
                submitDisabled: false
              });
            }
          },
          error => {
            //
            // this.setState({
            //   errormessage:error,
            // });
          }
        )
        .catch(error => {});
    }
  };
  backToBasicInfo = e => {
    e.preventDefault();
    $(".basicInfo").css("display", "block");
    $(".tecnicalInfo").css("display", "none");
    $(".contractType").css("display", "none");
  };
  backToTechnicalInfo = e => {
    e.preventDefault();
    $(".basicInfo").css("display", "none");
    $(".tecnicalInfo").css("display", "block");
    $(".contractType").css("display", "none");
  };
  render() {
    if (cookie.load("Token")) {
      // return <LoginPanel onSuccess={this.onLogin} />
      // return <Dashboard />
      this.props.history.push("/dashboard");
    }
    return (
      <div>
        <div className="bg-basicinfo">
          <Header />

          {/* <Media query="(max-width: 600px)">
    {matches =>
      matches ? 
       this.setState({toggle:false})
       : (
        <p>The document is at least 600px wide.</p>
      )
    }
  </Media> */}

          <section className="basicInfo" id="form">
            <div className="col-md-12 justify-content-center d-flex align-items-center">
              <div className="col-md-10 container row justify-content-center ">
                <div className="bubble previous">
                  <i></i>
                </div>

                <div className="bubble-separator"></div>
                <div className="bubble previous1"></div>
              </div>
            </div>
            <div className="col-md-12 container justify-content-center d-flex align-items-center">
              <div
                className="col-md-9  container row justify-content-center "
                style={{ marginBottom: "40px", color: "#fff" }}
              >
                <div
                  className="bubble1 b-text col-md-3"
                  style={{ fontSize: "13" }}
                >
                  <p className="b-text">{this.props.t("basic_info")}</p>
                </div>

                <div className="bubble-separator1"></div>
                <div
                  className="bubble2 text1 col-md-3"
                  style={{ fontSize: "13" }}
                >
                  <p>{this.props.t("technical_info")}</p>
                </div>
              </div>
            </div>

            <div className="col-md-12 d-flex align-items-center justify-content-center">
              <div className="col-md-8 col-xm-4 col-sm-8 col-lg-7  pt-5 pb-5 d-flex align-items-center justify-content-center">
                <div className=" col-md-8 col-xm-3 col-sm-8 col-lg-8 col-8 basic-sign">
                  <h2 className="text-uppercase">
                    <strong>{this.props.t("basic_info")}</strong>
                  </h2>
                </div>

                <div className="col-md-12 ">
                  <div className="row center form">
                    <div className="col-md-12">
                      <form
                        className="inner-form"
                        onSubmit={this.userRegistration}
                      >
                        {this.state.errormessage ? (
                          <div className="alert alert-danger fade show">
                            <strong>{this.props.t("error")}</strong>{" "}
                            {this.state.errormessage}
                          </div>
                        ) : null}
                        {this.state.success ? (
                          <div className="alert alert-success alert-dismissible fade show">
                            <strong>Success!</strong> signed up successfully.
                          </div>
                        ) : null}
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <input
                              autocomplete="off"
                              ref="fname"
                              autoFocus={true}
                              type="name"
                              maxLength="20"
                              className="form-control mainLoginInput"
                              id="inputDado"
                              placeholder={this.props.t("first_name")}
                              value={this.state.Fname}
                              onChange={this.onFnameChange}
                            />
                            {this.state.FnameLabel ? (
                              <label className="text-danger">
                                {this.props.t("f_name_req")}
                              </label>
                            ) : null}
                          </div>

                          <div className="form-group col-md-6">
                            <input
                              autocomplete="off"
                              ref="lname"
                              type="name"
                              maxLength="20"
                              className="form-control mainLoginInput"
                              id="inputDado"
                              placeholder={this.props.t("last_name")}
                              value={this.state.Lname}
                              onChange={this.onLnameChange}
                            />
                            {this.state.LnameLabel ? (
                              <label className="text-danger">
                                {this.props.t("lastname_req")}
                              </label>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <input
                              autocomplete="off"
                              ref="email"
                              type="email"
                              maxLength="30"
                              className="form-control mainLoginInput"
                              id="inputDado"
                              placeholder={this.props.t("email_placeholder")}
                              value={this.state.email}
                              onChange={this.onEmailChange}
                            />
                            {this.state.emailLabel ? (
                              <label className="text-danger">
                                {this.props.t("email_address_req")}
                              </label>
                            ) : null}
                          </div>

                          <div className="form-group col-md-6">
                            <input
                              autocomplete="off"
                              ref="phone"
                              type="text"
                              pattern="^(?:05|\\+)[0-9\\s.\\/-]{8}$"
                              maxLength="10"
                              className="form-control mainLoginInput"
                              id="inputDado"
                              placeholder="05XXXXXXXX"
                              value={this.state.pnumber}
                              onChange={this.onPnumberChange}
                            />
                            {this.state.pnumberLabel ? (
                              <label className="text-danger">
                                {this.props.t("phone_req")}
                              </label>
                            ) : null}
                          </div>
                          {/* */}
                          <div className="form-group col-md-6">
                            <input
                              autocomplete="off"
                              ref="username"
                              type="name"
                              maxLength="20"
                              className="form-control mainLoginInput"
                              id="inputDado"
                              placeholder={this.props.t("username_star")}
                              value={this.state.username}
                              onChange={this.onUsernameChange}
                            />
                            {this.state.usernameLabel ? (
                              <label className="text-danger">
                                {this.props.t("username_req")}
                              </label>
                            ) : null}
                          </div>

                          <div className="form-group col-md-6">
                            <input
                              autocomplete="off"
                              ref="id"
                              type="id"
                              maxLength="10"
                              minLength="10"
                              className="form-control mainLoginInput"
                              id="inputDado"
                              placeholder={this.props.t("id_star")}
                              value={this.state.id}
                              onChange={this.onIdChange}
                            />
                            {this.state.idLabel ? (
                              <label className="text-danger">
                                {this.props.t("id_req")}
                              </label>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <input
                              autocomplete="off"
                              ref="password"
                              type="password"
                              maxLength="10"
                              className="form-control mainLoginInput"
                              id="inputDado"
                              placeholder={this.props.t("password_star")}
                              value={this.state.password}
                              onChange={this.onPasswordChange}
                            />
                            {this.state.passwordLabel ? (
                              <label className="text-danger">
                                {this.props.t("password_req")}
                              </label>
                            ) : null}
                          </div>

                          <div className="form-group col-md-6">
                            <input
                              autocomplete="off"
                              ref="confirm-pass"
                              type="password"
                              maxLength="10"
                              className="form-control mainLoginInput"
                              id="inputDado"
                              placeholder={this.props.t(
                                "re-type_password_star"
                              )}
                              value={this.state.confirmpassword}
                              onChange={this.onConfirmpasswordChange}
                            />
                            {this.state.confirmpasswordLabel ? (
                              <label className="text-danger">
                                {this.props.t("confirm_pass_req")}
                              </label>
                            ) : null}
                            {this.state.matchLabel ? (
                              <label className="text-danger">
                                {this.props.t("password_mismatch")}
                              </label>
                            ) : null}
                          </div>

                          {/* <div className="form-group col-md-6"  >

                                   <select  className="form-control mainLoginInput" id="inputDado1" >
                                   <option  value='jaddah'>jaddah</option>
                                   <option  value='makkah'>makkah</option>
                                   <option  value='madena'>madena</option>

                                       </select>
                                       </div> */}
                          {/* <div className="col-md-2"></div> */}

                          <div className="form-group col-md-6">
                            <input
                              autocomplete="off"
                              ref="district"
                              type="text"
                              maxLength="15"
                              className="form-control mainLoginInput"
                              id="inputDado"
                              placeholder={this.props.t("district_star")}
                              value={this.state.district}
                              onChange={this.onDistrictChange}
                            />

                            {this.state.districtLabel ? (
                              <label className="text-danger">
                                {this.props.t("dist_req")}
                              </label>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            {/* <input
                              autocomplete="off"
                              ref="city"
                              type="text"
                              maxLength="15"
                              className="form-control mainLoginInput"
                              id="inputDado"
                              placeholder={this.props.t("city")}
                              value={this.state.city}
                              onChange={this.onCityChange}
                            /> */}
                            <select
                              className="form-control mainLoginInput"
                              id="inputDado22"
                              value={this.state.city}
                              onChange={this.onCityChange}
                            >
                              <option value="" hidden>
                                {this.props.t("select_city")}
                              </option>
                              <option value="Riyadh">
                                {this.props.t("riyadh")}
                              </option>
                              <option value="Jeddah">
                                {this.props.t("jeddah")}
                              </option>
                              <option value="Ad Dammām">
                                {this.props.t("ad_Dammām")}
                              </option>
                              <option value="Medina">
                                {this.props.t("medina")}
                              </option>
                              <option value="AlKharj">
                                {this.props.t("al_Kharj")}
                              </option>
                              <option value="Mecca">
                                {this.props.t("mecca")}
                              </option>
                              <option value="Dhahran">
                                {this.props.t("dhahran")}
                              </option>
                            </select>

                            {this.state.cityLabel ? (
                              <label className="text-danger">
                                {this.props.t("city_req")}
                              </label>
                            ) : null}
                          </div>
                          <div className="form-group col-md-12">
                            <input
                              autocomplete="off"
                              ref="address"
                              type="text"
                              maxLength="50"
                              className="form-control mainLoginInput"
                              id="inputDado"
                              placeholder={this.props.t("address_star")}
                              value={this.state.address}
                              onChange={this.onAddressChange}
                            />

                            {/* <select
                              className="form-control mainLoginInput"
                              id="inputDado22"
                              value={this.state.address}
                              onChange={this.onAddressChange}
                            >
                              <option value="" hidden>
                                Select Address
                              </option>
                              <option value="jaddah">jaddah</option>
                              <option value="makkah">makkah</option>
                              <option value="madena">madena</option>
                            </select> */}
                            {this.state.addressLabel ? (
                              <label className="text-danger">
                                {this.props.t("address_req")}
                              </label>
                            ) : null}
                          </div>
                          <div className="form-group col-md-12">
                            {/* <input
                              autocomplete="off"
                              ref="location"
                              type="text"
                              maxLength="50"
                              className="form-control mainLoginInput"
                              id="inputDado"
                              placeholder={this.props.t(
                                "preferable_location_star"
                              )}
                              value={this.state.plocation}
                              onChange={this.onPlocationChange}
                            /> */}
                            {/* <select
                              className="form-control mainLoginInput"
                              id="inputDado22"
                              value={this.state.plocation}
                              onChange={this.onPlocationChange}
                            >
                              <option value="" hidden>
                              {this.props.t("select_preferable_location")}
                              </option>
                              
                                   <option   value='Riyadh'>{this.props.t("riyadh")}</option>
                                   <option  value='Jeddah'>{this.props.t("jeddah")}</option>
                                   <option  value='Ad Dammām'>{this.props.t("ad_Dammām")}</option>
                                   <option   value='Medina'>{this.props.t("medina")}</option>
                                   <option  value='AlKharj'>{this.props.t("al_Kharj")}</option>
                                   <option  value='Mecca'>{this.props.t("mecca")}</option>
                                   <option  value='Dhahran'>{this.props.t("dhahran")}</option>
                            </select> */}
                            <Multiselect
                              options={this.state.pref_loc} // Options to display in the dropdown
                              selectedvalues={this.state.selectedValue} // Preselected value to persist in dropdown
                              onSelect={this.onSelectPrefLoc} // Function will trigger on select event
                              placeholder={this.props.t(
                                "select_preferable_location"
                              )}
                              onRemove={this.onRemovePrefLoc} // Function will trigger on remove event
                              displayValue="pref_location_Type" // Property name to display in the dropdown options
                            />{" "}
                            {this.state.plocationLabel ? (
                              <label className="text-danger">
                                {this.props.t("location_req")}
                              </label>
                            ) : null}
                          </div>

                          <button
                            className="col-md-6 col-7 container button-outer"
                            value="save"
                            name="save"
                            style={{ outline: "inherit" }}
                            type="submit"
                            disabled={this.state.submitDisabled}
                          >
                            {/* <a href="#" className="button-inner" onClick={this.userRegistration} > */}
                            <div className="col-md-6 container">
                              {this.state.loading ? (
                                <div style={{ color: "lightgrey" }}>
                                  {this.props.t("wait")}...
                                </div>
                              ) : (
                                <span>
                                  {" "}
                                  <strong>
                                    <strong>{this.props.t("next")}</strong>{" "}
                                    <i className="fal fa fa-long-arrow-right"></i>
                                  </strong>
                                </span>
                              )}
                            </div>
                            {/* </a> */}
                          </button>
                          {/* {this.state.success?<Redirect to="/SP_TechnicalInfo"/>:null} */}
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

          <section
            className="tecnicalInfo"
            id="form"
            style={{ display: "none" }}
          >
            <div class="col-md-12 justify-content-center d-flex align-items-center">
              <div class="col-md-10 container row justify-content-center ">
                <div class="bubble previous">
                  <i></i>
                </div>

                <div class="bubble-separator"></div>
                <div class="bubble previous1"></div>
              </div>
            </div>
            <div class="col-md-12 container justify-content-center d-flex align-items-center">
              <div
                class="col-md-9  container row justify-content-center "
                style={{ marginBottom: "40px" }}
              >
                <div class="col-md-1"></div>
                <div class="bubble1 text col-md-2" style={{ fontSize: "13" }}>
                  <p style={{ color: "#fff" }}>
                    {this.props.t("technical_info")}
                  </p>
                </div>

                <div class="bubble-separator1"></div>
                <div class="bubble2 text1 col-md-4" style={{ fontSize: "13" }}>
                  <p style={{ color: "#fff" }}>
                    {this.props.t("contract_type")}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-12 d-flex align-items-center justify-content-center">
              <div className="col-md-8 col-xm-4 col-sm-8 col-lg-7  pt-5 pb-5 d-flex align-items-center justify-content-center">
                <div className=" col-md-8 col-xm-3 col-sm-8 col-lg-8 col-8 tech-sign">
                  <h2 className="text-uppercase">
                    <strong>{this.props.t("technical_info")}</strong>
                  </h2>
                </div>

                <div className="col-md-12 ">
                  <div className="row center form">
                    <div className="col-md-12">
                      <form className="inner-form">
                        <div className="form-row">
                          <div className="form-group col-md-12">
                            <p
                              style={{
                                color: "#000",
                                fontSize: "20px",
                                fontWeight: "500"
                              }}
                            >
                              {this.props.t("work_interest")}
                            </p>
                            <Multiselect
                              options={this.state.workResult} // Options to display in the dropdown
                              selectedvalues={this.state.selectedValue} // Preselected value to persist in dropdown
                              onSelect={this.onSelectWorkInterest} // Function will trigger on select event
                              onRemove={this.onRemoveWorkInterest} // Function will trigger on remove event
                              displayValue="workIntrestType" // Property name to display in the dropdown options
                            />
                          </div>

                          <div className="form-group col-md-12">
                            <p
                              style={{
                                color: "#000",
                                fontSize: "20px",
                                fontWeight: "500"
                              }}
                            >
                              {this.props.t("legal_type")}
                            </p>
                            <Multiselect
                              options={this.state.legalResult} // Options to display in the dropdown
                              selectedvalues={this.state.selectedValue} // Preselected value to persist in dropdown
                              onSelect={this.onSelectLegalType} // Function will trigger on select event
                              onRemove={this.onRemoveLegalType} // Function will trigger on remove event
                              displayValue="legelTypeName" // Property name to display in the dropdown options
                            />
                            {/* <select onChange={this.selectedLegalType} value={this.state.legalTypeValue} className="form-control mainLoginInput" id="inputDado1">
                             {this.state.legalType}
                              
                            </select> */}
                          </div>
                          {/* <div className="form-group col-md-6" >

                            <select onChange={this.selectedServiveProvider} value={this.state.serviveProviderValue} className="form-control mainLoginInput" id="inputDado">
                              {this.state.serviceProvider}
                             
                            </select>
                          </div> */}
                          <div className="form-group col-md-12 row">
                            <button
                              className="col-md-6 col-7 container button-outer-contract mt-3"
                              style={{ outline: "inherit" }}
                              type="submit"
                              value="save"
                              name="save"
                              onClick={this.backToBasicInfo}
                            >
                              <div
                                className="col-md-6 container"
                                style={{ outline: "inherit" }}
                              >
                                <span>
                                  <i className="fal fa fa-long-arrow-left"></i>{" "}
                                  <strong>{this.props.t("back")}</strong>
                                  <strong> </strong>
                                </span>
                              </div>
                            </button>

                            {/* </Link> */}
                            <button
                              className="col-md-6 col-7 container button-outer-contract mt-3"
                              style={{ outline: "inherit", float: "right" }}
                              type="submit"
                              value="save"
                              name="save"
                              onClick={this.postTechnicalInfo}
                            >
                              {/* <Link to="/SP_ContractType"> */}
                              {/* <Link to="/SP_ContractType" style={{textDecoration:"none"}}> */}
                              {/* <a href="#" className="button-inner" onClick={this.userRegistration} > */}
                              <div
                                className="col-md-6 container"
                                style={{ outline: "inherit" }}
                              >
                                {/* <span > <strong>Next</strong><strong > <i className="fal fa fa-long-arrow-right"></i></strong></span> */}
                                {this.state.loading ? (
                                  <div style={{ color: "lightgrey" }}>
                                    {this.props.t("wait")}...
                                  </div>
                                ) : (
                                  <span>
                                    {" "}
                                    <strong>{this.props.t("next")}</strong>
                                    <strong>
                                      {" "}
                                      <i className="fal fa fa-long-arrow-right"></i>
                                    </strong>
                                  </span>
                                )}
                              </div>
                              {/* </a> */}
                              {/* </Link> */}
                              {/* // </button> */}
                            </button>
                            {/* </Link> */}
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
          {/* <Footer/> */}

          {/* </div> */}

          {/* <div className="bg" style={{display: 'none'}}> */}
          {/* <Header /> */}

          <section
            className="contractType"
            id="form"
            style={{ display: "none" }}
          >
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
                  <p style={{ color: "#fff" }}>
                    {this.props.t("contract_type")}
                  </p>
                </div>

                <div className="bubble-separator1"></div>
                <div
                  className="bubble2-contract text1 col-md-4 col-2"
                  style={{ fontSize: "13" }}
                >
                  <p style={{ color: "#fff" }}>{this.props.t("finsish")}</p>
                </div>
              </div>
            </div>
            <div className="col-md-12 d-flex align-items-center justify-content-center">
              <div className="col-md-8 col-xm-4 col-sm-8 col-lg-7  pt-5 pb-5 d-flex align-items-center justify-content-center">
                <div className=" col-md-8 col-xm-3 col-sm-8 col-lg-8 col-8 contract-sign">
                  <h2 className="text-uppercase">
                    <strong>{this.props.t("contract_type")}</strong>
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
                          <div className="form-group col-md-12">
                            <p
                              style={{
                                color: "#000",
                                fontSize: "20px",
                                fontWeight: "500"
                              }}
                            >
                              {this.props.t("sp_types")}
                            </p>
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
                          <div className="form-group col-md-12">
                            <Multiselect
                              options={this.state.childResult} // Options to display in the dropdown
                              selectedvalues={this.state.selectedValue} // Preselected value to persist in dropdown
                              onSelect={this.onSelectServiceProvider} // Function will trigger on select event
                              onRemove={this.onRemoveServiceProvider} // Function will trigger on remove event
                              displayValue="typeName" // Property name to display in the dropdown options
                            />
                            {/* {this.state.parentData} */}
                          </div>
                          <div
                            className="col-md-6 col-7 mt-3 container button-outer"
                            onClick={this.backToTechnicalInfo}
                          >
                            <div className="col-md-6 container">
                              <span>
                                <i className="fal fa fa-long-arrow-left"></i>{" "}
                                <strong>{this.props.t("back")} </strong>
                              </span>
                            </div>
                          </div>
                          <div
                            className="col-md-6 col-7 mt-3 container button-outer"
                            onClick={this.finish}
                          >
                            {/* <a className="button-inner" style={{ textDecoration: "none" }}> */}
                            <div className="col-md-6 container">
                              {this.state.loading ? (
                                <div style={{ color: "lightgrey" }}>
                                  {this.props.t("wait")}...
                                </div>
                              ) : (
                                <span>
                                  <strong>{this.props.t("finish")} </strong>
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
          <Footer />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    Token: state.places.Token,
    Income: state.places.Income
  };
};
const mapDispatchToProps = dispatch => {
  return {
    add2: value => {
      dispatch(spid(value));
    }
  };
};
export default withNamespaces()(
  connect(mapStateToProps, mapDispatchToProps)(index)
);
