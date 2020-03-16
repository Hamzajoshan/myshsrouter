import React, { Component } from "react";

import "./index.css";
import jquery from "jquery";
import SweetAlert from "@sweetalert/with-react";
import { withNamespaces } from "react-i18next";
import { Link, Redirect } from "react-router-dom";

import cookie from "react-cookies";
import decode from "jwt-decode";
import { baseUrl } from "./../../../config.js";
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: true,
      scrollTop: 0,
      name: "",
      surname: "",
      email: ""
    };

    // this.resultsDiv = React.createRef();
    // this.bignav = this.bignav.bind(this)
    // this.mynav = this.mynav.bind(this)
    // this.logout = this.logout.bind(this)

    // this.resultsDiv = React.createRef();
  }
  componentDidMount() {
    if (cookie.load("Token")) {
      let token = decode(cookie.load("Token"));
      //  console.log("cockies: "+token.sub)

      fetch(`${baseUrl}api/services/app/User/Get?Id=` + token.sub)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            let name = json.result.name;
            let surname = json.result.surname;
            let email = json.result.emailAddress;

            //  console.log("user: "+ user);
            this.setState({
              name,
              surname,
              email
            });
          }
        })
        .catch(error => {
          // console.error(error);
        });
    }
    (function($) {
      "use strict";

      var fullHeight = function() {
        $(".js-fullheight").css("height", $(window).height());
        $(window).resize(function() {
          $(".js-fullheight").css("height", $(window).height());
        });
      };
      fullHeight();

      $("#sidebarCollapse").on("click", function() {
        $("#sidebar").toggleClass("active");
      });
    })(jquery);
  }
  logout = e => {
    e.preventDefault();

    // this.props.history.push('/Login');

    SweetAlert("Are you sure you want to log out?", {
      buttons: {
        catch: {
          text: "Log out",
          value: "catch"
        },
        defeat: true
      }
    }).then(value => {
      switch (value) {
        case "catch":
          cookie.remove("Token");
          window.location.reload();

          break;

        default:
          SweetAlert("Got away safely!");
      }
    });
  };
  render() {
    if (!cookie.load("Token")) {
      return <Redirect to="/Login" />;
    }

    return (
      <div class="wrapper d-flex align-items-stretch">
        <nav id="sidebar" style={{ top: "40px" }}>
          <div class="custom-menu">
            <button
              type="button"
              id="sidebarCollapse"
              class="btn btn-primary"
            ></button>
          </div>
          <div class="img bg-wrap text-center py-4">
            <div>
              <h4 style={{ color: "#fff", borderBottom: "1px solid #fff" }}>
                SHS
              </h4>
            </div>
            <div class="user-logo">
              <div
                class="img"
                style={{ backgroundImage: "url(images/logo.jpg)" }}
              ></div>
              <h3>
                {this.state.name} {this.state.surname}
              </h3>
              <p>{this.state.email}</p>
            </div>
          </div>
          <ul class="list-unstyled components mb-5">
            <li>
              <Link to="/mydashboard">
                <span class="fa fa-dashboard mr-3"></span>{" "}
                {this.props.t("dashboard")}
              </Link>
            </li>
            <li>
              <Link to="/activeProjects">
                <span class="fa fa-user mr-3"></span>{" "}
                {this.props.t("active_project")}
              </Link>
            </li>
            <li>
              <Link to="/closedprojects">
                <span class="fa fa-user mr-3"></span>{" "}
                {this.props.t("closed_projects")}
              </Link>
            </li>
            <li>
              <Link to="/cancelledprojects">
                <span class="fa fa-user mr-3"></span>{" "}
                {this.props.t("cancelled_projects")}
              </Link>
            </li>
            {/* <li>
              <a href="#">
                <span class="fa fa-comments mr-3"></span>Drafts
              </a>
            </li> */}
            <li>
              <Link to="/changepassworduser">
                <span class="fa fa-cog mr-3"></span> {this.props.t("settings")}
              </Link>
            </li>
            <li>
              <a onClick={this.logout} href="#">
                <span class="fa fa-sign-out mr-3"></span>{" "}
                {this.props.t("logout")}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default withNamespaces()(index);
