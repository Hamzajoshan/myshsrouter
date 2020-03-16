import React, { Component } from "react";
import cookie from "react-cookies";
// import SweetAlert from "@sweetalert/with-react";
import { connect } from "react-redux";
import { tokenState } from "../../../actions/userAccessToken";
import { Link } from "react-router-dom";
// import imglogo from "../../../images/logo.png";
import "./index.css";
// import $ from "jquery";
import decode from "jwt-decode";
import { baseUrl } from "./../../../config.js";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: ""
    };

    // this.resultsDiv = React.createRef();
  }

  componentWillMount() {
    if (cookie.load("Token")) {
      let token = decode(cookie.load("Token"));
      //  console.log("cockies: "+token.sub)

      fetch(
        `${baseUrl}api/services/app/User/Get?Id=` +
          token.sub
      )
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            //  console.log(json.result)
            let user = json.result.name;

            //  console.log("user: "+ user);
            this.setState({
              currentUser: user
            });
          }
        })
        .catch(error => {
          // console.error(error);
        });
    }
  }

  render() {
    return (
      <div className="MainDiv">
        <div className="" style={{ color: "black" }}>
          <p>{this.state.currentUser}</p>
          <Link to="/changepassword">Change Password</Link>
        </div>
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

const mapDispatchToProps = dispatch => {
  return {
    accessToken: value => {
      dispatch(tokenState(value));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
