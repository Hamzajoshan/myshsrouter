import React, { Component } from "react";
import cookie from "react-cookies";
// the hoc
import { withNamespaces } from "react-i18next";
import SweetAlert from "@sweetalert/with-react";
import { Link } from "react-router-dom";
import "./index.css";
import "../Sidebar/index.css";
import $ from "jquery";
import decode from "jwt-decode";
import { baseUrl } from "./../../../config.js";
import i18n from "./../../../i18n";
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: true,
      scrollTop: 0,
      dropdown: true,
      currentUser: ""
    };
    this.showSideBarResponsive = this.showSideBarResponsive.bind(this);
    this.hideSideBarResponsive = this.hideSideBarResponsive.bind(this);

    // this.resultsDiv = React.createRef();
    this.dropdown = this.dropdown.bind(this);
    // this.mynav = this.mynav.bind(this)
    this.logout = this.logout.bind(this);

    // this.resultsDiv = React.createRef();
  }

  changeLanguage = lng => {
    console.log("lng", lng);
    setTimeout(function() {
      if (lng === "ar") {
        $(".arabic-lang").css("display", "none");
        $(".english-lang").css("display", "block");
        $("body").css("direction", "ltr");
        $("#sidebar ul.components").css("direction", "rtl");
        $("#sidebar ul.components").css("text-align", "right");
        $(".content .header-profile-dropdown-a-li:last-of-type").css(
          "direction",
          "rtl"
        );
        $(".content .header-profile-dropdown-a-li:last-of-type").css(
          "text-align",
          "right"
        );
        $(".body-container").css("direction", "rtl");
        $(".sign-body").css("direction", "rtl");
      } else if (lng === "en") {
        $(".arabic-lang").css("display", "block");
        $(".english-lang").css("display", "none");
        $("body").css("direction", "ltr");
        $("#sidebar ul.components").css("direction", "ltr");
        $("#sidebar ul.components").css("text-align", "left");
        $(".content .header-profile-dropdown-a-li:last-of-type").css(
          "direction",
          "ltr"
        );
        $(".content .header-profile-dropdown-a-li:last-of-type").css(
          "text-align",
          "left"
        );
        $(".body-container").css("direction", "ltr");
        $("#basic-info").css("direction", "rtl");
      } else {
        $(".arabic-lang").css("display", "none");
        $(".english-lang").css("display", "block");
        $("body").css("direction", "ltr");
        $("#sidebar ul.components").css("direction", "rtl");
        $("#sidebar ul.components").css("text-align", "right");
        $(".content .header-profile-dropdown-a-li:last-of-type").css(
          "direction",
          "rtl"
        );
        $(".content .header-profile-dropdown-a-li:last-of-type").css(
          "text-align",
          "right"
        );
        $(".body-container").css("direction", "rtl");
        $(".sign-body").css("direction", "rtl");
      }
      cookie.save("Language", lng);
      i18n.changeLanguage(lng);
      window.location.reload(false);
    }, 1000);
  };

  componentDidMount() {
    if (cookie.load("Language")) {
      let langCookie = cookie.load("Language");
      if (langCookie == "ar") {
        $(".arabic-lang").css("display", "none");
        $(".english-lang").css("display", "block");
        $("body").css("direction", "ltr");
        $("#sidebar ul.components").css("direction", "rtl");
        $("#sidebar ul.components").css("text-align", "right");
        $(".content .header-profile-dropdown-a-li:last-of-type").css(
          "direction",
          "rtl"
        );
        $(".content .header-profile-dropdown-a-li:last-of-type").css(
          "text-align",
          "right"
        );
        $(".body-container").css("direction", "rtl");
        $(".sign-body").css("direction", "rtl");
      } else if (langCookie == "en") {
        $(".arabic-lang").css("display", "block");
        $(".english-lang").css("display", "none");
        $("body").css("direction", "ltr");
        $("#sidebar ul.components").css("direction", "ltr");
        $("#sidebar ul.components").css("text-align", "left");
        $(".content .header-profile-dropdown-a-li:last-of-type").css(
          "direction",
          "ltr"
        );
        $(".content .header-profile-dropdown-a-li:last-of-type").css(
          "text-align",
          "left"
        );
        $(".body-container").css("direction", "ltr");
        $("#basic-info").css("direction", "rtl");
      }
    } else {
      $(".arabic-lang").css("display", "none");
      $(".english-lang").css("display", "block");
      $("body").css("direction", "ltr");
      $("#sidebar ul.components").css("direction", "rtl");
      $("#sidebar ul.components").css("text-align", "right");
      $(".content .header-profile-dropdown-a-li:last-of-type").css(
        "direction",
        "rtl"
      );
      $(".content .header-profile-dropdown-a-li:last-of-type").css(
        "text-align",
        "right"
      );
      $(".body-container").css("direction", "rtl");
      $(".sign-body").css("direction", "rtl");
    }
  }
  logout = e => {
    e.preventDefault();

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
  hideSideBarResponsive = e => {
    e.preventDefault();
    $(".mobileResponsiveSideBar").css("display", "none");
    $(".showToggleButton").css("display", "block");
  };
  showSideBarResponsive = e => {
    e.preventDefault();

    $(".mobileResponsiveSideBar").css("display", "block");
    $(".showToggleButton").css("display", "none");
  };
  componentWillMount() {
    if (cookie.load("Token")) {
      let token = decode(cookie.load("Token"));
      //  console.log("cockies: "+token.sub)

      fetch(`${baseUrl}api/services/app/User/Get?Id=` + token.sub)
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
  logout = e => {
    e.preventDefault();
    // console.log('size');

    // this.props.history.push('/Login');
    SweetAlert("Are you sure you want to log out?", {
      buttons: {
        catch: {
          text: "Logout",
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

    // SweetAlert(
    //   <div className="alert alert-warning fade show">
    //      <h1> <strong>Log Out</strong></h1>
    //   <p style={{fontSize:"30px"}}>Are you sure you want to log out?</p>
    //  { window.location.reload()}
    //     </div>

    // )

    // if(this.state.success){
    //      return <Redirect to="/home"/>

    // }
  };
  dropdown = () => {
    this.setState({ dropdown: !this.state.dropdown });

    if (this.state.dropdown) {
      // $ ('.userImage-header').hover(
      // function () {
      $(".dropdown-content").css("display", "block");
    }
    // function () {
    else {
      $(".dropdown-content").css("display", "none");
    }
    // )
  };
  // }
  render() {
    $(window).resize(function(event) {
      if ($(window).width() > 500) {
        $("#mySidenav1").css("display", "block");
        $(".right-items").css("padding-top", "0px");
      } else {
        $("#mySidenav1").css("display", "none");
        $(".right-items").css("padding-top", "30px");

        // right-items
      }
    });

    return (
      <div>
        <div
          className="col-md-12 english-lang"
          style={{
            backgroundColor: "#2699fb",
            height: "40px",
            position: "fixed",
            zIndex: "9999",
            top: "0"
          }}
        >
          <div className="container">
            <p style={{ paddingTop: "7px" }}>
              <span
                className="loader-lang"
                onClick={() => this.changeLanguage("en")}
                style={{
                  color: "#fff",
                  float: "left",
                  color: "#fff",
                  cursor: "pointer"
                }}
              >
                English
              </span>
            </p>
          </div>
        </div>
        <div
          className="col-md-12 arabic-lang"
          style={{
            backgroundColor: "#2699fb",
            height: "40px",
            position: "fixed",
            top: "0",
            zIndex: "9999",
            display: "none"
          }}
        >
          <div className="container">
            <p
              className="loader-lang1"
              onClick={() => this.changeLanguage("ar")}
              style={{
                paddingTop: "7px",
                float: "right",
                color: "#fff",

                cursor: "pointer"
              }}
            >
              العربية
            </p>
          </div>
        </div>
        <nav
          className="navbar navbar-expand  static-top"
          style={{
            justifyContent: "space-between",
            backgroundColor: "#f5f5f5",
            marginBottom: "40px",
            height: "70px",
            position: "fixed",
            width: "100%",
            top: "40px",
            zIndex: "98",
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0px 2px 1px -1px, rgba(0, 0, 0, 0) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) -4px -6px 20px 20px"
          }}
        >
          <div className="col-md-12">
            <ul class="ul-chat">
              <li class="ul-li-chat">
                <div class="wrapper">
                  <div class="content">
                    <ul class="header-profile-dropdown">
                      <Link to="/sp_profile" class="header-profile-dropdown-a">
                        <li class="header-profile-dropdown-a-li">
                          <i class="fa fa-user pr-3"></i>
                          {this.props.t("my_profile")}
                        </li>
                      </Link>
                      <Link
                        to="/editProfileSp"
                        class="header-profile-dropdown-a"
                      >
                        <li class="header-profile-dropdown-a-li">
                          <i class="fa fa-user pr-3"></i>
                          Edit Profile
                        </li>
                      </Link>
                      <Link
                        to="/changepassworduser"
                        class="header-profile-dropdown-a"
                      >
                        <li class="header-profile-dropdown-a-li">
                          <i class="fa fa-cog pr-3"></i>
                          {this.props.t("settings")}
                        </li>
                      </Link>
                      <a
                        onClick={this.logout}
                        class="header-profile-dropdown-a"
                      >
                        <li class="header-profile-dropdown-a-li">
                          <i class="fa fa-sign-out pr-3"></i>
                          {this.props.t("logout")}
                        </li>
                      </a>
                      {/* <a  class="header-profile-dropdown-a"><li class="header-profile-dropdown-a-li">Reprehenderit</li></a>
                <a  class="header-profile-dropdown-a"><li class="header-profile-dropdown-a-li">Commodo consequat</li></a> */}
                    </ul>
                  </div>
                  <div class="parent">
                    {this.props.t("hi")}, {this.state.currentUser}
                  </div>
                </div>
              </li>
              {/* <li
                class="ul-li-chat1"
                style={{
                  borderLeft: "1px solid #cacaca",
                  marginTop: "4px",
                  height: "81px",
                  padding: "10px"
                }}
              >
                <form class="search">
                  <div class="search__wrapper">
                    <input
                      type="text"
                      name=""
                      placeholder="Search for..."
                      class="search__field"
                    />
                    <button
                      type="submit"
                      class="fa fa-search search__icon search__icon-head"
                    ></button>
                  </div>
                </form>
              </li> */}
              <li
                class="ul-li-chat2"
                style={{
                  borderLeft: "1px solid #cacaca",
                  marginTop: "4px",
                  height: "81px",
                  padding: "35px"
                }}
              >
                <i className="fa fa-bell"></i>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default withNamespaces()(index);
