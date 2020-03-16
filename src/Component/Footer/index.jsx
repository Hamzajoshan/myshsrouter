import React, { Component } from "react";
import imagefb from "../../images/fb.png";
import imageinsta from "../../images/insta.png";
import imagetwt from "../../images/twiter.png";
import imagein from "../../images/in.png";
import imagepint from "../../images/pint.png";
import i18n from "./../../i18n";
import cookie from "react-cookies";
// the hoc
import { withNamespaces } from "react-i18next";
import jquery from "jquery";
import $ from "jquery";
import "./index.css";
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copyRight: ""
    };
  }
 
  componentWillMount() {
    if (cookie.load("googtrans")) {
      let cookie_trans = cookie.load("googtrans");
      console.log(cookie_trans);
      if (cookie_trans == "/en/ar") {
        $("body").css("direction", "rtl");
        console.log("arabic set");
      }
      if (cookie_trans == "/en/en") {
        console.log("english set");
      }
    }
    var dt = new Date();

    this.setState({
      copyRight: dt.getFullYear()
    });
  }
  componentDidMount() {
    (function($) {
      $("#google_translate_element").click(function() {
        $(".goog-te-combo").change(function() {
          setInterval(function() {
            window.location.reload();
          }, 2000);
        });
      });
    })(jquery);
    // $('goog-te-combo').click(function())
  }
  //$( "ul.topnav > li" ).css( "border", "3px double red" );
  render() {
    return (
      <div>
        <footer>
          <div className=" footer-bg">
            <div className=" col-md-12 row  pb-5">
              <div className="col-md-2">
                <p className="text-uppercase">{this.props.t("site_map")}</p>

                <ul>
                  <li>
                    <a href="#"> {this.props.t("home")}</a>
                  </li>
                  
                  <li>
                    <a href="/"> {this.props.t("about")}</a>
                  </li>
                  <li>
                    <a href="/"> {this.props.t("how_it_work")}</a>
                  </li>
                  <li>
                    <a href="/"> {this.props.t("details")}</a>
                  </li>
                  <li>
                    <a href="/"> {this.props.t("history")}</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-2">
                <p>{this.props.t("services")}</p>
                <ul>
                  <li>
                    <a href="/"> {this.props.t("home")}</a>
                  </li>
                  <li>
                    <a href="/"> {this.props.t("about")}</a>
                  </li>
                  <li>
                    <a href="/"> {this.props.t("how_we_work")}</a>
                  </li>
                  <li>
                    <a href="/"> {this.props.t("details")}</a>
                  </li>
                  <li>
                    <a href="/"> {this.props.t("history")}</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-2">
                <p>{this.props.t("contact_us")}</p>
                <ul>
                  <li>
                    <a href="/"> {this.props.t("home")}</a>
                  </li>
                  <li>
                    <a href="/"> {this.props.t("about")}</a>
                  </li>
                  <li>
                    <a href="/"> {this.props.t("how_we_work")}</a>
                  </li>
                  <li>
                    <a href="/"> {this.props.t("details")}</a>
                  </li>
                  <li>
                    <a href="/"> {this.props.t("history")}</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-6 d-flex justify-content-center">
                <ul className="row icons">
                  <li>
                    <span>
                      <a href="/">
                        <img src={imagefb} className="fb1" alt="" />
                      </a>
                    </span>
                  </li>
                  <li>
                    <span>
                      <a href="/">
                        <img src={imageinsta} className="insta" alt="" />
                      </a>
                    </span>
                  </li>
                  <li>
                    <span>
                      <a href="/">
                        <img src={imagetwt} className="twiter" alt="" />
                      </a>
                    </span>
                  </li>
                  <li>
                    {" "}
                    <span>
                      <a href="/">
                        <img src={imagein} className="linkedin" alt="" />
                      </a>
                    </span>
                  </li>
                  <li>
                    <span>
                      <a href="/">
                        <img src={imagepint} className="pintrest" alt="" />
                      </a>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
        <div className="footer-copyright text-right py-2">
          <span>© {this.state.copyRight} </span>
        </div>
      </div>
    );
  }
}

export default withNamespaces()(index);
