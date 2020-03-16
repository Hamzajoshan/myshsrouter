import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./index.css";

import $ from "jquery";
import { connect } from "react-redux";

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
            {/* <div
              className="col-md-12"
              style={{ backgroundColor: "#2699fb", height: "40px" }}
            >
              <div className="container">
                <p style={{ paddingTop: "7px" }}>
                  <span style={{ color: "#fff", float:'left' }}>
                  <div id="google_translate_element"></div>
                  </span>
                </p>
              </div>
            </div> */}
            <div
              className="col-md-12"
              style={{ backgroundColor: "#2699fb", height: "40px" }}
            >
              <div className="container">
                <p style={{ paddingTop: "7px", float: "right" }}>
                <div id="google_translate_element"></div>
                </p>
              </div>
            </div>
            
            {this.state.login ? (
              <Link
                className="login-corner-btn"
                onClick={this.login}
                style={{ textDecoration: "none" }}
                to="/choose-signup"
              >
                Sign Up
              </Link>
            ) : (
              <Link
                className="login-corner-btn"
                onClick={this.login}
                to="/Login"
                style={{ textDecoration: "none" }}
              >
                Sign In
              </Link>
            )}
            
            <span className="menu" ref="toggle-div">
              <ul className="header-ul">
                <li className="header-li">
                  <Link to="/">
                    <a className="header-a" href="/">
                      Home
                    </a>
                  </Link>
                </li>
                <li className="header-li">
                  <Link className="header-a" to="/howitwork">
                    How it Works
                  </Link>
                </li>
                <li className="header-li">
                  <Link className="header-a" to="/blog">
                    Blog
                  </Link>
                </li>

                <li className="header-li">
                  <Link className="header-a" to="/about">
                    About Us{" "}
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
                      <button>Sign Up</button>
                    </Link>
                  ) : (
                    <Link
                      onClick={this.login}
                      className="signbtn"
                      to="/Login"
                      style={{ textDecoration: "none" }}
                    >
                      <button>Sign In</button>
                    </Link>
                  )}
                </li>
              </ul>
            </span>
            

            {/* </div> */}
            {/* <span className="h-brand" style={{direction:'rtl'}}>
              <Link to="/">
                <strong style={{color:"#fff"}}>
                  {" "}
                  S<span style={{ color: "rgb(39, 255, 239)" }}>H</span>S
                </strong>
                </Link>
                <span className="bars" onClick={this._toggleDiv}>
                  <i className="fa fa-bars" />
                </span>
              </span> */}
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

export default connect(mapStateToProps)(index);
