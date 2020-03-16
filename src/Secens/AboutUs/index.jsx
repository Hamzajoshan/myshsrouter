import React, { Component } from "react";
import "./index.css";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";

import cookie from "react-cookies";
// the hoc
import { withNamespaces } from "react-i18next";

class index extends Component {
  render() {
    return (
      <div>
        <section className="bg-image-about">
          <Header />

          <div className="container about-main-container">
            <div className="col-md-12 col-12 col-sm-12 col-lg-12 about-main-content pb-2">
              <h2 className="about-main-content-h2">
              {this.props.t("about")} &nbsp;<span className="about-main-content-span">{this.props.t("us")}</span> 
              </h2>
              <p className="about-main-content-p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui ocia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
        </section>
        <section className="about-ppl-say-bg">
          <div className="container">
            <div className="row">
              <div className="col-md-12  text-center mb-5 mt-5">
                <h2 className="ppl-say">
                {this.props.t("what_people")} <span>{this.props.t("say")}</span>
                </h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div
                  className="carousel slide sq-crousal4"
                  data-ride="carousel"
                  id="sq-crousal4"
                >
                  <ol className="carousel-indicators">
                    <li
                      data-target="#sq-crousal4"
                      data-slide-to="0"
                      className="active carousel-indicators-li sq-crousal4-li"
                    ></li>
                    <li
                      data-target="#sq-crousal4"
                      data-slide-to="1"
                      className="carousel-indicators-li sq-crousal4-li"
                    ></li>
                    <li
                      data-target="#sq-crousal4"
                      data-slide-to="2"
                      className="carousel-indicators-li sq-crousal4-li"
                    ></li>
                  </ol>

                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <blockquote>
                        <div className="row">
                          <div className="col-md-12 d-flex justify-content-center  d-md-flex d-block text-center text-lg-left">
                            <div className="feedback-text pl-3 col-md-8">
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Maiores aliquid officia
                                similique delectus atque at perferendis, impedit
                                earum esse ad incidunt. Dignissimos ducimus
                                saepe laborum, provident nihil necessitatibus
                                magni impedit!
                              </p>
                            </div>
                          </div>
                        </div>
                      </blockquote>
                      <div className="col-md-12 d-flex justify-content-center">
                        <img
                          alt="ImageRounded"
                          className="rounded-circle"
                          src="https://s3.amazonaws.com/uifaces/faces/twitter/mantia/128.jpg"
                          style={{ width: "100px", height: "100px" }}
                        />
                      </div>
                      <div className="col-md-12 d-flex justify-content-center ppl-say-name">
                        <p className="pb-0 mb-0 ppl-say-name-p">
                          SHAHZAD SOHAIL
                        </p>
                      </div>
                      <div className="col-md-12 d-flex justify-content-center ppl-say-company">
                        <p className="ppl-say-company-p">CEO ABC COMPANY</p>
                      </div>
                    </div>

                    <div className="carousel-item">
                      <blockquote>
                        <div className="row">
                          <div className="col-md-12 d-flex justify-content-center  d-md-flex d-block text-center text-lg-left">
                            <div className="feedback-text col-md-8 pl-3">
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Ipsa, in ratione quaerat odio
                                architecto dolor, reiciendis atque nemo soluta
                                dicta, fuga ipsam commodi? Ut nam aperiam quo,
                                quam est, consequatur.
                              </p>
                            </div>
                          </div>
                        </div>
                      </blockquote>
                      <div className="col-md-12 d-flex justify-content-center">
                        <img
                          alt="ImageRounded"
                          className="rounded-circle"
                          src="https://s3.amazonaws.com/uifaces/faces/twitter/mantia/128.jpg"
                          style={{ width: "100px", height: "100px" }}
                        />
                      </div>
                      <div className="col-md-12 d-flex justify-content-center ppl-say-name">
                        <p className="pb-0 mb-0">SHAHZAD SOHAIL</p>
                      </div>
                      <div className="col-md-12 d-flex justify-content-center ppl-say-company">
                        <p className="ppl-say-company-p">CEO ABC COMPANY</p>
                      </div>
                    </div>

                    <div className="carousel-item">
                      <blockquote>
                        <div className="">
                          <div className="col-md-12  d-md-flex d-block text-center d-flex justify-content-center">
                            <div className="feedback-text pl-3 col-md-8">
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Officia debitis, adipisci,
                                inventore excepturi repudiandae non natus
                                blanditiis itaque asperiores pariatur, vero ex
                                distinctio aperiam molestias cumque ipsum,
                                sapiente nihil at.
                              </p>
                            </div>
                          </div>
                        </div>
                      </blockquote>
                      <div className="col-md-12 d-flex justify-content-center">
                        <img
                          alt="ImageRounded"
                          className="rounded-circle"
                          src="https://s3.amazonaws.com/uifaces/faces/twitter/mantia/128.jpg"
                          style={{ width: "100px", height: "100px" }}
                        />
                      </div>
                      <div className="col-md-12 d-flex justify-content-center ppl-say-name">
                        <p className="pb-0 mb-0">SHAHZAD SOHAIL</p>
                      </div>
                      <div className="col-md-12 d-flex justify-content-center ppl-say-company">
                        <p className="ppl-say-company-p">CEO ABC COMPANY</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
        </section>

        <section className="about-mission-section-bg">
          <div className="container pt-5 ">
            <div className="col-md-12 row">
              <div className="col-md-4 about-mission-left">
                <h2 className="about-mission-left-h2">
                  <span className="about-mission-left-span">{this.props.t("our")}</span> {this.props.t("mission")}
                </h2>
                <p>
                {this.props.t("we_focus")}
                </p>
              </div>
              <div className="col-md-4 d-flex justify-content-center">
                <div className="about-bbl-line">
                  <div className="about-bbl-outer-top">
                    <div className="about-bbl-inner-top"></div>
                  </div>
                  <div className="about-bbl-outer-btm">
                    <div className="about-bbl-inner-btm"></div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 about-mission-right">
                <h2 className="about-mission-right-h2">
                  <span className="about-mission-right-span">{this.props.t("our")}</span> {this.props.t("vision")}
                </h2>
                <p>
                {this.props.t("we_focus")}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact">
          <div className="contact-section">
            <div className="container">
              <form>
                <div className="row col-md-12 col-12">
                  <div className="col-md-6 col-12">
                    <div className="get-in-touch">
                      <p className="get-in-touch-p">{this.props.t("get_in_touch")}</p>
                      <h2 className="get-in-touch-h2">
                        <span className="get-in-touch-span">{this.props.t("contact")}</span>{" "}
                        {this.props.t("details")}
                      </h2>
                      <h6 className="get-in-touch-h6">
                      {this.props.t("If_you_are_interested1")}
                      </h6>
                    </div>
                    <div className="pt-3 about-contact-touch">
                      <p>
                        <i className="fa fa-envelope fa-2x"></i> info@shs.com
                      </p>
                      <p>
                        <i className="fa fa-phone fa-2x"></i> +800 1234 56 78
                      </p>
                      <p>
                        <i className="fa fa-map-marker fa-2x"></i> 121
                        Wallstreet Street, Dubai, ABC
                      </p>
                    </div>
                  </div>
                  <div className="form-lin"></div>
                  <div className="col-md-5 col-12">
                    <div className="contact-us">
                      <p className="contact-us-p">
                        {this.props.t("contact_us")}
                      </p>
                      <h2 className="contact-us-h2">
                        <span className="contact-us-span"> {this.props.t("drop_us")}</span> {this.props.t("a_line")}
                      </h2>
                      <h6 className="contact-us-h6">
                      {this.props.t("If_you_are_interested")}
                      </h6>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control about-form"
                        placeholder={this.props.t("name_star")}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control about-form"
                        id="exampleInputEmail"
                        placeholder={this.props.t("email_star")}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="tel"
                        className="form-control about-form"
                        id="telephone"
                        placeholder={this.props.t("message_star")}
                      />
                    </div>
                    <button className="about-submit-btn ">{this.props.t("send_message")}</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default withNamespaces()(index);
