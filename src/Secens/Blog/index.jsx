import React, { Component } from "react";
import "./index.css";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";

import cookie from "react-cookies";
// the hoc
import { withNamespaces } from "react-i18next";

import Cover_3 from "../../images/cover_img_3.jpg";
import blog_1 from "../../images/blog-1.jpg";
// import blog_2 from "../../images/blog-2.jpg";
// import blog_3 from "../../images/blog-3.jpg";
// import blog_4 from "../../images/blog-4.jpg";
// import blog_5 from "../../images/blog-5.jpg";
// import blog_6 from "../../images/blog-6.jpg";

class index extends Component {
  render() {
    return (
      <div>
        <aside id="colorlib-hero">
          <div className="flexslider">
            <ul className="slides">
              <li
                className="slides-li"
                style={{ backgroundImage: "url(" + Cover_3 + ")" }}
              >
                <Header />
                <div className="overlay"></div>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-12 col-12 col-sm-12">
                      <div className="slider-text-inner text-center">
                        <h1 className="h1-blog-top" style={{ color: "#fff" }}>
                          {this.props.t("blog")}
                        </h1>
                        <h2 className="h2-blog-top">
                          <a href="./" className="h1-blog-top-a">
                            {this.props.t("home")}
                          </a>{" "}
                          <span style={{ color: "#fff" }}>
                            - {this.props.t("blog")}
                          </span>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </aside>
        <div id="colorlib-blog">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <article
                  className="animate-box article"
                  style={{ boxShadow: "0px 2px 20px #888888" }}
                >
                  <a
                    href="#"
                    className="blog-img text-center"
                    style={{ backgroundImage: "url(" + blog_1 + ")" }}
                  >
                    <span className="icon">
                      <i className="icon-search2 blog-icon-article"></i>
                    </span>
                  </a>
                  <div className="entry">
                    <h2 className="blogbox-h2">
                      <a href="#" className="blogbox-h2-a">
                        Construction was awarded with “The Best Construction
                        Company” prize
                      </a>
                    </h2>
                    <p className="meta-2">
                      <span className="iconx-span">
                        <i className="icon-calendar2 iconx"></i> March 1, 2017
                      </span>
                      <span className="iconx-span">
                        <i className="icon-user iconx"></i> Admin
                      </span>
                      <span className="iconx-span">
                        <i className="icon-dropbox iconx"></i> Articles
                      </span>
                    </p>
                    <p>
                      Far far away, behind the word mountains, far from the
                      countries Vokalia and Consonantia, there live the blind
                      texts. Separated they live in Bookmarksgrove right at the
                      coast of the Semantics, a large language ocean.
                    </p>
                  </div>
                </article>
              </div>
              <div className="col-md-6">
                <article
                  className="animate-box article"
                  style={{ boxShadow: "0px 2px 20px #888888" }}
                >
                  <a
                    href="#"
                    className="blog-img text-center"
                    style={{ backgroundImage: "url(" + blog_1 + ")" }}
                  >
                    <span className="icon">
                      <i className="icon-search2 blog-icon-article"></i>
                    </span>
                  </a>
                  <div className="entry">
                    <h2 className="blogbox-h2">
                      <a href="#" className="blogbox-h2-a">
                        Construction was awarded with “The Best Construction
                        Company” prize
                      </a>
                    </h2>
                    <p className="meta-2">
                      <span className="iconx-span">
                        <i className="icon-calendar2 iconx"></i> March 1, 2017
                      </span>
                      <span className="iconx-span">
                        <i className="icon-user iconx"></i> Admin
                      </span>
                      <span className="iconx-span">
                        <i className="icon-dropbox iconx"></i> Articles
                      </span>
                    </p>
                    <p>
                      Far far away, behind the word mountains, far from the
                      countries Vokalia and Consonantia, there live the blind
                      texts. Separated they live in Bookmarksgrove right at the
                      coast of the Semantics, a large language ocean.
                    </p>
                  </div>
                </article>
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
