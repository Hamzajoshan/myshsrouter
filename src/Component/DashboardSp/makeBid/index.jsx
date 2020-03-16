import React, { Component } from "react";
import $ from "jquery";
import ImageUpload from "../imagUpload";
import { baseUrl } from "./../../../config.js";
import { withNamespaces } from "react-i18next";
import decode from "jwt-decode";
import cookie from "react-cookies";
import SweetAlert from "@sweetalert/with-react";
import "./index.css";
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bidPrice: "",
      paymentTerms: "",
      comments: "",
      startDate: "",
      endDate: "",
      isChecked1: true,
      isChecked2: false,
      checkboxData: "",
      day: "",
      month: "",
      year: "",
      bidPriceLabel: "",
      paymentTermsLabel: "",
      commentsLabel: "",
      startDateLabel: "",
      endDateLabel: "",
      dayLabel: "",
      monthLabel: "",
      yearLabel: "",
      bidId: "",
      userId: "",
      pricetype: "per meter",
      validityInDays: "",
      compleationTime: "",
      token: "",
      compleationTimeCheck: "",
      attachmentFiles: [],
      attachmentFilesError: ""
    };
    this.bidPrice = this.bidPrice.bind(this);
    this.paymentTerms = this.paymentTerms.bind(this);
    this.comments = this.comments.bind(this);
    this.handleChecked1 = this.handleChecked1.bind(this);
    this.handleChecked2 = this.handleChecked2.bind(this);
    this.day = this.day.bind(this);
    this.month = this.month.bind(this);
    this.year = this.year.bind(this);
    this.makebid = this.makebid.bind(this);
    this.onPriceTypeChange = this.onPriceTypeChange.bind(this);
    this.compleationTime = this.compleationTime.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }
  componentWillMount() {
    this.setState({
      bidId: this.props.match.params.projectId
    });
  }
  componentDidMount() {
    if (cookie.load("Token")) {
      let tokenuncoded = cookie.load("Token");
      let token = decode(cookie.load("Token"));
      this.setState({ userId: token.ReffID, token: tokenuncoded });
    }

    if (cookie.load("Language")) {
      let langCookie = cookie.load("Language");

      if (langCookie == "ar") {
        $(".main-bid-form").css("direction", "rtl");
        $(".main-bid-form").css("text-align", "right");

        // $(".right-left").css('display','0px');
      } else if (langCookie == "en") {
        $(".main-bid-form").css("direction", "ltr");
        $(".main-bid-form").css("text-align", "left");
      }
    } else {
      $(".main-bid-form").css("direction", "rtl");
      $(".main-bid-form").css("text-align", "right");
    }
  }
  compleationTime = e => {
    let date = new Date(e.target.value);

    this.setState({
      compleationTime: e.target.value,
      compleationTimeCheck: date
    });
  };
  onPriceTypeChange = e => {
    this.setState({
      pricetype: e.target.value
    });
  };
  bidPrice = e => {
    this.setState({
      bidPrice: e.target.value,
      bidPriceLabel: ""
    });
  };
  handleFileUpload(item, title) {
    let previousArray = this.state.attachmentFiles;
    let message = {
      url: item,
      title: title
    };
    previousArray.push(message);

    this.setState({
      attachmentFiles: previousArray,
      attachmentFilesError: false
    });
  }
  paymentTerms = e => {
    this.setState({
      paymentTerms: e.target.value,
      paymentTermsLabel: ""
    });
  };
  comments = e => {
    this.setState({
      comments: e.target.value,
      commentsLabel: ""
    });
  };
  startDate = e => {
    // let date = new Date(e.target.value);

    this.setState({
      startDate: e.target.value,
      startDateLabel: ""
    });

    //
  };
  endDate = e => {
    let dt2 = new Date(e.target.value);

    let dt1 = new Date(this.state.startDate);

    //finding the days
    let Validity = Math.floor(
      (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
        Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
        (1000 * 60 * 60 * 24)
    );

    this.setState({
      endDate: e.target.value,
      endDateLabel: "",
      validityInDays: Validity
    });
  };
  handleChecked1(e) {
    this.setState({
      isChecked1: true,
      isChecked2: false,
      checkboxData: e.target.value
    });
    //
  }
  handleChecked2(e) {
    this.setState({
      isChecked1: false,
      isChecked2: true,
      checkboxData: e.target.value
    });
    //
  }
  day(e) {
    this.setState({
      day: e.target.value,
      dayLabel: ""
    });
  }
  month(e) {
    this.setState({
      month: e.target.value,
      monthLabel: ""
    });
  }
  year(e) {
    this.setState({
      year: e.target.value,
      yearLabel: ""
    });
  }
  makebid = e => {
    const {
      bidPrice,
      paymentTerms,
      comments,
      compleationTime,
      attachmentFiles,
      startDate,
      endDate
    } = this.state;
    e.preventDefault();
    this.setState({
      loading: true,
      submitDisabled: true
    });
    // const =this.state.{Fname,Lname,email,password, confirmPassword}
    if (
      bidPrice === "" ||
      paymentTerms === "" ||
      comments === "" ||
      startDate === "" ||
      endDate === "" ||
      attachmentFiles.length <= 0 ||
      compleationTime === ""
    ) {
      if (bidPrice === "") {
        // $(this.refs['fname']).focus();
        this.setState({
          bidPriceLabel: !this.state.bidPriceLabel,
          loading: false,
          submitDisabled: false
        });
      }
      if (paymentTerms === "") {
        // $(this.refs['lname']).focus();

        this.setState({
          paymentTermsLabel: !this.state.paymentTermsLabel,
          loading: false,
          submitDisabled: false
        });
      }

      if (comments === "") {
        // $(this.refs['email']).focus();

        this.setState({
          commentsLabel: !this.state.commentsLabel,
          loading: false,
          submitDisabled: false
        });
      }
      if (startDate === "") {
        // $(this.refs['phone']).focus();

        this.setState({
          startDateLabel: !this.state.startDateLabel,
          loading: false,
          submitDisabled: false
        });
      }
      if (endDate === "") {
        // $(this.refs['username']).focus();

        this.setState({
          endDateLabel: !this.state.endDateLabel,
          loading: false,
          submitDisabled: false,
          endDateShowError: this.props.t("end_date_req")
        });
      }
      if (endDate !== "" && startDate !== "") {
        if (this.state.startDate > this.state.endDate) {
          this.setState({
            endDateLabel: !this.state.endDateLabel,
            loading: false,
            submitDisabled: false,
            endDateShowError: this.props.t("end_date_greater")
          });
        }
      }

      if (endDate !== "") {
        let dt1 = new Date(this.state.endDate);
        let year = dt1.getFullYear();
        if (year > 2030) {
          this.setState({
            endDateLabel: !this.state.endDateLabel,
            loading: false,
            submitDisabled: false,
            endDateShowError: this.props.t("less_than_2030")
          });
        }
      }

      if (this.state.attachmentFiles.length <= 0) {
        // $('.focus-border').attr('className','.focus-border1');
        this.setState({
          attachmentFilesError: !this.state.attachmentFilesError,
          loading: false,
          submitDisabled: false
        });
      }
    } else {
      this.setState({
        loading: true,
        submitDisabled: true
      });
      const {
        bidPrice,
        paymentTerms,
        bidId,
        userId,
        pricetype,
        compleationTime,
        checkboxData,
        validityInDays,

        attachmentFiles
      } = this.state;

      //

      fetch(`${baseUrl}api/services/app/BidAppservice/BidonProjectAsync`, {
        method: "post",
        redirect: "follow",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + this.state.token
        },
        mode: "cors",

        body: JSON.stringify({
          completionTime: compleationTime,
          price: bidPrice,
          description: paymentTerms,
          projectId: bidId,
          serviceProviderId: userId,
          priceType: pricetype,
          paymentTerms: checkboxData,
          attachments: "attachmentFiles",
          offerValidity: validityInDays,
          documents: attachmentFiles
        })
      })
        .then(function(response) {
          return response.json(); //response.json() is resolving its promise. It waits for the body to load
        })
        .then(
          responseData => {
            if (!responseData.success) {
              //
              this.setState({
                errormessage: responseData.error.details,
                success: false
              });
              SweetAlert(
                <div style={{ color: "red" }}>
                  <h1>
                    {" "}
                    <strong>Error!</strong>
                  </h1>
                  <p style={{ fontSize: "20px" }}>{this.state.errormessage}</p>
                </div>
              );
              this.setState({
                submitDisabled: false,

                errormessage: false,
                success: responseData.success,
                loading: false
              });
            }
            if (responseData.success === true) {
              this.setState({
                success: !this.state.success
              });
              //  return <Link to='/dashboard'/>
              // this.props.history.push('/dashboard');

              SweetAlert(
                <div style={{ color: "green" }}>
                  <h1>
                    {" "}
                    <strong>Success!</strong>
                  </h1>
                  <p style={{ fontSize: "20px" }}>
                    {this.props.t("bid_place_sucssess")}.
                  </p>
                </div>
              );

              this.props.history.push("/mydashboard");
            }
          },
          error => {
            // this.setState({
            //   errormessage:error,
            // });
          }
        )
        .catch(error => {});
    }
  };

  backButton = () => {
    this.props.history.push("/mydashboard");
  };

  render() {
    // $(document).ready(function(){

    //   $(".col-md-6 input").val("");

    //   $(".input-effect-bidding input").focusout(function(){
    //     if($(this).val() != ""){
    //       $(this).addClass("has-content");
    //     }else{
    //       $(this).removeClass("has-content");
    //     }
    //   })
    // });
    return (
      <div>
        <section>
          <div className="col-md-12 pb-5 d-flex justify-content-center">
            <div className="col-md-8 mt-5  d-flex justify-content-center main-bid-form">
              <form onSubmit={this.makebid}>
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-6">
                      {/* <div className="col-md-12 input-effect-bidding mt-5">
            <label className="label" >First Name</label>
            <input className="effect-16-bidding bidding" type="text" placeholder=""/>
            <span className="focus-border-bidding"></span>
          </div> */}
                      <div className="col-md-12 input-effect-bidding mt-5">
                        <label className="label">
                          {this.props.t("bid_price")}
                        </label>
                        <input
                          className="effect-16-bidding bidding"
                          autoFocus={true}
                          type="number"
                          placeholder=""
                          onChange={this.bidPrice}
                          value={this.state.bidPrice}
                        />

                        {this.state.bidPriceLabel ? (
                          <p
                            className="text-danger"
                            style={{ zIndex: "1", position: "relative" }}
                          >
                            {this.props.t("bid_price_req")}
                          </p>
                        ) : null}

                        {/* <span className="focus-border-bidding"></span> */}
                      </div>
                      <div className="col-md-12 input-effect-bidding mt-5 pt-0 pl-3">
                        <h4 className="h4">{this.props.t("payment_terms")}</h4>
                      </div>
                      <div className="col-md-12 input-effect-bidding mt-5 row">
                        <div className="col-md-6 row">
                          <input
                            className="mt-1"
                            type="radio"
                            value="add term"
                            onChange={this.handleChecked1}
                            checked={this.state.isChecked1}
                          />
                          <p style={{ color: "#fff" }}>
                            {this.props.t("add_term")}
                          </p>
                        </div>
                        <div className="col-md-6 row">
                          <input
                            className="mt-1"
                            type="radio"
                            value="percentage"
                            onChange={this.handleChecked2}
                            checked={this.state.isChecked2}
                          />
                          <p style={{ color: "#fff" }}>
                            {this.props.t("percentage")}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-12 input-effect-bidding mt-4 ">
                        <textarea
                          name=""
                          id="text-area"
                          cols="40"
                          rows="5"
                          placeholder={this.props.t("description_here")}
                          onChange={this.paymentTerms}
                          value={this.state.paymentTerms}
                        >
                          {this.state.paymentTrems}
                        </textarea>
                        {this.state.paymentTermsLabel ? (
                          <label className="text-danger"></label>
                        ) : null}
                        {/* <span className="focus-border-bidding"></span> */}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="col-md-12 input-effect-bidding mt-5">
                        <label className="label">
                          {this.props.t("price_type")}
                        </label>
                        <select
                          className="form-control mainLoginInput"
                          id="inputDado22"
                          value={this.state.pricetype}
                          onChange={this.onPriceTypeChange}
                        >
                          <option value="per meter">Per Meter</option>
                          <option value="per item">Per Item</option>
                          <option value="per project">Per Project</option>
                        </select>
                        {/* <input
                          className="effect-16-bidding bidding"
                          autoFocus={true}
                          type="text"
                          placeholder=""
                          onChange={this.bidPrice}
                          value={this.state.bidPrice}
                        /> */}

                        {/* <span className="focus-border-bidding"></span> */}
                      </div>
                      <div className="col-md-12 input-effect-bidding mt-4 pt-3 pl-2">
                        <h4 className="h4">{this.props.t("validity")}</h4>
                      </div>
                      <div className="col-md-12 row">
                        <div className="col-md-6 input-effect-bidding mt-5 ">
                          <label className="label">
                            {this.props.t("start_date")}
                          </label>
                          <input
                            className="effect-16-bidding bidding"
                            ref="startDate"
                            type="date"
                            onChange={this.startDate}
                            value={this.state.startdate}
                          />
                          {this.state.startDateLabel ? (
                            <p
                              className="text-danger"
                              style={{ zIndex: "1", position: "relative" }}
                            >
                              {this.props.t("start_date_req")}
                            </p>
                          ) : null}
                          {/* <span className="focus-border-bidding"></span> */}
                        </div>
                        <div className="col-md-6 input-effect-bidding mt-5">
                          <label className="label">
                            {this.props.t("end_date")}
                          </label>
                          <input
                            className="effect-16-bidding bidding"
                            ref="startDate"
                            type="date"
                            onChange={this.endDate}
                            value={this.state.enddate}
                          />

                          {this.state.endDateLabel ? (
                            <p
                              className="text-danger"
                              style={{ zIndex: "1", position: "relative" }}
                            >
                              {this.state.endDateShowError}
                            </p>
                          ) : null}
                          {/* <span className="focus-border-bidding"></span> */}
                        </div>
                        <div className="col-md-12 input-effect-bidding mt-5  pl-3">
                          <h4 className="h4">
                            {this.props.t("compleation_time")}
                          </h4>
                        </div>
                        <div className="col-md-12 input-effect-bidding row">
                          <input
                            style={{ marginLeft: "15px" }}
                            className="effect-16-bidding bidding"
                            type="date"
                            ref="startDate"
                            onChange={this.compleationTime}
                            value={this.state.compleationTime}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 input-effect-bidding mt-4 pl-3">
                      <h4 className=" pb-4 pl-3" style={{ color: "#FFF" }}>
                        {this.props.t("comments")}
                      </h4>
                      <textarea
                        name=""
                        id="textarea"
                        placeholder={this.props.t("comment_here")}
                        onChange={this.comments}
                        value={this.state.comments}
                      ></textarea>
                      <span className="focus-border-bidding"></span>
                      {this.state.commentsLabel ? (
                        <p
                          className="text-danger"
                          style={{ zIndex: "1", position: "relative" }}
                        >
                          {this.props.t("comments_required")}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
                <ImageUpload
                  triggerFileUploadForParent={this.handleFileUpload}
                />
                {this.state.attachmentFilesError ? (
                  <p className="text-danger">
                    {this.props.t("at_least_one_file")}
                  </p>
                ) : null}
                <div class="col-md-12 col-12 mb-5 d-flex justify-content-center">
                  {/* <button onClick={() =>this.backButton()}>Back</button>                  */}
                  <div class=" row ">
                    <div class="col-md-6 col-6 mt-5 attach">
                      <button
                        onClick={() => this.backButton()}
                        className="button"
                        style={{ width: "200px" }}
                      >
                        {this.props.t("back")}
                      </button>
                    </div>
                    <div class="col-md-6 col-6 mt-5 attach">
                      <button
                        className="button"
                        type="submit"
                        disabled={this.state.submitDisabled}
                        style={{ width: "200px" }}
                      >
                        {this.state.loading ? (
                          <div style={{ color: "lightgrey" }}>
                            {this.props.t("wait")}...
                          </div>
                        ) : (
                          <span> {this.props.t("place_bid")} &nbsp;</span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* </div> */}
        </section>
      </div>
    );
  }
}
export default withNamespaces()(index);
