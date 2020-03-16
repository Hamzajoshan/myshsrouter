import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import i18n from "./../../i18n";
import $ from "jquery";
import { connect } from "react-redux";

import cookie from "react-cookies";
// the hoc
import { withNamespaces } from "react-i18next";

// import { Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: this.props.login,
      scrollTop: 0,
      flag: true
    };
    // this.resultsDiv = React.createRef();
    this._toggleDiv = this._toggleDiv.bind(this);
    this.login = this.login.bind(this);
    // this.resultsDiv = React.createRef();
  }
  componentDidMount() {
    if (cookie.load("Language")) {
      let langCookie = cookie.load("Language");

      if (langCookie == "ar") {
        $("body").css("direction", "rtl");
        $(".arabic-lang").css("display", "none");
        $(".english-lang").css("display", "block");
        $(".header_body").css("direction", "rtl");
        $(".header-mynav .login-corner-btn").css("position", "relative");
        $(".header-mynav .header-ul").css("position", "relative");
        $(".header-mynav .login-corner-btn").css(
          "border-radius",
          "0px 0px 100px 0px"
        );
        $(".header-mynav .login-corner-btn").css("padding", "30px");
        $(".header-mynav .login-corner-btn").css("top", "-3px");
        $(".pic-wrapper").css("direction", "rtl");
        $(".trans-right-p").css("text-align", "right");
        $(".trans-right-p").css("border-right", "3px solid rgb(0, 255, 255)");
        $(".footer-bg ul li").css("text-align", "center");
        $("#colorlib-intro1 .nav-tabs .border-how-it-work").css(
          "border-left",
          "1px solid"
        );
        $("#colorlib-intro1 .nav-tabs .border-how-it-work").css(
          "border-right",
          "none"
        );
        $(".triangle-left").css("border-left", "100px solid #a9b2ba");
        $(".triangle-left").css("border-right", "none");
        $(".triangle-left").css("left", "0");
        $(".triangle-left").css("right", "inherit");
        $(".login").css("border-radius", "0px 17px 0px 0px");
        $(".sign-up").css("border-radius", "0px 0px 17px 0px");
        $(".right-side").css("border-radius", "17px 0px 0px 17px");
        $(".right-side .btSnubmit").css("width", "220px");
        $("form").css("text-align", "right");
        $(".main-select").css("direction", "ltr");
        $(".box-right").css("left", "-115px");
        $(".about-mission-right").css("left", "0");
        $(".about-mission-right").css("right", "inherit");
        $(".about-mission-right").css("text-align", "right");
        $(".about-mission-left").css("text-align", "right");
        $(".about-main-content").css("text-align", "right");
        $(".header-mynav .login-corner-btn").css("padding-bottom", "52px");
        $(".how-it-work-homepage").css("display", "none");
        $(".how-it-work-homepage10").css("display", "block");

        // $(".triangle-left").css('display','0px');
      } else if (langCookie == "en") {
        $(".arabic-lang").css("display", "block");
        $(".english-lang").css("display", "none");
      }
    } else {
      $("body").css("direction", "rtl");
      $(".arabic-lang").css("display", "none");
      $(".english-lang").css("display", "block");
      $(".header_body").css("direction", "rtl");
      $(".header-mynav .login-corner-btn").css("position", "relative");
      $(".header-mynav .header-ul").css("position", "relative");
      $(".header-mynav .login-corner-btn").css(
        "border-radius",
        "0px 0px 100px 0px"
      );
      $(".header-mynav .login-corner-btn").css("padding", "30px");
      $(".header-mynav .login-corner-btn").css("top", "-3px");
      $(".pic-wrapper").css("direction", "rtl");
      $(".trans-right-p").css("text-align", "right");
      $(".trans-right-p").css("border-right", "3px solid rgb(0, 255, 255)");
      $(".footer-bg ul li").css("text-align", "center");
      $("#colorlib-intro1 .nav-tabs .border-how-it-work").css(
        "border-left",
        "1px solid"
      );
      $("#colorlib-intro1 .nav-tabs .border-how-it-work").css(
        "border-right",
        "none"
      );
      $(".triangle-left").css("border-left", "100px solid #a9b2ba");
      $(".triangle-left").css("border-right", "none");
      $(".triangle-left").css("left", "0");
      $(".triangle-left").css("right", "inherit");
      $(".login").css("border-radius", "0px 17px 0px 0px");
      $(".sign-up").css("border-radius", "0px 0px 17px 0px");
      $(".right-side").css("border-radius", "17px 0px 0px 17px");
      $(".right-side .btSnubmit").css("width", "220px");
      $("form").css("text-align", "right");
      $(".main-select").css("direction", "ltr");
      $(".box-right").css("left", "-115px");
      $(".about-mission-right").css("left", "0");
      $(".about-mission-right").css("right", "inherit");
      $(".about-mission-right").css("text-align", "right");
      $(".about-mission-left").css("text-align", "right");
      $(".about-main-content").css("text-align", "right");
      $(".header-mynav .login-corner-btn").css("padding-bottom", "52px");
      $(".how-it-work-homepage").css("display", "none");
      $(".how-it-work-homepage10").css("display", "block");
    }
  }
  changeLanguage = lng => {
    setTimeout(function() {
      if (lng === "ar") {
        $("body").css("direction", "rtl");
        $(".arabic-lang").css("display", "none");
        $(".english-lang").css("display", "block");
        $(".header_body").css("direction", "rtl");
        $(".header-mynav .login-corner-btn").css("position", "relative");
        $(".header-mynav .header-ul").css("position", "relative");
        $(".header-mynav .login-corner-btn").css(
          "border-radius",
          "0px 0px 100px 0px"
        );
        $(".header-mynav .login-corner-btn").css("padding", "30px");
        $(".header-mynav .login-corner-btn").css("top", "-3px");
        $(".pic-wrapper").css("direction", "rtl");
        $(".trans-right-p").css("text-align", "right");
        $(".trans-right-p").css("border-right", "3px solid rgb(0, 255, 255)");
        $(".footer-bg ul li").css("text-align", "center");
        $("#colorlib-intro1 .nav-tabs .border-how-it-work").css(
          "border-left",
          "1px solid"
        );
        $("#colorlib-intro1 .nav-tabs .border-how-it-work").css(
          "border-right",
          "none"
        );
        $(".triangle-left").css("border-left", "100px solid #a9b2ba");
        $(".triangle-left").css("border-right", "none");
        $(".triangle-left").css("left", "0");
        $(".triangle-left").css("right", "inherit");
        $(".login").css("border-radius", "0px 17px 0px 0px");
        $(".sign-up").css("border-radius", "0px 0px 17px 0px");
        $(".right-side").css("border-radius", "17px 0px 0px 17px");
        $(".right-side .btSnubmit").css("width", "220px");
        $("form").css("text-align", "right");
        $(".main-select").css("direction", "ltr");
        $(".box-right").css("left", "-115px");
        $(".about-mission-right").css("left", "0");
        $(".about-mission-right").css("right", "inherit");
        $(".about-mission-right").css("text-align", "right");
        $(".about-mission-left").css("text-align", "right");
        $(".about-main-content").css("text-align", "right");
        $(".header-mynav .login-corner-btn").css("padding-bottom", "52px");
        $(".how-it-work-homepage").css("display", "none");
        $(".how-it-work-homepage10").css("display", "block");
      } else if (lng === "en") {
        $("body").css("direction", "ltr");
        $(".english-lang").css("display", "none");
        $(".arabic-lang").css("display", "block");
        $(".header_body").css("direction", "ltr");
        $(".header-mynav .login-corner-btn").css("position", "absolute");
        $(".header-mynav .login-corner-btn").css(
          "border-radius",
          "0px 0px 0px 100px"
        );
        $(".header-mynav .login-corner-btn").css("padding", "0px");
        $(".header-mynav .login-corner-btn").css("padding-top", "25px");
        $(".header-mynav .login-corner-btn").css("top", "40px");
        $(".pic-wrapper").css("direction", "ltr");
        $(".trans-right-p").css("text-align", "left");
        $(".trans-right-p").css("border-left", "3px solid rgb(0, 255, 255)");
        $(".footer-bg ul li").css("text-align", "left");
        $("#colorlib-intro1 .nav-tabs .border-how-it-work").css(
          "border-left",
          "none"
        );
        $("#colorlib-intro1 .nav-tabs .border-how-it-work").css(
          "border-right",
          "1px solid"
        );
        $(".triangle-left").css("border-right", "100px solid #a9b2ba");
        $(".triangle-left").css("border-left", "none");
        $(".triangle-left").css("left", "inherit");
        $(".triangle-left").css("right", "0");
        $(".login").css("border-radius", "17px 0px 0px 0px");
        $(".sign-up").css("border-radius", "0px 0px 0px 17px");
        $(".right-side").css("border-radius", "0px 17px 17px 0px");
        $("form").css("text-align", "left");
        $(".main-select").css("direction", "ltr");
        $(".box-right").css("left", "155px");
        $(".about-mission-right").css("left", "inherit");
        $(".about-mission-right").css("right", "0");
        $(".about-mission-right").css("text-align", "left");
        $(".about-mission-left").css("text-align", "left");
        $(".about-main-content").css("text-align", "left");
        $(".how-it-work-homepage").css("display", "block");
        $(".how-it-work-homepage10").css("display", "none");
      }
      cookie.save("Language", lng);
      i18n.changeLanguage(lng);
    }, 1000);
  };
  componentWillUnmount() {
    // console.log("unmounted")
    // console.log(this.state.flag)
    // if(this.state.flag){
    //   console.log('called')
    // $(window).resize();
    // this.scrollFunction1();
    // }
  }
  componentWillMount() {
    if (this.state.flag) {
      $(window).resize();
      this.scrollFunction();
    }
    this.setState({
      flag: false
    });
  }
  componentDidUpdate() {
    if (this.state.flag) {
      this.scrollFunction();
    }
  }
  login() {
    this.setState({
      login: !this.state.login
    });
    // return this.props.history.push('/choose-signup');
  }

  _toggleDiv() {
    $(this.refs["toggle-div"]).toggle();
  }
  scrollFunction = () => {
    // if(this.props.Token===''){
    $(window).resize(function(event) {
      var size = $(window).width();
      $(window).scroll(function(event) {
        var scroll = $(window).scrollTop();
        if (scroll > 0 && size > 1110) {
          $("#header-mynav").attr("class", "header-mynav1");
        } else {
          $("#header-mynav").attr("class", "header-mynav");
        }
      });
    });
    // }
  };
  scrollFunction1 = () => {
    if (this.props.Token === "") {
      $(window).resize(function(event) {
        var size = $(window).width();
        $(window).scroll(function(event) {
          var scroll = $(window).scrollTop();
          if (scroll > 11331150 && size > 1111110) {
            $("#header-mynav").attr("class", "header-mynav1");
          } else {
            $("#header-mynav").attr("class", "header-mynav");
          }
        });
      });
    }
  };

  render() {
    //   if(this.state.flag){
    // this.scrollFunction();
    //   }

    //    $('document').ready(function () {

    // 		// RESTYLE THE DROPDOWN MENU
    //     $('#google_translate_element').on("click", function () {

    //         // Change font family and color
    //         $("iframe").contents().find(".goog-te-menu2-item div, .goog-te-menu2-item:link div, .goog-te-menu2-item:visited div, .goog-te-menu2-item:active div, .goog-te-menu2 *")
    //             .css({
    //                 'color': '#544F4B',
    //                 'font-family': 'Roboto',
    // 								'width':'100%'
    //             });
    //         // Change menu's padding
    //         $("iframe").contents().find('.goog-te-menu2-item-selected').css ('display', 'none');

    // 				// Change menu's padding
    //         $("iframe").contents().find('.goog-te-menu2').css ('padding', '0px');

    //         // Change the padding of the languages
    //         $("iframe").contents().find('.goog-te-menu2-item div').css('padding', '20px');

    //         // Change the width of the languages
    //         $("iframe").contents().find('.goog-te-menu2-item').css('width', '10%');
    //         $("iframe").contents().find('td').css('width', '100%');

    //         // Change hover effects
    //         $("iframe").contents().find(".goog-te-menu2-item div").hover(function () {
    //             $(this).css('background-color', '#4385F5').find('span.text').css('color', 'white');
    //         }, function () {
    //             $(this).css('background-color', 'transparent').find('span.text').css('color', '#544F4B');
    //         });

    //         // Change Google's default blue border
    //         $("iframe").contents().find('.goog-te-menu2').css('border', 'none');

    //         // Change the iframe's box shadow
    //         $(".goog-te-menu-frame").css('box-shadow', '0 0px 0px 0px rgba(0, 0, 0, 0.14), 0 0px 0px 0px rgba(0, 0, 0, 0.12), 0 0px 0px 0px rgba(0, 0, 0, 0.3)');

    //         // Change the iframe's size and position?
    //         $(".goog-te-menu-frame").css({
    //           'position': 'absolute',
    //             'height': '10%',
    //             'width': '10%',
    //             // 'top': '0px'
    //         });
    //         // Change iframes's size
    //         $("iframe").contents().find('.goog-te-menu2').css({
    //             'height': '10%',
    //             'width': '50%'
    //         });
    //     });
    // });

    return (
      <div>
        <div className="header_body">
          <nav id="header-mynav" ref="header-mynav" className="header-mynav">
            <div
              className="col-md-12 english-lang"
              style={{ backgroundColor: "#2699fb", height: "40px" }}
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
                  <Link
                    className="loader-lang"
                    to="/home/ResetPassword?key=vgv%2fBdcMOBozjv%2foz4lOmXQLwX1YncqSGU%2bLdS%2fW3Dr6auTaBHm5mTvEzrmZ1ON%2fwNwK209E%2bIKzK1kj4cPjzg%3d%3d"
                    style={{
                      color: "#fff",
                      float: "left",
                      color: "#fff",
                      cursor: "pointer"
                    }}
                  >
                    English
                  </Link>
                </p>
              </div>
            </div>
            <div
              className="col-md-12 arabic-lang"
              style={{
                backgroundColor: "#2699fb",
                height: "40px",
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

            <span className="h-brand">
              <Link to="/">
                <strong style={{ color: "#fff" }}>
                  {" "}
                  S<span style={{ color: "rgb(39, 255, 239)" }}>H</span>S
                </strong>
              </Link>
              <span className="bars" onClick={this._toggleDiv}>
                <i className="fa fa-bars" />
              </span>
            </span>

            <span className="menu" ref="toggle-div">
              <ul className="header-ul">
                <li className="header-li">
                  <Link to="/">
                    <a className="header-a" href="/">
                      {this.props.t("home")}
                    </a>
                  </Link>
                </li>
                <li className="header-li">
                  <Link className="header-a" to="/howitwork">
                    {this.props.t("how_it_work")}
                  </Link>
                </li>
                <li className="header-li">
                  <Link className="header-a" to="/blog">
                    {this.props.t("blog")}
                  </Link>
                </li>

                <li className="header-li">
                  <Link className="header-a" to="/about">
                    {this.props.t("about")}{" "}
                  </Link>
                </li>

                <li className="ul-login header-li">
                  {" "}
                  {this.state.login ? (
                    <Link
                      onClick={this.login}
                      className="signbtn"
                      style={{ textDecoration: "none" }}
                      to="/choose-signup"
                    >
                      <button>{this.props.t("signup")}</button>
                    </Link>
                  ) : (
                    <Link
                      onClick={this.login}
                      className="signbtn"
                      to="/Login"
                      style={{ textDecoration: "none" }}
                    >
                      <button>{this.props.t("signin")}</button>
                    </Link>
                  )}
                </li>
              </ul>
            </span>
            {this.state.login ? (
              <Link
                className="login-corner-btn"
                onClick={this.login}
                style={{ textDecoration: "none" }}
                to="/choose-signup"
              >
                {this.props.t("signup")}
              </Link>
            ) : (
              <Link
                className="login-corner-btn"
                onClick={this.login}
                to="/Login"
                style={{ textDecoration: "none" }}
              >
                {this.props.t("signin")}
              </Link>
            )}

            {/* </div> */}
          </nav>
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

export default withNamespaces()(connect(mapStateToProps)(index));
