import React, { Component } from "react";
// import './Projects/node_modules/@trendmicro/react-sidenav/dist/react-sidenav.css';
import "./index.css";
import Sidebar from "../Sidebar";
import Content from "./getActiveProjectsCust";
import Chat from "../Chat";
import Header from "../Header";
import { connect } from "react-redux";
import decode from "jwt-decode";
import cookie from "react-cookies";
// import cookie from "react-cookies";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: true,
      scrollTop: 0,
      userType: "",
      userId: ""
    };
    // this.resultsDiv = React.createRef();
    // this.bignav = this.bignav.bind(this)
    // this.mynav = this.mynav.bind(this)
    // this.logout = this.logout.bind(this)

    // this.resultsDiv = React.createRef();
  }
  componentWillMount() {
    if (cookie.load("Token")) {
      let token = cookie.load("Token");
      this.setState({ token: token });
      let token1 = decode(cookie.load("Token"));
      this.setState({ userId: token1.ReffID, userType: token1.UserType });
    }
  }
  componentDidMount() {
    // window.location.reload()
  }

  render() {
    return (
      <div className="dashboard-bg">
        <Chat />
        <Header />
        <Sidebar />
        <Content />
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
