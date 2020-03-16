import React, { Component } from "react";
import "./index.css";
import { baseUrl } from "./../../config.js";
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workType: "",
      province: "",
      city: "",
      Evaluation: ""
    };
    this.hanldeWorkType = this.hanldeWorkType.bind(this);
    this.handleCity = this.handleCity.bind(this);
    this.hanldeProvince = this.hanldeProvince.bind(this);
    this.handleEvaluation = this.handleEvaluation.bind(this);
    this.handleSearchSp = this.handleSearchSp.bind(this);
  }

  handleSearchSp = e => {
    e.preventDefault();
    const { workType, province, city, Evaluation } = this.state;
    let workTypeArray = [];
    let provinceArray = [];
    let cityArray = [];

    for (let i = 0; i < 3; i++) {
      cityArray.push(city);
      provinceArray.push(province);
      workTypeArray.push(workType);
    }
    console.log("");
    return;
    fetch(`${baseUrl}api/services/app/ServiceProviderType/GetParentSpTypes`)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          //
          let parentId = json.result[0].id;
          let result = json.result;
          console.log(result);
          this.setState({ result });
          let typeName;
          let serviceProvider = result.map(function(key) {});
          this.setState({
            serviceProvider,
            parentId,
            loading: false,
            submitDisabled: false
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
    //api/services/app/ServiceProvider/GetServiceProvider?city=Mecca&province=Mecca&workType=13&evaluation=1
  };

  hanldeWorkType = e => {
    console.log(e.target.value);
    this.setState({
      workType: e.target.value
    });
  };
  handleCity = e => {
    console.log(e.target.value);
    this.setState({
      city: e.target.value
    });
  };
  hanldeProvince = e => {
    console.log(e.target.value);
    this.setState({
      province: e.target.value
    });
  };
  handleEvaluation = e => {
    console.log(e.target.value);
    this.setState({
      Evaluation: e.target.value
    });
  };

  render() {
    return (
      <div className="main-div">
        <section className="bg-image-ssp">
          <div className="container ssp-main-container">
            <div className="col-md-12 ssp-main-content">
              <h3 className="ssp-main-content-h3">Hire The Best</h3>
              <h2 className="ssp-main-content-h2">Service Provider</h2>
              <p className="ssp-main-content-p">
                Fint top service providers on SHS.The best website for the short
                term, recurring and full time responsive proprty Real Estate
                Contract work.
              </p>
            </div>
            <div className="container pb-5 pt-5">
              <div className="col-md-12">
                <button className="get-started">Get Started</button>
              </div>
            </div>
          </div>
        </section>
        <section className="filter-background">
          <div className="container pb-2 ssp-main-filter">
            <div className="col-md-12 pt-2 ">
              <h4 className="ssp-main-filter-h4">Filters</h4>
            </div>
          </div>
        </section>
        <section className="ssp-main-section">
          <div className="container pb-5 ssp-main-filter">
            <div className="col-md-12 backgroung-color-dropdown">
              <div className="row">
                <div className="col-md-3 col-12 col-sm-1 col-lg-2 ssp-input-effect ssp-focus-border mt-4">
                  <input
                    type="text"
                    className="ssp-effect-16"
                    placeholder="workType"
                    value={this.state.workType}
                    onChange={this.hanldeWorkType}
                  />
                </div>
                <div className="col-md-3 col-12 col-sm-12 col-lg-2 ssp-h3-style text-center pt-4">
                  <h3>Location</h3>
                </div>
                <div className="col-md-3 col-12 col-sm-12 col-lg-3 ssp-input-effect ssp-focus-border mt-4">
                  <input
                    type="text"
                    className="ssp-effect-16"
                    placeholder="Province"
                    value={this.state.province}
                    onChange={this.hanldeProvince}
                  />
                </div>
                <div className="col-md-3 col-12 col-sm-12 col-lg-3 ssp-input-effect ssp-focus-border mt-4">
                  <input
                    type="text"
                    className="ssp-effect-16"
                    placeholder="City"
                    value={this.state.city}
                    onChange={this.handleCity}
                  />
                </div>
                <div className="col-md-2 col-12 col-sm-12 col-lg-2 ssp-input-effect ssp-focus-border mt-4">
                  <select
                    name=""
                    id=""
                    className="ssp-effect-16"
                    onChange={this.handleEvaluation}
                  >
                    <option value="1" className="option-sp">
                      Evaluation
                    </option>
                    <option value="1" className="option-sp">
                      1 Start
                    </option>
                    <option value="2" className="option-sp">
                      2 Start
                    </option>
                    <option value="3" className="option-sp">
                      3 Start
                    </option>
                    <option value="4" className="option-sp">
                      4 Start
                    </option>
                    <option value="5" className="option-sp">
                      5 Start
                    </option>
                  </select>
                </div>
                <div className="col-md-3 col-12 col-sm-12 col-lg-3 ssp-input-effect ssp-focus-border mt-4">
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Search Service Provider"
                    onClick={this.handleSearchSp}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container mt-5 mb-5">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-7 col-lg-4 col-sm-10 ssp-main-card m-2">
                  <div className="col-md-12">
                    <div className="col-md-4 col-5 ssp-location-icon row">
                      <i className="fa fa-map-marker location-sp"></i>
                      <p className="location-sp-p">Sialkot</p>
                    </div>
                  </div>
                  <div className="col-md-12 row ">
                    <div className="col-md-8 ssp-card-border-btm">
                      <p className="ssp-name">Hassan Riaz</p>
                      <p className="ssp-contractor">Contractor</p>
                      <div className="col-md-12">
                        <div className="d-flex justify-content-center row">
                          <p className="ssp-rating">Rating</p>
                          <fieldset className="rating">
                            <input
                              type="radio"
                              id="star5"
                              name="rating"
                              className="input-radio"
                              value="5"
                            />
                            <label
                              className="full"
                              for="star5"
                              className="input-label"
                              title="Awesome - 5 stars"
                            ></label>
                            <input
                              type="radio"
                              id="star4half"
                              name="rating"
                              className="input-radio"
                              value="4 and a half"
                            />
                            <label
                              className="half"
                              for="star4half"
                              className="input-label"
                              title="Pretty good - 4.5 stars"
                            ></label>
                            <input
                              type="radio"
                              id="star4"
                              name="rating"
                              className="input-radio"
                              value="4"
                            />
                            <label
                              className="full"
                              for="star4"
                              className="input-label"
                              title="Pretty good - 4 stars"
                            ></label>
                            <input
                              type="radio"
                              id="star3half"
                              name="rating"
                              className="input-radio"
                              value="3 and a half"
                            />
                            <label
                              className="half"
                              for="star3half"
                              className="input-label"
                              title="Meh - 3.5 stars"
                            ></label>
                            <input
                              type="radio"
                              id="star3"
                              className="input-radio"
                              name="rating"
                              value="3"
                            />
                            <label
                              className="half"
                              for="star3half"
                              className="input-label"
                              title="Meh - 3.5 stars"
                            ></label>
                          </fieldset>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 pt-4 ssp-card-disc">
                    <h3 className="ssp-card-disc-h3">Discription</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Ab recusandae, ad totam placeat, inventore dolores eaque!
                      Praesentium quae iure, dolore, corporis tempore tempora at
                      distinctio maiores aliquid assumenda voluptatum
                      consectetur!
                    </p>
                  </div>
                  <div className="col-md-12 d-flex justify-content-center pb-5 pt-4">
                    <button className="view-profile">View Profile</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default index;
