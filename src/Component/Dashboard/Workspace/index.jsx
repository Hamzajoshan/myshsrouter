import React, { Component } from "react";
// import './Projects/node_modules/@trendmicro/react-sidenav/dist/react-sidenav.css';
import "./index.css";
import $ from "jquery";
import toastr from "toastr";

// import TimeAgo from "react-timeago";
import SweetAlert from "@sweetalert/with-react";
import decode from "jwt-decode";
import Loader from "./../../loader";
// import documentImage from "./../../../images/document.jpg";
//import loader from "../../../images/loader/loader.gif";
import { withNamespaces } from "react-i18next";
import cookie from "react-cookies";
// import Moment from "react-moment";
import { Link, Redirect } from "react-router-dom";
import moment from "moment";
import { baseUrl } from "./../../../config.js";
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
      documentImage: baseUrl + "Uploads/11122020-order-512.png",
      isOpen: false,
      reason: "",
      isProjectClosedStatus: false,
      submitReasonDisabled: false,
      reasonLoading: false,
      closeDisabled: false,
      reasonError: false,
      errormessage: false,
      success: false,
      projectId: "",
      duration: "",
      chatMessage: "",
      customerId: "",
      SpId: "",
      fromId: "",
      toId: "",
      userType: "",
      totalChat: ""
    };
    this.handleChatMessage = this.handleChatMessage.bind(this);
    this.handleTypeMessage = this.handleTypeMessage.bind(this);
    this.HanldeTypeFile = this.HanldeTypeFile.bind(this);
    this.handleChatMessageOnEnter = this.handleChatMessageOnEnter.bind(this);
    this.cancelProject = this.cancelProject.bind(this);
    this.closeProject = this.closeProject.bind(this);
    this.showImage = this.showImage.bind(this);
    // this.resultsDiv = React.createRef();
    // this.bignav = this.bignav.bind(this)
    // this.mynav = this.mynav.bind(this)
    // this.logout = this.logout.bind(this)

    // this.resultsDiv = React.createRef();
  }
  showImage = url => e => {
    console.log("working");
    e.preventDefault();
    let file_n = "";
    let exten = "";
    let a = url.slice(8, url.length);
    var i = a.split(".").pop();
    exten = i;
    file_n = a;
    console.log(url);
    console.log(file_n);
    console.log("exten", exten);
    this.setState({
      ext: exten,
      d_file: file_n
    });
  };
  closeProject = e => {
    e.preventDefault();
    const { projectId } = this.state;
    let projectCloseType = 6;
    SweetAlert("Are you sure you want to Compleate Project?", {
      buttons: {
        catch: {
          text: "Close",
          value: "catch"
        },
        defeat: true
      }
    }).then(value => {
      switch (value) {
        case "catch":
          fetch(
            `${baseUrl}api/services/app/Project/CloseProjectAsync?ProjectId=${projectId}&CloseType=${projectCloseType}`,
            {
              method: "post",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + this.state.token
              }
            }
          )
            .then(function(response) {
              return response.json(); //response.json() is resolving its promise. It waits for the body to load
            })
            .then(
              responseData => {
                if (!responseData.success) {
                  //here we write the logic if request is failed
                } else {
                  //here we write the logic if the request is success
                  this.setState({
                    isProjectClosedStatus: true
                  });
                }
              },
              error => {
                // this.setState({
                //   errormessage:error,
                // });
              }
            )
            .catch(error => {});
          break;

        default:
          SweetAlert("Got away safely!");
      }
    });

    //https://shsbackend1.azurewebsites.net/api/services/app/Project/CloseProjectAsync?ProjectId=2341&CloseType=4
    //Make API Call
  };
  cancelProject = e => {
    e.preventDefault();
    const { projectId } = this.state;
    let projectCloseType = 7;

    SweetAlert("Are you sure you want to Cancel Project?", {
      buttons: {
        catch: {
          text: "Cancel Project",
          value: "catch"
        },
        defeat: true
      }
    }).then(value => {
      switch (value) {
        case "catch":
          fetch(
            `${baseUrl}api/services/app/Project/CloseProjectAsync?ProjectId=${projectId}&CloseType=${projectCloseType}`,
            {
              method: "post",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + this.state.token
              }
            }
          )
            .then(function(response) {
              return response.json(); //response.json() is resolving its promise. It waits for the body to load
            })
            .then(
              responseData => {
                if (!responseData.success) {
                  //here we write the logic if request is failed
                } else {
                  //here we write the logic if the request is success
                  this.setState({
                    isProjectClosedStatus: true
                  });
                }
              },
              error => {
                // this.setState({
                //   errormessage:error,
                // });
              }
            )
            .catch(error => {});

          break;

        default:
          SweetAlert("Got away safely!");
      }
    });
  };
  handleChatMessageOnEnter = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      const { chatMessage, fromId, toId, projectId } = this.state;
      if (chatMessage === "") {
        //nothing will happen as messageBox is empty
      } else {
        console.log("hello");
        toastr.info("Are you the 6 fingered man?");
        //here we write our code
        //Make API Call
        //https://shsbackend.azurewebsites.net/api/services/app/WorkSpace/AddWorkSpaceAsync
        // let newchat = this.state.totalChat.push(
        //   <div className="outgoing_msg">
        //     <div className="sent_msg">
        //       <p className="sent-msg-p">{this.state.chatMessage}</p>
        //       {/* <span className="time_date"> 11:01 AM | June 9</span>{" "} */}
        //     </div>
        //   </div>
        // );
        //

        let message = chatMessage;

        this.setState({
          chatMessage: ""
        });
        $(this.refs["message"]).focus();
        var d = $("#chatHistory");
        d.scrollTop(d.prop("scrollHeight"));
        fetch(`${baseUrl}api/services/app/WorkSpace/AddWorkSpaceAsync`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + this.state.token
          },
          body: JSON.stringify({
            projectId: projectId,
            toId: toId,
            fromId: fromId,
            message: message,
            messageType: 1
          })
        })
          .then(function(response) {
            return response.json(); //response.json() is resolving its promise. It waits for the body to load
          })
          .then(
            responseData => {
              if (!responseData.success) {
                //here we write the logic if request is failed
              } else {
                //here we write the logic if the request is success
              }
            },
            error => {
              // this.setState({
              //   errormessage:error,
              // });
            }
          )
          .catch(error => {});
        setTimeout(function() {
          console.log("fired");
          var d = $("#chatHistory");
          d.scrollTop(d.prop("scrollHeight"));
          $("#chatHistory").animate(
            { scrollTop: $("#chatHistory").prop("scrollHeight") },
            1000
          );
        }, 4000);
      }
    }
  };

  //Handle type file
  HanldeTypeFile = e => {
    e.preventDefault();
    let messageType = "";
    let file = e.target.files[0];
    console.log(file);
    let extension = file.name.split(".").pop();
    console.log("extension", extension);
    let image_arry = ["png", "jpg", "jpeg", "gif", "PNG", "JPG", "JPEG", "GIF"];

    if (image_arry.indexOf(extension) !== -1) {
      console.log("messageType=2");
      messageType = 2;
      console.log("Image ");
    } else {
      console.log("messageType=3");
      messageType = 3;
    }
    var formData = new FormData();
    formData.append("files", file);

    //here we first call an api to upload file
    //Make an API Call
    fetch(`${baseUrl}api/services/app/Uploads/UploadFilesAsync`, {
      method: "POST",
      body: formData
    })
      .then(function(response) {
        return response.json(); //response.json() is resolving its promise. It waits for the body to load
      })
      .then(
        responseData => {
          if (!responseData.success) {
          } else {
            //put the logic of file url here

            //Now I have to make call For workspace api

            const { fromId, toId, projectId } = this.state;
            //API CALL
            fetch(`${baseUrl}api/services/app/WorkSpace/AddWorkSpaceAsync`, {
              method: "post",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + this.state.token
              },
              body: JSON.stringify({
                projectId: projectId,
                toId: toId,
                fromId: fromId,
                message: responseData.result[0],
                messageType: messageType
              })
            })
              .then(function(response) {
                return response.json(); //response.json() is resolving its promise. It waits for the body to load
              })
              .then(
                responseData => {
                  if (!responseData.success) {
                    //here we write the logic if request is failed
                  } else {
                    //here we write the logic if the request is success
                  }
                },
                error => {
                  // this.setState({
                  //   errormessage:error,
                  // });
                }
              )
              .catch(error => {});

            //End of nested API Call
          }
        },
        error => {
          // this.setState({
          //   errormessage:error,
          // });
        }
      )
      .catch(error => {});
    //end of API CALL
  };

  //end of HanldeTypeFile

  //handling chat message
  handleChatMessage = e => {
    e.preventDefault();
    const { chatMessage, fromId, toId, projectId } = this.state;
    if (chatMessage === "") {
      //nothing will happen as messageBox is empty
    } else {
      //here we write our code
      //Make API Call
      //https://shsbackend.azurewebsites.net/api/services/app/WorkSpace/AddWorkSpaceAsync
      // let newchat = this.state.totalChat.push(
      //   <div className="outgoing_msg">
      //     <div className="sent_msg">
      //       <p className="sent-msg-p">{this.state.chatMessage}</p>
      //       {/* <span className="time_date"> 11:01 AM | June 9</span>{" "} */}
      //     </div>
      //   </div>
      // );
      //

      let message = chatMessage;

      this.setState({
        chatMessage: ""
      });
      $(this.refs["message"]).focus();
      fetch(`${baseUrl}api/services/app/WorkSpace/AddWorkSpaceAsync`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + this.state.token
        },
        body: JSON.stringify({
          projectId: projectId,
          toId: toId,
          fromId: fromId,
          message: message,
          messageType: 1
        })
      })
        .then(function(response) {
          return response.json(); //response.json() is resolving its promise. It waits for the body to load
        })
        .then(
          responseData => {
            if (!responseData.success) {
              //here we write the logic if request is failed
            } else {
              //here we write the logic if the request is success
            }
          },
          error => {
            // this.setState({
            //   errormessage:error,
            // });
          }
        )
        .catch(error => {});
      setTimeout(function() {
        var d = $("#chatHistory");
        d.scrollTop(d.prop("scrollHeight"));
        $("#chatHistory").animate(
          { scrollTop: $("#chatHistory").prop("scrollHeight") },
          1000
        );
      }, 4000);
    }
  };
  handleTypeMessage = e => {
    this.setState({
      chatMessage: e.target.value
    });
  };
  componentWillMount() {
    $(this.refs["message"]).focus();
    clearInterval(this.interval);
    if (cookie.load("Token")) {
      let token = cookie.load("Token");
      this.setState({ token: token });
      let token1 = decode(cookie.load("Token"));
      this.setState({
        userType: token1.UserType,
        projectId: this.props.match.params.projectId
      });
    }
  }

  GetAllChatsOnThisWorkspace(projectId) {
    //getting Project Id

    // const { projectId } = this.state;
    //Making API Call
    fetch(
      `${baseUrl}api/services/app/WorkSpace/GetWorkSpaceByProject?ProjectId=` +
        projectId,
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
          let toId = this.state.toId;
          let documentImage = this.state.documentImage;
          let result = json.result.map(function(key) {
            var m = "";
            if (key.message === null) {
              m = "";
            } else {
              if (key.messageType === 1) {
                if (toId === key.toId) {
                  m = (
                    <div className="outgoing_msg">
                      <div className="sent_msg">
                        {/* <p className="sent-msg-p">{key.message}</p> kh */}
                        <p className="sent-msg-p">{key.message}</p>
                        {/* <span className="time_date"> 11:01 AM | June 9</span>{" "} */}
                      </div>
                    </div>
                  );
                } else {
                  m = (
                    <div className="incoming_msg">
                      <div className="received_msg">
                        <div className="received_withd_msg">
                          <p className="rcv-msg-p">{key.message} </p>
                        </div>
                      </div>
                    </div>
                  );
                }
              } else if (key.messageType === 2) {
                if (toId === key.toId) {
                  let a = key.message.slice(8, key.message.length);
                  m = (
                    <div className="outgoing_msg">
                      <div className="sent_msg">
                        <img
                          className="document-btn-p-btnn"
                          data-toggle="modal"
                          data-target="#exampleModal"
                          onClick={this.showImage(key.message)}
                          style={{
                            width: "200px",
                            height: "200px",
                            borderRadius: "20px",
                            float: "right"
                          }}
                          src={baseUrl + a}
                          alt="myImg"
                        />
                      </div>
                    </div>
                  );
                } else {
                  let a = key.message.slice(8, key.message.length);
                  m = (
                    <div className="incoming_msg">
                      <div className="received_msg">
                        <div className="received_withd_msg">
                          <img
                            onClick={this.showImage(key.message)}
                            className="document-btn-p-btnn"
                            data-toggle="modal"
                            data-target="#exampleModal"
                            style={{
                              width: "200px",
                              height: "200px",
                              borderRadius: "20px",
                              float: "left"
                            }}
                            src={baseUrl + a}
                            alt="myImg"
                          />
                        </div>
                      </div>
                    </div>
                  );
                }
              } else {
                if (toId === key.toId) {
                  m = (
                    <div className="outgoing_msg">
                      <div className="sent_msg">
                        <img
                          className="document-btn-p-btnn"
                          data-toggle="modal"
                          data-target="#exampleModal"
                          onClick={this.showImage(key.message)}
                          style={{
                            width: "200px",
                            height: "200px",
                            borderRadius: "20px",
                            float: "right"
                          }}
                          src={documentImage}
                          alt="myImg"
                        />
                      </div>
                    </div>
                  );
                } else {
                  m = (
                    <div className="incoming_msg">
                      <div className="received_msg">
                        <div className="received_withd_msg">
                          <img
                            onClick={this.showImage(key.message)}
                            className="document-btn-p-btnn"
                            data-toggle="modal"
                            data-target="#exampleModal"
                            style={{
                              width: "200px",
                              height: "200px",
                              borderRadius: "20px",
                              float: "left"
                            }}
                            src={documentImage}
                            alt="myImg"
                          />
                        </div>
                      </div>
                    </div>
                  );
                }
              }
            }

            return <div>{m}</div>;
          }, this);
          // (
          //   <div style={{ color: "black" }} key={key.id}>
          //     <p>{key.message}</p>
          //   </div>
          // );
          this.setState({
            totalChat: result
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  componentDidMount() {
    $(this.refs["message"]).focus();
    const { projectId } = this.state;
    this.interval = setInterval(() => {
      this.GetAllChatsOnThisWorkspace(projectId);
    }, 500);

    let id = this.state.projectId;
    fetch(
      `${baseUrl}api/services/app/Project/GetProjectWorkspaceByProject?ProjectId=` +
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
          let result = json.result;
          // var a = moment([json.result.startDate]);
          // var b = moment([json.result.endDate]);
          const { projectId } = this.state;

          let custId = result.customer.user.id;
          let spId = result.serviceProvider.user.id;
          var a = moment(result.endDate); //now
          var b = moment(result.startDate);
          let days = a.diff(b, "days");
          if (this.state.userType == "1") {
            this.setState({
              result: result,
              duration: days,
              toId: custId,
              fromId: spId
            });
          } else if (this.state.userType == "2") {
            this.setState({
              result: result,
              duration: days,
              toId: spId,
              fromId: custId
            });
          }
          this.GetAllChatsOnThisWorkspace(projectId);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  render() {
    //here i put the logic about total chat
    const showFile = () => {
      if (
        this.state.ext === "docx" ||
        this.state.ext === "pdf" ||
        this.state.ext === "ppt" ||
        this.state.ext === "pptx" ||
        this.state.ext === "ppsx" ||
        this.state.ext === "pptm" ||
        this.state.ext === "doc" ||
        this.state.ext === "docm" ||
        this.state.ext === "docx"
      ) {
        return (
          <a target="blank" href={`${baseUrl}${this.state.d_file}`}>
            <button className="btn btn-primary">Download</button>
          </a>
        );
      } else if (
        this.state.ext === "png" ||
        this.state.ext === "jpg" ||
        this.state.ext === "jpeg" ||
        this.state.ext === "gif" ||
        this.state.ext === "PNG" ||
        this.state.ext === "JPG" ||
        this.state.ext === "JPEG" ||
        this.state.ext === "GIF"
      ) {
        return (
          <img
            style={{ width: "100%", height: "100%" }}
            src={`${baseUrl}${this.state.d_file}`}
            alt="file"
          />
        );
      }
    };
    const show =
      this.state.result.length === 0 ? (
        <Loader />
      ) : (
        <div className="Maindiv">
          <section className="chat-top-section-bg">
            <div
              className="col-md-12 container pt-5 pb-5"
              style={{ maxWidth: "900px" }}
            >
              <div className="row">
                <div className="col-md-4 pt-5">
                  <div className="col-md-12 row">
                    <i className="fa fa-envelope fa-3x"></i>
                    <h4 className="pt-3 pl-2">{this.props.t("messages")}</h4>
                  </div>
                  <div className="col-md-12">
                    <p style={{ fontSize: "20px" }}>
                      {this.state.result.title}
                    </p>
                  </div>
                </div>
                <div className="col-md-8 pt-5">
                  <div className="wrap pt-4">
                    <div className="col-md-12">
                      <div className="search">
                        <h5>{this.props.t("duration")}</h5>&nbsp;&nbsp; : &nbsp;
                        <p>{this.state.duration} Days</p>
                      </div>
                      <div className="search">
                        <h5>
                          {this.props.t("cutomer_name")} :{" "}
                          {this.state.result.customer.user.name}
                        </h5>
                      </div>
                      <div className="search">
                        <h5>
                          {this.props.t("sp_name")} :{" "}
                          {this.state.result.serviceProvider.user.name}
                        </h5>
                      </div>
                      <div className="search">
                        <p>
                          {/* <Link
                            to={`/reviews/${this.state.result.serviceProvider.user.id}/${this.state.result.customer.user.id}/${this.state.projectId}`}
                          >
                            <span
                              className="icon"
                              style={{
                                float: "left",
                                fontSize: "14px",
                                color: "white",
                                fontWeight: "bold"
                              }}
                            >
                              {this.props.t("add_review")}
                            </span>
                          </Link> */}
                          <button
                            className="btn btn-primary mt-5 mr-3"
                            onClick={this.closeProject}
                          >
                            {"   "} Close {"   "}
                          </button>
                          <button
                            className="btn btn-danger mt-5"
                            onClick={this.cancelProject}
                          >
                            {"   "} Cancel
                          </button>
                          {this.state.isProjectClosedStatus ? (
                            <Redirect
                              to={`/reviews/${this.state.result.serviceProvider.user.id}/${this.state.result.customer.user.id}/${this.state.projectId}`}
                            />
                          ) : null}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="messaging">
              <div className="inbox_msg">
                <div className="mesgs">
                  <div id="chatHistory" className="msg_history">
                    {this.state.totalChat}
                  </div>

                  <div class="type_msg">
                    <div class="input_msg_write row">
                      <input
                        onChange={this.handleTypeMessage}
                        onKeyDown={this.handleChatMessageOnEnter}
                        type="text"
                        ref="message"
                        class="write_msg"
                        placeholder="Type a message"
                        autofocus="true"
                        value={this.state.chatMessage}
                      />
                      <div class="upload-btn-wrapper" style={{ color: "#000" }}>
                        <i
                          class="fa fa-paperclip"
                          style={{ fontSize: "1.5rem" }}
                        ></i>
                        <input
                          type="file"
                          name="myfile"
                          class="upload-file-chat"
                          onChange={this.HanldeTypeFile}
                        />
                      </div>
                      <button
                        onClick={this.handleChatMessage}
                        class="msg_send_btn"
                        type="button"
                      >
                        <i class="fa fa-paper-plane" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* end of main div */}
        </div>
      );
    return (
      <div>
        {show}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {this.props.t("display_file")}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">{showFile()}</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  {this.props.t("close")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withNamespaces()(index);
