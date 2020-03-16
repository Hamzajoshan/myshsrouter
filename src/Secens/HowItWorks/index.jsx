import React, { Component } from "react";
import "./index.css";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import $ from "jquery";
import img_bg_4 from "../../images/img_bg_4.jpg";
import building_1 from "../../images/building-1.jpg";
import building_4 from "../../images/building-4.jpg";
import cookie from "react-cookies";
// the hoc
import { withNamespaces } from "react-i18next";

class index extends Component {
  constructor(props) {
    super(props);
    this.setActiveclassNameSP = this.setActiveclassNameSP.bind(this);
    this.setActiveclassNameCust = this.setActiveclassNameCust.bind(this);
    this.getStarted = this.getStarted.bind(this);
  }
  getStarted = () => {
    this.props.history.push("/login");
  };
  setActiveclassNameSP = () => {
    $("#service-provider-li").removeClass("active");
    $("#customer-li").addClass("active");
    $("#customer-section").css("display", "block");
    $("#sp-section").css("display", "none");
  };
  setActiveclassNameCust = () => {
    $("#service-provider-li").addClass("active");
    $("#customer-li").removeClass("active");
    $("#customer-section").css("display", "none");
    $("#sp-section").css("display", "block");
  };
  render() {
    return (
      <div classNameName="body">
        <aside id="colorlib-hero">
          <div className="flexslider">
            <ul className="slides">
              <li
                className="how-it-work-top-li li"
                style={{ backgroundImage: "url(" + img_bg_4 + ")" }}
              >
                <Header />

                <div className="overlay"></div>
                <div className="container-fluid">
                  <div
                    className="row"
                    style={{ textAlign: "center", display: "block" }}
                  >
                    <div className="col-md-12 col-sm-12 col-md-offset-2 slider-text1">
                      <div className="slider-text-inner text-center">
                        <h1
                          className="how-it-work-top-h1"
                          style={{ color: "#fff" }}
                        >
                          {this.props.t("how_it_work")}
                        </h1>
                        <h2
                          className="how-it-work-top-h2"
                          style={{ color: "#fff" }}
                        >
                          {this.props.t("all_services_provider")}
                        </h2>
                        <button
                          onClick={this.getStarted}
                          className="btn-how-it-work-started mt-5"
                        >
                          {this.props.t("get_started")}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div></div>
                </div>
              </li>
            </ul>
          </div>
        </aside>
        <div id="colorlib-intro1">
          <div className="container">
            <div className="row">
              <div className="col-md-12 tabulation animate-box">
                <ul className="nav nav-tabs ">
                  <li className="how-it-work-li"></li>
                  <li
                    className="border-how-it-work how-it-work-li active"
                    id="customer-li"
                    onClick={this.setActiveclassNameCust}
                  >
                    <a
                      data-toggle="tab"
                      href="#plan"
                      className="how-it-work-li-a"
                    >
                      {this.props.t("if_customer")}
                    </a>
                  </li>
                  <li
                    className="how-it-work-li"
                    id="service-provider-li"
                    onClick={this.setActiveclassNameSP}
                  >
                    <a
                      data-toggle="tab"
                      href="#modeling"
                      className="how-it-work-li-a"
                    >
                      {" "}
                      {this.props.t("if_sp")}
                    </a>
                  </li>
                </ul>
                <div
                  className="tab-content"
                  style={{ boxShadow: "0px 2px 20px #888888" }}
                >
                  <div id="plan" className="tab-pane  active">
                    <div className="row">
                      <div className="col-md-6">
                        <div
                          className="services-how-it-work"
                          style={{ backgroundImage: "url(" + building_1 + ")" }}
                        ></div>
                      </div>
                      <div className="col-md-6">
                        <div className="services-how-it-work">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Tempore, labore porro iste libero. Ad,
                            placeat, doloremque. Voluptate rem molestias ad,
                            vero delectus necessitatibus, cumque voluptatibus
                            dignissimos reiciendis officiis ab tenetur.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div id="modeling" className="tab-pane fade">
                    <div className="row">
                      <div className="col-md-6">
                        <div
                          className="services-how-it-work"
                          style={{ backgroundImage: "url(" + building_4 + ")" }}
                        ></div>
                      </div>
                      <div className="col-md-6">
                        <div className="services-how-it-work">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Porro tenetur accusamus sit, autem officia
                            quae, ex fugiat voluptatibus aliquam reiciendis
                            saepe recusandae ipsum reprehenderit placeat. Quos
                            quod enim, officiis vero.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="colorlib-services-how-it-work"
          id="customer-section"
          classNameName="mt-5 mb-5"
        >
          <div className="container">
            <div className="row">
              <div className="col-md-3 text-center animate-box">
                <div
                  className="services-how-it-work"
                  style={{ boxShadow: "0px 2px 20px #888888" }}
                >
                  <span className="icon">
                    <i className="fa fa-user icon-how-it-work"></i>
                  </span>
                  <div className="desc-how-it-work">
                    <h3 className="how-it-work-h3">{this.props.t("signup")}</h3>
                    <p className="how-it-work-p">
                      Separated they live in Bookmarksgrove right at the coast
                      of the Semantics
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 text-center animate-box">
                <div
                  className="services-how-it-work"
                  style={{ boxShadow: "0px 2px 20px #888888" }}
                >
                  <span className="icon">
                    <i className="fa fa-send-o icon-how-it-work"></i>
                  </span>
                  <div className="desc-how-it-work">
                    <h3 className="how-it-work-h3">
                      {this.props.t("post_a_job")}
                    </h3>
                    <p className="how-it-work-p">
                      Separated they live in Bookmarksgrove right at the coast
                      of the Semantics
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 text-center animate-box">
                <div
                  className="services-how-it-work"
                  style={{ boxShadow: "0px 2px 20px #888888" }}
                >
                  <span className="icon">
                    <i className="fa fa-star icon-how-it-work"></i>
                  </span>
                  <div className="desc-how-it-work">
                    <h3 className="how-it-work-h3">
                      {this.props.t("review_propsal")}
                    </h3>
                    <p className="how-it-work-p">
                      Separated they live in Bookmarksgrove right at the coast
                      of the Semantics
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-3 text-center animate-box">
                <div
                  className="services-how-it-work"
                  style={{ boxShadow: "0px 2px 20px #888888" }}
                >
                  <span className="icon">
                    <i className="fa fa-sign-in icon-how-it-work"></i>
                  </span>
                  <div className="desc-how-it-work">
                    <h3 className="how-it-work-h3">
                      {this.props.t("get_started")}
                    </h3>
                    <p className="how-it-work-p">
                      Separated they live in Bookmarksgrove right at the coast
                      of the Semantics
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="colorlib-services-how-it-work"
          id="sp-section"
          style={{ display: "none" }}
          classNameName="mt-5 mb-5"
        >
          <div className="container">
            <div className="row">
              <div className="col-md-3 text-center animate-box">
                <div
                  className="services-how-it-work"
                  style={{ boxShadow: "0px 2px 20px #888888" }}
                >
                  <span className="icon">
                    <i className="fa fa-user icon-how-it-work"></i>
                  </span>
                  <div className="desc-how-it-work">
                    <h3 className="how-it-work-h3">{this.props.t("signup")}</h3>
                    <p className="how-it-work-p">
                      Separated they live in Bookmarksgrove right at the coast
                      of the Semantics
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 text-center animate-box">
                <div
                  className="services-how-it-work"
                  style={{ boxShadow: "0px 2px 20px #888888" }}
                >
                  <span className="icon">
                    <i className="fa fa-send-o icon-how-it-work"></i>
                  </span>
                  <div className="desc-how-it-work">
                    <h3 className="how-it-work-h3">Submit A Proposal</h3>
                    <p className="how-it-work-p">
                      Separated they live in Bookmarksgrove right at the coast
                      of the Semantics
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 text-center animate-box">
                <div
                  className="services-how-it-work"
                  style={{ boxShadow: "0px 2px 20px #888888" }}
                >
                  <span className="icon">
                    <i className="fa fa-star icon-how-it-work"></i>
                  </span>
                  <div className="desc-how-it-work">
                    <h3 className="how-it-work-h3">Review Proposals</h3>
                    <p className="how-it-work-p">
                      Separated they live in Bookmarksgrove right at the coast
                      of the Semantics
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-3 text-center animate-box">
                <div
                  className="services-how-it-work"
                  style={{ boxShadow: "0px 2px 20px #888888" }}
                >
                  <span className="icon">
                    <i className="fa fa-sign-in  icon-how-it-work"></i>
                  </span>
                  <div className="desc-how-it-work">
                    <h3 className="how-it-work-h3">Get Started</h3>
                    <p className="how-it-work-p">
                      Separated they live in Bookmarksgrove right at the coast
                      of the Semantics
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withNamespaces()(index);
