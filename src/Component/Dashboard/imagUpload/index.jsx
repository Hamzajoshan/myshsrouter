import React from "react";
import { withNamespaces } from "react-i18next";
// import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import { baseUrl } from "./../../../config.js";
import "./index.css";
import Loader from "./../../loader2";
import SweetAlert from "@sweetalert/with-react";
// import ok from '../../../images/images-info/ok.png';

// import "react-datepicker/dist/react-datepicker.css";
// import { throwStatement } from '@babel/types';
// import { threadId } from 'worker_threads';
// import ProjectType from '../ProjectType';

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      documentImage: baseUrl + "Uploads/11122020-order-512.png",
      imagePreviewUrl: "",
      loading: false,
      imageTitle: "",
      imageSizeError: false,
      fileCount: 0,
      fileCountError: false,
      titleError: false,
      imageError: false,
      IsImageUploaded: true,
      success: false,
      ext: "",
      d_file: ""
    };
    this.handleImageTitle = this.handleImageTitle.bind(this);
  }

  handleImageTitle = e => {
    this.setState({
      imageTitle: e.target.value,
      titleError: false
    });
  };
  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    // console.log(this.state.file);
    if (this.state.imageTitle === "") {
      this.setState({
        titleError: true
      });
      return;
    }
    if (this.state.file === "") {
      this.setState({
        imageError: true
      });
      return;
    }
    if (this.state.file.size > 5242880) {
      this.setState({
        imageSizeError: true
      });
      return;
    } else if (this.state.fileCount >= 5) {
      this.setState({
        fileCountError: true
      });
      return;
    }
    this.setState({
      loading: true
    });

    var formData = new FormData();
    formData.append("files", this.state.file);

    //Make Call To API

    fetch(`${baseUrl}api/services/app/Uploads/UploadFilesAsync`, {
      method: "POST",
      body: formData
    })
      .then(function(response) {
        return response.json(); //response.json() is resolving its promise. It waits for the body to load
      })
      .then(
        responseData => {
          if (!responseData.success) {
            // console.log(responseData.error.message)
            this.setState({
              errormessage: responseData.error.details,
              success: false,
              loading: false
            });

            this.setState({
              submitDisabled: false,

              errormessage: false,
              success: responseData.success,
              loading: false,
              fileCountError: false,
              imageError: false,
              imageSizeError: false
            });
          } else {
            //put the logic of file url here kh
            console.log(responseData.result[0]);

            var exten = "";
            var file_n = "";
            // start of bid item
            let a = responseData.result[0].slice(
              8,
              responseData.result[0].length
            );
            var i = a.indexOf(".");
            exten = a.slice(i, a.length);
            file_n = a;
            // console.log("Extention = "+exten)

            this.setState({
              d_file: file_n
            });

            this.props.triggerFileUploadForParent(
              responseData.result[0],
              this.state.imageTitle
            );
            let file_count = this.state.fileCount;
            console.log("file count", file_count);
            file_count++;
            // SweetAlert(
            //   <div style={{ color: "green" }}>
            //     <h1>
            //       {" "}
            //       <strong>Success!</strong>
            //     </h1>
            //     <p style={{ fontSize: "20px" }}>Signed up successfully.</p>
            //   </div>
            // );
            this.setState(
              {
                loading: false,
                fileCount: file_count,
                imageTitle: "",
                fileCountError: false,
                imageError: false,
                imageSizeError: false
              },
              () => {
                SweetAlert(
                  <div style={{ color: "green" }}>
                    <h1>
                      {" "}
                      <strong>Success!</strong>
                    </h1>
                    <p style={{ fontSize: "20px" }}>
                      {this.state.fileCount} Files uploaded successfully.
                    </p>
                  </div>
                );

                // console.log(this.state.fileCount);
              }
            );
          }
        },
        error => {
          // this.setState({
          //   errormessage:error,
          // });
        }
      )
      .catch(error => {
        console.log(error);
      });
  }

  _handleImageChange(e) {
    e.preventDefault();
    if (!e.target.files[0]) {
      this.setState({
        file: "",
        imageSizeError: false
      });
      return;
    }

    let reader = new FileReader();
    let file = e.target.files[0];

    let extension = file.name.split(".").pop();
    console.log("extension", extension);
    let image_arry = ["png", "jpg", "jpeg", "gif", "PNG", "JPG", "JPEG", "GIF"];
    this.setState({
      ext: extension
    });
    if (image_arry.indexOf(extension) !== -1) {
      console.log("Image ");
      reader.onloadend = () => {
        this.setState(
          {
            file: file,

            imagePreviewUrl: reader.result,
            imageSizeError: false
          },
          () => {
            console.log("file url", this.state.imagePreviewUrl);
          }
        );
      };
      reader.readAsDataURL(file);
    } else {
      this.setState(
        {
          file: file,
          imagePreviewUrl: this.state.documentImage,
          imageSizeError: false,
          IsImageUploaded: false
        },
        () => {
          console.log("file url bro", this.state.imagePreviewUrl);
          console.log("documentImage", this.state.documentImage);
        }
      );

      console.log("not image");
    }
  }

  showFile = () => {
    console.log("hi extension", this.state.ext);

    if (
      this.state.ext == "docx" ||
      this.state.ext == "pdf" ||
      this.state.ext == "ppt" ||
      this.state.ext == "pptx" ||
      this.state.ext == "ppsx" ||
      this.state.ext == "pptm" ||
      this.state.ext == "doc" ||
      this.state.ext == "docm" ||
      this.state.ext == "docx"
    ) {
      return (
        <a target="blank" href={`${baseUrl}${this.state.d_file}`}>
          Download
        </a>
      );
    } else if (
      this.state.ext == "png" ||
      this.state.ext == "jpg" ||
      this.state.ext == "jpeg" ||
      this.state.ext == "gif" ||
      this.state.ext == "PNG" ||
      this.state.ext == "JPG" ||
      this.state.ext == "JPEG" ||
      this.state.ext == "GIF"
    ) {
      let { imagePreviewUrl } = this.state;

      return (
        <img
          style={{ width: "100%", height: "100%" }}
          src={imagePreviewUrl}
          alt="file"
        />
      );
    } else {
      console.log("Working Document", this.state.ext);
      return <p>This is a Document file...</p>;
    }
  };

  render() {
    if (this.state.success) {
    }
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <img
          data-toggle="modal"
          data-target="#exampleModal"
          src={imagePreviewUrl}
          alt="No Preview Available"
          className="img-imguploads"
        />
      );
    } else {
      $imagePreview = (
        <div className="previewText">{this.props.t("preview")}</div>
      );
    }

    const imageUploads = this.state.loading ? (
      <Loader />
    ) : (
      <input
        className="submit-attachfile"
        type="submit"
        onClick={e => this._handleSubmit(e)}
        value={this.props.t("upload_file_title")}
      />
    );
    const ImagePrviewFinal = this.state.IsImageUploaded ? (
      <div className="imgPreview col-11 col-md-11">{$imagePreview}</div>
    ) : this.state.success ? (
      <div className="imgPreview col-11 col-md-11">{$imagePreview}</div>
    ) : (
      <div className="imgPreview col-11 col-md-11">{$imagePreview}</div>
    );
    return (
      <div>
        <form onSubmit={e => this._handleSubmit(e)}>
          <div className="col-md-12 col-12 row">
            <div
              className=" col-12 col-md-5 input-effect mt-3"
              style={{ paddingLeft: "33px" }}
            >
              <label>{this.props.t("file_title")}</label>
              <input
                autocomplete="off"
                id="input"
                className="effect-16"
                type="text"
                value={this.state.imageTitle}
                onChange={this.handleImageTitle}
              />
              {this.state.titleError ? (
                <lable className="text-danger">
                  {this.props.t("title_req")}
                </lable>
              ) : null}
            </div>
            <div className="col-md-2"></div>
            <div className=" col-12 col-md-5 mt-3">
              <p style={{ color: "white" }}>{this.props.t("max_file_count")}</p>
              <input
                className="fileInput"
                type="file"
                onChange={e => this._handleImageChange(e)}
              />
            </div>
            <div className="col-md-11">
              {imageUploads}
              {this.state.imageSizeError ? (
                <label className="text-danger">
                  {this.props.t("max_file_size_count")}
                </label>
              ) : null}
              {this.state.fileCountError ? (
                <label className="text-danger">
                  {this.props.t("cannot_upload_more")}
                </label>
              ) : null}
              {this.state.imageError ? (
                <label className="text-danger">
                  {this.props.t("at_least_one_file")}
                </label>
              ) : null}
            </div>
          </div>
        </form>
        {ImagePrviewFinal}
        {/* <div className="imgPreview col-11 col-md-11">{$imagePreview}</div> */}

        {/* model kh */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Display File
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  style={{
                    width: "auto",
                    backgroundColor: "transparent",
                    color: "#000",
                    borderRadius: "0"
                  }}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">{this.showFile()}</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  style={{
                    width: "auto",
                    backgroundColor: "transparent",
                    color: "#000",
                    borderRadius: "0"
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withNamespaces()(ImageUpload);
