import React, { Component } from "react";
import "./index.css";
import $ from "jquery";
import decode from "jwt-decode";
import Loader from "./../../../loader";
import { connect } from "react-redux";
import cookie from "react-cookies";
import { baseUrl } from "./../../../../config.js";

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: "",
      bidId: "",
      SpId: "",
      fromId: "",
      toId: "",
      userType: "",
      totalChat: "",
      staticContent: [],
      chatHistoryUser: ""
    };
    $(this.refs["ChatBox"]).focus();

    this.handleChatMessage = this.handleChatMessage.bind(this);
    this.handleTypeMessage = this.handleTypeMessage.bind(this);
  }
  componentWillReceiveProps(newProps) {
    this.setState({
      chatHistoryUser: ""
    });
    $(this.refs["ChatBox"]).focus();
    this.setState({
      toId: newProps.toId,
      fromId: newProps.fromId
    });

    const { fromId, toId } = newProps;

    this.setState({
      toId: newProps.toId,
      fromId: newProps.fromId,
      staticContent: []
    });

    fetch(
      `${baseUrl}api/services/app/Chat/GetAllDetailChatByUserAsync?UserId=${fromId}&OtherUserId=${toId}`,
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
          let chatHistoryUser = json.result.map(function(key) {
            //Start of Chat History

            return fromId == key.userFrom.id ? (
              <div class="d-flex justify-content-end mb-4">
                <div class="msg_cotainer_send">{key.message}</div>
              </div>
            ) : (
              <div class="d-flex justify-content-start mb-4">
                <div class="msg_cotainer">{key.message}</div>
              </div>
              //end Of Chat History
            );
          }, this);
          this.setState({
            chatHistoryUser
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  //handling chat message
  handleChatMessage = e => {
    e.preventDefault();
    const { chatMessage, fromId, toId } = this.state;
    if (chatMessage === "") {
      //nothing will happen as messageBox is empty
    } else {
      //here we write our code
      //Make API Call
      //https://shsbackend.azurewebsites.net/api/services/app/WorkSpace/AddWorkSpaceAsync
      // console.log("to id is while sending", toId);

      let arr = this.state.staticContent;

      let message = chatMessage;
      arr.push(message);
      this.setState({
        chatMessage: "",
        staticContent: arr
      });
      $(this.refs["ChatBox"]).focus();
      fetch(
        `${baseUrl}api/services/app/Chat/AddChatAsync`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + this.state.token
          },
          body: JSON.stringify({
            toId: toId,
            fromId: fromId,
            message: message,
            messageType: 1
          })
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
              // console.log("response from server is ok");
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
  };
  handleTypeMessage = e => {
    this.setState({
      chatMessage: e.target.value
    });
  };
  componentWillMount() {
    $(this.refs["ChatBox"]).focus();

    clearInterval(this.interval);
    if (cookie.load("Token")) {
      let token = cookie.load("Token");
      this.setState({ token: token });
      let token1 = decode(cookie.load("Token"));
      this.setState({
        userType: token1.UserType,
        fromId: this.props.fromId,
        toId: this.props.toId
      });
    }
  }

  GetAllChatHistoryOfUsers(fromId, toId) {
    fetch(
      `${baseUrl}api/services/app/Chat/GetAllDetailChatByUserAsync?UserId=${fromId}&OtherUserId=${toId}`,
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
          let chatHistoryUser = json.result.map(function(key) {
            //Start of Chat History

            return fromId == key.userFrom.id ? (
              <div class="d-flex justify-content-end mb-4">
                <div class="msg_cotainer_send">{key.message}</div>
              </div>
            ) : (
              <div class="d-flex justify-content-start mb-4">
                <div class="msg_cotainer">{key.message}</div>
              </div>
              //end Of Chat History
            );
          }, this);
          this.setState({
            chatHistoryUser
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  componentDidMount() {
    const { fromId, toId } = this.state;

    $(this.refs["ChatBox"]).focus();
    this.interval = setInterval(() => {
      const { fromId, toId } = this.state;

      this.GetAllChatHistoryOfUsers(fromId, toId);
      this.setState({
        staticContent: []
      });
    }, 3000);

    fetch(
      `${baseUrl}api/services/app/Chat/GetAllDetailChatByUserAsync?UserId=${fromId}&OtherUserId=${toId}`,
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
          let chatHistoryUser = json.result.map(function(key) {
            //Start of Chat History

            return fromId == key.userFrom.id ? (
              <div class="d-flex justify-content-end mb-4">
                <div class="msg_cotainer_send">{key.message}</div>
              </div>
            ) : (
              <div class="d-flex justify-content-start mb-4">
                <div class="msg_cotainer">{key.message}</div>
              </div>
              //end Of Chat History
            );
          }, this);
          this.setState({
            chatHistoryUser
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
      <div class="card-body msg_card_body">
        <div style={{ marginBottom: "100px" }}>
          {this.state.chatHistoryUser.length > 0 ? (
            this.state.chatHistoryUser
          ) : (
            <Loader />
          )}
          {/* start of chat */}
          {this.state.staticContent.map(key => (
            <div class="d-flex justify-content-end mb-4">
              <div class="msg_cotainer_send">{key}</div>
            </div>
          ))}
          {/* end of chat */}
        </div>
        <div class="input-group card-footer">
          <textarea
            ref="ChatBox"
            onChange={this.handleTypeMessage}
            name=""
            value={this.state.chatMessage}
            class="form-control type_msg"
            placeholder="Type your message..."
          ></textarea>
          <div class="input-group-append">
            <span class="input-group-text send_btn">
              <i
                class="fa fa-location-arrow fa-2x"
                onClick={this.handleChatMessage}
              ></i>
            </span>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    userId: state.places.userId
  };
};
export default connect(mapStateToProps)(index);
