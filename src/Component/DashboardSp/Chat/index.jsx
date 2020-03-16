import React, { Component } from "react";
// import './Projects/node_modules/@trendmicro/react-sidenav/dist/react-sidenav.css';
import "./index.css";
import $ from "jquery";
// import TimeAgo from "react-timeago";
import decode from "jwt-decode";
// import loader from "../../../images/loader/loader.gif";

//import loader from "../../../images/loader/loader.gif";

import cookie from "react-cookies";
// the hoc
import { withNamespaces } from "react-i18next";
// import SweetAlert from "@sweetalert/with-react";
import ChatHistoryComponent from "./chatHistory";
import ChatBoxComponent from "./EmptychatBox";

// import Moment from "react-moment";
// import { Link, Redirect } from "react-router-dom";
// import moment from "moment";
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: true,
      token: "",
      isOpen: false,
      reasonLoading: false,
      errormessage: false,
      success: false,
      fromId: "",
      toId: "",
      userType: "",
      totalChat: "",
      Usersresult: "",
      chatHistoryUser: "",
      userName: this.props.t("team_chat")
    };
    this.ToggleChat = this.ToggleChat.bind(this);
    this.ToggleChatOpen = this.ToggleChatOpen.bind(this);
    this.HandleStartChat = this.HandleStartChat.bind(this);
  }

  //Handle toggle open
  ToggleChatOpen = e => {
    e.preventDefault();

    $("#toggleChat").css({ width: "380px" });
    $(".card-footer").css({ display: "block" });
    $(".chat-image-side-section").css({ visibility: "visible" });
    $(".card-footer").css({ visibility: "visible" });
    $("#toggleChat").css({ backgroundColor: "#f5f5f5" });
  };
  //Handle Toggle
  ToggleChat = e => {
    e.preventDefault();

    $("#toggleChat").css({ width: "85px" });
    $(".chat-sidebar-header-i").css({ cursor: "pointer" });
    $(".card-footer").css({ visibility: "hidden" });
    $(".chat-image-side-section").css({ visibility: "hidden" });
    $("#toggleChat").css({ backgroundColor: "transparent" });
  };

  //end of toogle-chat-open
  //Handling the open chat
  HandleStartChat = (fromId, toId, userName) => e => {
    e.preventDefault();

    $("#toggleChat").css({ width: "380px" });
    $(".card-footer").css({ display: "block" });
    this.setState({
      fromId: fromId,
      toId: toId,
      userName
    });
  };

  componentWillMount() {
    if (cookie.load("Token")) {
      let token = cookie.load("Token");
      this.setState({ token: token });
      let token1 = decode(cookie.load("Token"));
      this.setState({
        userType: token1.UserType,
        fromId: token1.sub
      });
    }
  }

  componentDidMount() {
    $(this.refs["message"]).focus();
    const { fromId } = this.state;

    //I will Fire API Here
    fetch(
      "https://shsbackend.azurewebsites.net/api/services/app/Chat/GetInitialChatByUser?UserId=" +
        fromId,
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
          const { fromId } = this.state;
          console.log("json.result", json.result);
          let Usersresult = json.result.map(function(key) {
            //start Of Initial Chats
            return fromId == key.userFrom.id ? (
              <li class="contacts-li" key={key.id}>
                <div class="d-flex bd-highlight">
                  <div class="img_cont">
                    <span>
                      <p
                        style={{
                          backgroundColor: "rgb(62, 67, 80)",
                          height: "50px",
                          width: "50px",
                          cursor: "pointer",
                          borderRadius: "50%",
                          position: "relative"
                        }}
                      >
                        <h3
                          style={{
                            position: "absolute",
                            top: "15%",
                            color: "#fff",
                            left: "17px",
                            fontSize: "25px"
                          }}
                          onClick={this.HandleStartChat(
                            key.userFrom.id,
                            key.userTo.id,
                            key.userTo.name
                          )}
                        >
                          {key.userTo.name.charAt(0).toUpperCase()}
                        </h3>
                      </p>
                    </span>
                    {/* <img
                      id="from "
                      src="https://2.bp.blogspot.com/-8ytYF7cfPkQ/WkPe1-rtrcI/AAAAAAAAGqU/FGfTDVgkcIwmOTtjLka51vineFBExJuSACLcBGAs/s320/31.jpg"
                      className="rounded-circle user_img openChatForSpecficUser"
                      onClick={this.HandleStartChat(
                        key.userFrom.id,
                        key.userTo.id
                      )}
                    /> */}
                    <span class="online_icon offline"></span>
                  </div>
                </div>
              </li>
            ) : (
              <li class="contacts-li" key={key.id}>
                <div class="d-flex bd-highlight">
                  <div class="img_cont">
                    <span>
                      <p
                        style={{
                          backgroundColor: "rgb(62, 67, 80)",
                          height: "50px",
                          width: "50px",
                          cursor: "pointer",
                          borderRadius: "50%",
                          position: "relative"
                        }}
                      >
                        <h3
                          style={{
                            position: "absolute",
                            top: "15%",
                            color: "#fff",
                            left: "17px",
                            fontSize: "25px"
                          }}
                          onClick={this.HandleStartChat(
                            key.userTo.id,
                            key.userFrom.id,
                            key.userTo.name
                          )}
                        >
                          {key.userTo.name.charAt(0).toUpperCase()}
                        </h3>
                      </p>
                    </span>
                    {/* <img
                      id="to "
                      src="https://2.bp.blogspot.com/-8ytYF7cfPkQ/WkPe1-rtrcI/AAAAAAAAGqU/FGfTDVgkcIwmOTtjLka51vineFBExJuSACLcBGAs/s320/31.jpg"
                      className="rounded-circle user_img openChatForSpecficUser"
                      onClick={this.HandleStartChat(
                        key.userTo.id,
                        key.userFrom.id
                      )}
                    /> */}
                    <span class="online_icon offline"></span>
                  </div>
                </div>
              </li>
            );
          }, this);
          this.setState({
            Usersresult,
            items: Usersresult
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  render() {
    //here i put the logic about total chat
    return (
      <div className="MainDiv">
        <section>
          <div
            className="row chat-sidebar "
            id="toggleChat"
            style={{ zIndex: "99" }}
          >
            <div
              className="col-md-12 col-12 chat-sidebar-header"
              id="toogle-chat-open"
            >
              <i
                className="fa fa-comments fa-3x chat-sidebar-header-i"
                onClick={this.ToggleChatOpen}
              ></i>
              <p className="chat-sidebar-header-p">{this.state.userName}</p>

              <i
                className="fa fa-remove col-md-2 col-2 chat-sidebar-header-i2"
                onClick={this.ToggleChat}
              ></i>
            </div>
            <div
              className="chat-image-side-section"
              style={{ visibility: "hidden" }}
            >
              <ui className="contacts">
                {this.state.Usersresult.length > 0
                  ? this.state.Usersresult
                  : null}
              </ui>
            </div>
            {this.state.toId === "" || this.state.fromId === "" ? (
              <ChatBoxComponent />
            ) : (
              <ChatHistoryComponent
                toId={this.state.toId}
                fromId={this.state.fromId}
              />
            )}
          </div>
        </section>
      </div>
    );
  }
}

export default withNamespaces()(index);
