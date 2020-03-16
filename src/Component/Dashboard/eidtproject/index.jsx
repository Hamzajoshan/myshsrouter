import React, { Component } from 'react';
import $ from 'jquery';
// import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import "./index.css";
import {Link,Redirect } from 'react-router-dom';
import ImageUpload from "../imagUpload";
import Footer from '../../Footer'
// import Navbar from '../Projects/navbar';
// import ok from '../../../images/images-info/ok.png';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { throwStatement } from '@babel/types';
// import { threadId } from 'worker_threads';
// import ProjectType from '../ProjectType';
import moment from 'moment';
import decode from "jwt-decode";
import cookie from 'react-cookies'
import SweetAlert from '@sweetalert/with-react';
import { baseUrl } from "./../../../config.js";



class index extends Component {
    constructor(props) {
        super(props)
        this.state={
          toggle : true,
          scrollTop: 0,
          startDate:"",
          endDate: "",
          description: '',
          length: '',
          bodies: '',
          startDateError:false,
          endDateError: false,
          endDateShowError: '',
          startDateShowError: '',
          loading: false,
          errormessage:false,
          success:false,
          submitDisabled:false,
          bodiesError:false,
          attachmentFilesError:false,
          descriptionError: false,
          lengthError: false,
          file: '',
          fileError: '',
          currentDate:moment().format("L"),
          dateContext:moment(),
          projectInfo : false,
          projectTite: '',
          projectTitleError: false,
          projectType: '',
          projectTypedata: '',
          result: [],
          pid: '',
          // projectInfo: true,
          parentInfo: false,
          contractType: '', 
          subCategory: '',
          subChildCategory: '',
          subChil1dCategory: '',
          subChil2dCategory: '',
          subChil3dCategory: '',
          subChildCategoryError: '',
          subChil1dCategoryError: '',
          subChil2dCategoryError: '',
          subChil3dCategoryError: '',
          contractTypeError: false,
          subCategoryError: false,
          tecnicalInfo: '',
          child: '',
          subChild: '',
          subChild1: '',
          subChild2: '',
          subChild3: '',
          parentId: '',
          result: '',
          p2id: '',
          p3result: '',
          p3id: '',
          p4result: '',
          p4id: '',
          p5result: '',
          p6result: '',
          p7result: '',
          p5id: '',
          p6id:'',
          p7id:'',
          p8id:'',
          projectTechnicalInfo: false,
          noChild: false,
          attachmentFiles:[],
          token:""
        }
        // this.resultsDiv = React.createRef();
        this.startDateHandle = this.startDateHandle.bind(this);
        this.addNewProject = this.addNewProject.bind(this);
        this.endDateHandle = this.endDateHandle.bind(this);
        this.descriptionHandle = this.descriptionHandle.bind(this);
        this.lengthHandle = this.lengthHandle.bind(this);
        this.bodiesHandle = this.bodiesHandle.bind(this);
        this.fileHandler = this.fileHandler.bind(this);
        this.attach = this.attach.bind(this);

        this.projectTitleHandle = this.projectTitleHandle.bind(this);
        this.submitProjectType = this.submitProjectType.bind(this);
        this.projectTypeHandle = this.projectTypeHandle.bind(this);
        this.handleFileUpload=this.handleFileUpload.bind(this);

        this.contractTypeHandle = this.contractTypeHandle.bind(this);
        this.subCategoryHandle = this.subCategoryHandle.bind(this);
        this.finish = this.finish.bind(this);
        
        


        // this.resultsDiv = React.createRef();
      }
      handleFileUpload(item){
        
        let previousArray=this.state.attachmentFiles;
        previousArray.push(item);
        
        this.setState({
          attachmentFiles:previousArray,
          attachmentFilesError:false
        });
        
      }
      componentWillMount(){
        // this.attach();
        if (cookie.load('Token')) {
          let tokenuncoded=cookie.load('Token')
          this.setState({
            token:tokenuncoded
          })
          let token = decode(cookie.load('Token'))
          this.setState({userId: token.ReffID})
          //  
          
        }

      }
      
      startDateHandle = e => {
        this.setState({
          startDate: e.target.value,
          startDateError: false
        });
      };
      endDateHandle = e => {
        this.setState({
          endDate: e.target.value,
          endDateError: false
        });
        // $(this.refs['endDate']).css(
        //   {border: 0,
        //      padding: '4px 0',
        //       'border-bottom': '1px solid #fff',
        //        'background-color': 'transparent'
        //   }
        // );
      };
      descriptionHandle = e => {
        this.setState({
          description: e.target.value,
          descriptionError: false
        });
      };
      lengthHandle = e => {
        this.setState({
          length: e.target.value,
          lengthError: false
        });
      };
      bodiesHandle = e => {
        this.setState({
          bodies: e.target.value,
          bodiesError: false
        });
      };
      fileHandler = e => {
        this.setState({
          file: e.target.value,
          fileError: false
        });
        $(this.refs['file']).css(
          {color: '#fff'}
        );
        function _(el) {
          return document.getElementById(el);
        }
        
        function uploadFile() {
          var file = _("file1").files[0];
          // alert(file.name+" | "+file.size+" | "+file.type);
          var formdata = new FormData();
          formdata.append("file1", file);
          var ajax = new XMLHttpRequest();
          ajax.upload.addEventListener("progress", progressHandler, false);
          ajax.addEventListener("load", completeHandler, false);
          ajax.addEventListener("error", errorHandler, false);
          ajax.addEventListener("abort", abortHandler, false);
          ajax.open("POST", "file_upload_parser.php"); // http://www.developphp.com/video/JavaScript/File-Upload-Progress-Bar-Meter-Tutorial-Ajax-PHP
          //use file_upload_parser.php from above url
          ajax.send(formdata);
        }
        
        function progressHandler(event) {
          _("loaded_n_total").innerHTML = "Uploaded " + event.loaded + " bytes of " + event.total;
          var percent = (event.loaded / event.total) * 100;
          _("progressBar").value = Math.round(percent);
          _("status").innerHTML = Math.round(percent) + "% uploaded... please wait";
        }
        
        function completeHandler(event) {
          _("status").innerHTML = event.target.responseText;
          _("progressBar").value = 0; //wil clear progress bar after successful upload
        }
        
        function errorHandler(event) {
          _("status").innerHTML = "Upload Failed";
        }
        
        function abortHandler(event) {
          _("status").innerHTML = "Upload Aborted";
        }
      };

      addNewProject=(e)=>{
       e.preventDefault();
     

       this.setState({
        loading:true,
        submitDisabled:true
      })
      // 
      var q = new Date();
      var m = ('0' + (q.getMonth()+1)).slice(-2);
      // var d = ('0' +( q.getDay()-1)).slice(-2);
      var d = ('0' + (this.state.dateContext.format("D")-1)).slice(-2);

      var y = q.getFullYear();
      
      var currentDate = y+"-"+m+"-"+d;
      // 
      // 
     if (this.state.startDate === '') {
      // 

        $(this.refs['startDate']).focus();
        // $('.focus-border').attr('className','.focus-border1');
        this.setState({
          startDateError: !this.state.startDateError,
          startDateShowError: "Start date required",
          loading: false,
          submitDisabled: false
        })
      }
      
     
           if (this.state.startDate < currentDate) {
            // 
      
              $(this.refs['startDate']).focus();
              // $(this.refs['startDate']).css(
              //   {border: 0,
              //     width: "100%",
              //      padding: '4px 0',
              //       'border-bottom': '2px solid rgb(250, 4, 4)',
              //        'background-color': 'transparent'
              //   }
              // );
                this.setState({
                startDateError: !this.state.startDateError,
                startDateShowError: "Start date must be greater than or equal to current date.",
                loading: false,
                submitDisabled: false
              })
            }
      else if (this.state.endDate === "") {
        $(this.refs['endDate']).focus();
        // $('.focus-border').attr('className','.focus-border1');
        this.setState({
          endDateError: !this.state.endDateError,
          loading: false,
          endDateShowError:  "End date  required",
          submitDisabled: false
        })
      }
       else if(this.state.startDate > this.state.endDate){
          // 
          $(this.refs['endDate']).focus();
        // $(this.refs['endDate']).css(
        //   {border: 0,
        //     width: "100%",
        //      padding: '4px 0',
        //       'border-bottom': '2px solid rgb(250, 4, 4)',
        //        'background-color': 'transparent'
        //   }
        // );
        this.setState({
          endDateError: !this.state.endDateError,
          loading: false,
          submitDisabled: false,
          endDateShowError:'End date must be greater than or equal start date'
        })
        }
        else if (this.state.description === "") {
          $(this.refs['description']).focus();
          // $(this.refs['des-border']).css(
          //   {border: 0,
          //     width: "100%",
          //      padding: '4px 0',
          //       'border-bottom': '2px solid rgb(250, 4, 4)',
          //        'background-color': 'transparent'
          //   }
          // );
           this.setState({
            descriptionError: !this.state.descriptionError,
            loading: false,
            submitDisabled: false
          })
        }
        else if (this.state.length === "") {
          $(this.refs['length']).focus();
          // $('.focus-border').attr('className','.focus-border1');
          this.setState({
            lengthError: !this.state.lengthError,
            loading: false,
            submitDisabled: false
          })
        }
        else if (this.state.bodies === "") {
          $(this.refs['bodies']).focus();
          // $('.focus-border').attr('className','.focus-border1');
          this.setState({
            bodiesError: !this.state.bodiesError,
            loading: false,
            submitDisabled: false
          })
        }
        else if (this.state.attachmentFiles.length <=0) {
          // $('.focus-border').attr('className','.focus-border1');
          this.setState({
            attachmentFilesError: !this.state.attachmentFilesError,
            loading: false,
            submitDisabled: false
          })
        }

        
        else{
          fetch(`${baseUrl}api/services/app/ProjectTypes/GetParentProjectTypes`)
          .then(res => res.json())
          .then(json => {
            if (json.success) {
              //  
              
              let parentResult = json.result;
              let pid = json.result[0].id;
              // 
              let projectTypedata = parentResult.map(function (key) {
                return (
    
                  <option key={key.id} value={key.typeName}>{key.typeName}</option>
    
                )
              });
              this.setState({
                projectTypedata,
                parentResult,
                pid,
                submitDisabled: false,
                loading: false,
                // projectInfo: !this.state.projectInfo
              })
            
            }
          }).catch((error) => {
            console.error(error);
          });
          // 
          this.setState({
            projectInfo: !this.state.projectInfo

          //   submitDisabled: false,
          //   loading: false,
          //   projectInfo: !this.state.projectInfo
          })
          this.wizard2();
          // alert("data entered successfully!!!!")
        }
      }
      attach=(e)=>{
      
      e.preventDefault();
      $('.attach').click(function() {
        $('#fileInput').click();
      });
      }
      currentDay=()=>{
        return this.state.dateContext.format("D");
        }


        wizard1=()=>{
            $("#addnew").css("display", "block");
            $("#type").css("display", "none");
            $("#tech").css("display", "none");


        }
        wizard2=()=>{
            $("#addnew").css("display", "none");
            $("#type").css("display", "block");
            $("#tech").css("display", "none");


        }
        wizard3=()=>{
            $("#addnew").css("display", "none");
            $("#type").css("display", "none");
            $("#tech").css("display", "block");


        }






        projectTitleHandle = e => {
            this.setState({
              projectTite: e.target.value,
              projectTitleError: false
            });
          };
          projectTypeHandle = e => {
            this.setState({
              projectType: e.target.value,
              projectTypeError: false,
              p2id: '',
              p3id: '',
              p4id: '',
              p5id: ''
            });
            // 
        // if(this.state.p2id){
            let inputArray=this.state.parentResult;
            // 
        
            let data=e.target.value;
            const result = inputArray.find( ({ typeName }) => typeName === data );
            let pid = result.id;
            
           this.setState({pid})
        // }
        // this.updateParectSP(pid)
          };
          // updateParectSP=()=>{

          // }
        
          submitProjectType = (e) => {
            e.preventDefault();
            const { startDate, endDate, length, bodies, description, projectTite, projectType, pid, userId } = this.state;
            const { p2id, p3id, p4id, p5id}= this.state;
            // 

            this.setState({
              loading: true,
              submitDisabled: true
            })
            // 
        
            if (this.state.projectTite === '') {
              // 
        
              $(this.refs['title']).focus();
              // $('.focus-border').attr('className','.focus-border1');
              this.setState({
                projectTitleError: !this.state.projectTitleError,
                loading: false,
                submitDisabled: false
              })
            }
            else {
              this.setState({
                // success: true
              })
                  
              fetch(`${baseUrl}api/services/app/ProjectTypes/GetPtChildByParentId?ParentId=`+pid)
              .then(res => res.json())
              .then(json => {
                if (json.success) {
                   
                  //  if(typeof(json.result[0]) == 'undefined'){alert('data undefined')}
                  if(typeof(json.result[0]) !== 'undefined'){
                 
                  
                  let pareant2Result = json.result;
                  let p2id = json.result[0].id;
                  let tecnicalInfo = pareant2Result.map(function (key) {
                    return (
        
                      <option key={key.id} value={key.typeName}>{key.typeName}</option>
        
                    )
                  });
                  this.setState({
                    tecnicalInfo,
                    pareant2Result,
                    p2id,
                    submitDisabled: false,
                    loading: false,
                  })
                  
                // 
        if(p2id){
                  this.subCategory(p2id);
              this.wizard3();
        }
                }
           
              else{
                
                fetch(`${baseUrl}api/services/app/Project/CreateProjectAsync`, {
              method: 'post',
              redirect: 'follow',
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: "Bearer " + this.state.token
            },
              mode: 'cors', 
             
              body: JSON.stringify(
                {
                  "title": projectTite,
                  "description": description,
                  "startDate": startDate,
                  "endDate": endDate,
                  "lengths": length,
                  "bodies": bodies,
                  "status": 1,
                  "customerId": userId,
                  "projectTypes": [
                    pid
                  ]
                }
              )
          }) .then(function (response) {
              return response.json(); //response.json() is resolving its promise. It waits for the body to load
          }).then((responseData)=> {
            if(!responseData.success){
             
              
              // 
              this.setState({
                errormessage:responseData.error.details,
                success:false
              })
              SweetAlert(
                <div style={{color: 'red'}}>
                    <h1> <strong>Error!</strong></h1>
                    <p style={{ fontSize: "20px" }}>{this.state.errormessage}</p>
                  </div>
              )
              this.setState({
                submitDisabled: false   ,
                
                
                errormessage: false,
                success:responseData.success,
                loading: false
              })
            }
            if(responseData.success===true){
              this.setState({
                success:!this.state.success
              })
            //  return <Link to='/dashboard'/>
            // this.props.history.push('/dashboard');
      
              SweetAlert(
                <div style={{color: 'green'}}>
                <h1> <strong>Success!</strong></h1>
                <p style={{ fontSize: "20px" }}>Project added successfully.</p>
      
              </div>
              )
              
      
              // this.props.history.push('/dashboard');
         
            }
          },
          (error) => {
            // this.setState({
      
            //   errormessage:error,
            // });
          }).catch(error=>{
            
          });


          //end of api call used for project adding
              }
            }
              }).catch((error) => {
                console.error(error);
              });
                   
                    this.setState({ projectTechnicalInfo:!this.state.projectTechnicalInfo})
            // return <Link to='/projectTechnicalInfo' />
              // alert("data entered successfully!!!!")
            }

          }





            contractTypeHandle = e => {
              $('.p2').css('display','none')

                $('.p3').css('display','none')
                $('.p4').css('display','none')
                this.setState({
                  contractType: e.target.value,
                  contractTypeError: false,
                  p3id: '',
                  p4id: '',
                  p5id: ''
                });
                let inputArray=this.state.pareant2Result;
                let data=e.target.value;
                const result = inputArray.find( ({ typeName }) => typeName === data );
                let p2id = result.id;
                // 
               this.setState({p2id})
               this.subCategory(p2id);
        
            
            // this.updateParectSP(parentId)
               
              };
              subCategoryHandle = e => {
                $('.p3').css('display','none')
                $('.p4').css('display','none')
        
                this.setState({
                  subCategory: e.target.value,
                  subCategoryError: false,
                  p4id: '',
                  p5id: ''
                });
                let inputArray=this.state.p3result;
                let data=e.target.value;
                const result = inputArray.find( ({ typeName }) => typeName === data );
                let p3id = result.id;
                // 
               this.setState({p3id})
               this.subCategory1(p3id);
              };
              subChildHandle = e => {
                $('.p4').css('display','none')
        
                this.setState({
                  subChildCategory: e.target.value,
                  subChildCategoryError: false,
              p5id: ''
                });
                let inputArray=this.state.p4result;
                let data=e.target.value;
                const result = inputArray.find( ({ typeName }) => typeName === data );
                let p4id = result.id;
                // 
               this.setState({p4id})
               this.subCategory2(p4id);
              };
              subChild1Handle = e => {
                this.setState({
                  subChil1dCategory: e.target.value,
                  subChild1CategoryError: false
                });
                
                let inputArray=this.state.p5result;
                let data=e.target.value;
                const result = inputArray.find( ({ typeName }) => typeName === data );
                let p5id = result.id;
                
               this.setState({p5id})
               this.subCategory3(p5id);
              };
              subChild2Handle = e => {
                this.setState({
                  subChil2dCategory: e.target.value,
                  subChil2dCategoryError: false
                });
                
                
                let inputArray=this.state.p6result;
                let data=e.target.value;
                const result = inputArray.find( ({ typeName }) => typeName === data );
                let p6id = result.id;
                
               this.setState({p6id})
               this.subCategory4(p6id);
             
              };
              subChild3Handle = e => {
                this.setState({
                  subChil3dCategory: e.target.value,
                  subChil3dCategoryError: false
                });
                
                
                let inputArray=this.state.p6result;
                let data=e.target.value;
                const result = inputArray.find( ({ typeName }) => typeName === data );
                let p7id = result.id;
                
               this.setState({p7id})
             
              };
        
        
        
        
              finish=(e)=>{
        
               e.preventDefault();
               const { startDate, endDate, length, bodies, description, projectTite, projectType, pid, userId } = this.state;
              const { p2id, p3id, p4id, p5id,p6id,p7id}= this.state;
              
              
              
              this.setState({
                loading:true,
                submitDisabled:true
              })
              // 
        
            //  if (this.state.contractType === '') {
            //   // 
        
            //     $(this.refs['contractType']).focus();
            //     // $('.focus-border').attr('className','.focus-border1');
            //     this.setState({
            //       contractTypeError: !this.state.contractTypeError,
            //       loading: false,
            //       submitDisabled: false
            //     })
            //   }
            //   else if (this.state.subCategory === "") {
            //     $(this.refs['subCategory']).focus();
            //     // $('.focus-border').attr('className','.focus-border1');
            //     this.setState({
            //       subCategoryError: !this.state.subCategoryError,
            //       loading: false,
            //       submitDisabled: false
            //     })
            //   }
              // else if (this.state.subChildCategory === "") {
              //   $(this.refs['subChild']).focus();
              //   // $('.focus-border').attr('className','.focus-border1');
              //   this.setState({
              //     subChildCategoryError: !this.state.subChildCategoryError,
              //     loading: false,
              //     submitDisabled: false
              //   })
              // }
              // else if (this.state.subChild1Category === "") {
              //   $(this.refs['subChild1']).focus();
              //   // $('.focus-border').attr('className','.focus-border1');
              //   this.setState({
              //     subChild1CategoryError: !this.state.subChild1CategoryError,
              //     loading: false,
              //     submitDisabled: false
              //   })
              // }
              if(p3id === ''){
                
                fetch(`${baseUrl}api/services/app/Project/CreateProjectAsync`, {
              method: 'post',
              redirect: 'follow',
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: "Bearer " + this.state.token
            },
              mode: 'cors', 
             
              body: JSON.stringify(
                {
                  title: projectTite,
                  description: description,
                  startDate: startDate,
                  endDate: endDate,
                  lengths: length,
                  bodies: bodies,
                  status: 1,
                  customerId: userId,
                  projectTypes: [
                    pid, p2id,
                  ]
                }
              )
          }) .then(function (response) {
              return response.json(); //response.json() is resolving its promise. It waits for the body to load
          }).then((responseData)=> {
            if(!responseData.success){
             
              
              // 
              this.setState({
                errormessage:responseData.error.details,
                success:false
              })
              SweetAlert(
                <div style={{color: 'red'}}>
                    <h1> <strong>Error!</strong></h1>
                    <p style={{ fontSize: "20px" }}>{this.state.errormessage}</p>
                  </div>
              )
              this.setState({
                submitDisabled: false   ,
                
                
                errormessage: false,
                success:responseData.success,
                loading: false
              })
            }
            if(responseData.success===true){
              this.setState({
                success:!this.state.success
              })
            //  return <Link to='/dashboard'/>
            // this.props.history.push('/dashboard');
      
              SweetAlert(
                <div style={{color: 'green'}}>
                <h1> <strong>Success!</strong></h1>
                <p style={{ fontSize: "20px" }}>Project added successfully.</p>
      
              </div>
              )
              
      
              // this.props.history.push('/dashboard');
         
            }
          },
          (error) => {
            // this.setState({
      
            //   errormessage:error,
            // });
          }).catch(error=>{
            
          });
        }
                
                  if(p4id === ''){
                    
                  fetch(`${baseUrl}api/services/app/Project/CreateProjectAsync`, {
                method: 'post',
                redirect: 'follow',
                headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json",
                  Authorization: "Bearer " + this.state.token
              },
                mode: 'cors', 
               
                body: JSON.stringify(
                  {
                    "title": projectTite,
                    "description": description,
                    "startDate": startDate,
                    "endDate": endDate,
                    "lengths": length,
                    "bodies": bodies,
                    "status": 1,
                    "customerId": userId,
                    "projectTypes": [
                      pid, p2id, p3id,
                    ]
                  }
                )
            }) .then(function (response) {
                return response.json(); //response.json() is resolving its promise. It waits for the body to load
            }).then((responseData)=> {
              if(!responseData.success){
               
                
                // 
                this.setState({
                  errormessage:responseData.error.details,
                  success:false
                })
                SweetAlert(
                  <div style={{color: 'red'}}>
                      <h1> <strong>Error!</strong></h1>
                      <p style={{ fontSize: "20px" }}>{this.state.errormessage}</p>
                    </div>
                )
                this.setState({
                  submitDisabled: false   ,
                  
                  
                  errormessage: false,
                  success:responseData.success,
                  loading: false
                })
              }
              if(responseData.success===true){
                this.setState({
                  success:!this.state.success
                })
              //  return <Link to='/dashboard'/>
              // this.props.history.push('/dashboard');
        
                SweetAlert(
                  <div style={{color: 'green'}}>
                  <h1> <strong>Success!</strong></h1>
                  <p style={{ fontSize: "20px" }}>Project added successfully.</p>
        
                </div>
                )
                
        
                // this.props.history.push('/dashboard');
           
              }
            },
            (error) => {
              // this.setState({
        
              //   errormessage:error,
              // });
            }).catch(error=>{
              
            });
          }
        
          else if(p5id === ''){
            
            fetch(`${baseUrl}api/services/app/Project/CreateProjectAsync`, {
          method: 'post',
          redirect: 'follow',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            Authorization: "Bearer " + this.state.token
        },
          mode: 'cors', 
         
          body: JSON.stringify(
            {
              "title": projectTite,
              "description": description,
              "startDate": startDate,
              "endDate": endDate,
              "lengths": length,
              "bodies": bodies,
              "status": 1,
              "customerId": userId,
              "projectTypes": [
                pid, p2id, p3id, p4id
              ]
            }
          )
        }) .then(function (response) {
          return response.json(); //response.json() is resolving its promise. It waits for the body to load
        }).then((responseData)=> {
        if(!responseData.success){
         
          
          // 
          this.setState({
            errormessage:responseData.error.details,
            success:false
          })
          SweetAlert(
            <div style={{color: 'red'}}>
            <h1> <strong>Error!</strong></h1>
            <p style={{ fontSize: "20px" }}>{this.state.errormessage}</p>
          </div>
          )
          this.setState({
            submitDisabled: false   ,
            
            
            errormessage: false,
            success:responseData.success,
            loading: false
          })
        }
        if(responseData.success===true){
          this.setState({
            success:!this.state.success
          })
          // return <Link to='/dashboard'/>
          // this.props.history.push('/dashboard');
        
          SweetAlert(
            <div style={{color: 'green'}}>
            <h1> <strong>Success!</strong></h1>
            <p style={{ fontSize: "20px" }}>Project added successfully.</p>
        
          </div>
          )
          // this.props.history.push('/dashboard');
          
        
        //  return <Link to='/dashboard'/>
        
        }
        },
        (error) => {
        // this.setState({
        
        //   errormessage:error,
        // });
        }).catch(error=>{
        
        });
        }
        else if(p6id==="") {
          
          fetch(`${baseUrl}api/services/app/Project/CreateProjectAsync`, {
        method: 'post',
        redirect: 'follow',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: "Bearer " + this.state.token
        },
        mode: 'cors', 
        
        body: JSON.stringify(
          {
            "title": projectTite,
            "description": description,
            "startDate": startDate,
            "endDate": endDate,
            "lengths": length,
            "bodies": bodies,
            "status": 1,
            "customerId": userId,
            "projectTypes": [
              pid, p2id, p3id, p4id, p5id
            ]
          }
        )
        }) .then(function (response) {
        return response.json(); //response.json() is resolving its promise. It waits for the body to load
        }).then((responseData)=> {
        if(!responseData.success){
        
        
        // 
        this.setState({
          errormessage:responseData.error.details,
          success:false
        })
        SweetAlert(
          <div style={{color: 'red'}}>
          <h1> <strong>Error!</strong></h1>
          <p style={{ fontSize: "20px" }}>{this.state.errormessage}</p>
        </div>
        )
        this.setState({
          submitDisabled: false   ,
          
          
          errormessage: false,
          success:responseData.success,
          loading: false
        })
        }
        if(responseData.success===true){
          this.setState({
            success:!this.state.success
          })
         
        
        
          // this.props.history.push('/Login');
          // SweetAlert("Are you sure you want to log out?", {
          //   buttons: {
          //     catch: {
          //       text: "Ok",
          //     },
          //   },
          // })
          // .then((value) => {
          //   switch (value) {
           
          //     case "catch":
          //       {
                  
          // // this.props.history.push('/dashboard');
                
          //       //  <Link to='/dashboard'/>
                
          //       }
          //       break;
          //   }
          // });
         
          // this.props.history.push('/dashboard');
        
        SweetAlert(
          <div style={{color: 'green'}}>
                    <h1> <strong>Success!</strong></h1>
                    <p style={{ fontSize: "20px" }}>Project added successfully.</p>
        
                  </div>
        )
        
        
        //  return <Link to='/dashboard'/>
        // this.props.history.push('/dashboard');
        
        }
        },
        (error) => {
        // this.setState({
        
        //   errormessage:error,
        // });
        }).catch(error=>{
        
        });
        }
        else if(p7id==="") {
          
          fetch(`${baseUrl}api/services/app/Project/CreateProjectAsync`, {
        method: 'post',
        redirect: 'follow',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: "Bearer " + this.state.token
        },
        mode: 'cors', 
        
        body: JSON.stringify(
          {
            "title": projectTite,
            "description": description,
            "startDate": startDate,
            "endDate": endDate,
            "lengths": length,
            "bodies": bodies,
            "status": 1,
            "customerId": userId,
            "projectTypes": [
              pid, p2id, p3id, p4id, p5id,p6id
            ]
          }
        )
        }) .then(function (response) {
        return response.json(); //response.json() is resolving its promise. It waits for the body to load
        }).then((responseData)=> {
        if(!responseData.success){
        
        
        // 
        this.setState({
          errormessage:responseData.error.details,
          success:false
        })
        SweetAlert(
          <div style={{color: 'red'}}>
          <h1> <strong>Error!</strong></h1>
          <p style={{ fontSize: "20px" }}>{this.state.errormessage}</p>
        </div>
        )
        this.setState({
          submitDisabled: false   ,
          
          
          errormessage: false,
          success:responseData.success,
          loading: false
        })
        }
        if(responseData.success===true){
          this.setState({
            success:!this.state.success
          })
         
        
        
          // this.props.history.push('/Login');
          // SweetAlert("Are you sure you want to log out?", {
          //   buttons: {
          //     catch: {
          //       text: "Ok",
          //     },
          //   },
          // })
          // .then((value) => {
          //   switch (value) {
           
          //     case "catch":
          //       {
                  
          // // this.props.history.push('/dashboard');
                
          //       //  <Link to='/dashboard'/>
                
          //       }
          //       break;
          //   }
          // });
         
          // this.props.history.push('/dashboard');
        
        SweetAlert(
          <div style={{color: 'green'}}>
                    <h1> <strong>Success!</strong></h1>
                    <p style={{ fontSize: "20px" }}>Project added successfully.</p>
        
                  </div>
        )
        
        
        //  return <Link to='/dashboard'/>
        // this.props.history.push('/dashboard');
        
        }
        },
        (error) => {
        // this.setState({
        
        //   errormessage:error,
        // });
        }).catch(error=>{
        
        });
        }
        else {
          
          fetch(`${baseUrl}api/services/app/Project/CreateProjectAsync`, {
        method: 'post',
        redirect: 'follow',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: "Bearer " + this.state.token
        },
        mode: 'cors', 
        
        body: JSON.stringify(
          {
            "title": projectTite,
            "description": description,
            "startDate": startDate,
            "endDate": endDate,
            "lengths": length,
            "bodies": bodies,
            "status": 1,
            "customerId": userId,
            "projectTypes": [
              pid, p2id, p3id, p4id, p5id,p6id,p7id
            ]
          }
        )
        }) .then(function (response) {
        return response.json(); //response.json() is resolving its promise. It waits for the body to load
        }).then((responseData)=> {
        if(!responseData.success){
        
        
        // 
        this.setState({
          errormessage:responseData.error.details,
          success:false
        })
        SweetAlert(
          <div style={{color: 'red'}}>
          <h1> <strong>Error!</strong></h1>
          <p style={{ fontSize: "20px" }}>{this.state.errormessage}</p>
        </div>
        )
        this.setState({
          submitDisabled: false   ,
          
          
          errormessage: false,
          success:responseData.success,
          loading: false
        })
        }
        if(responseData.success===true){
          this.setState({
            success:!this.state.success
          })
         
        
        
          // this.props.history.push('/Login');
          // SweetAlert("Are you sure you want to log out?", {
          //   buttons: {
          //     catch: {
          //       text: "Ok",
          //     },
          //   },
          // })
          // .then((value) => {
          //   switch (value) {
           
          //     case "catch":
          //       {
                  
          // // this.props.history.push('/dashboard');
                
          //       //  <Link to='/dashboard'/>
                
          //       }
          //       break;
          //   }
          // });
         
          // this.props.history.push('/dashboard');
        
        SweetAlert(
          <div style={{color: 'green'}}>
                    <h1> <strong>Success!</strong></h1>
                    <p style={{ fontSize: "20px" }}>Project added successfully.</p>
        
                  </div>
        )
        
        
        //  return <Link to='/dashboard'/>
        // this.props.history.push('/dashboard');
        
        }
        },
        (error) => {
        // this.setState({
        
        //   errormessage:error,
        // });
        }).catch(error=>{
        
        });
        }
                // }
              }
              subCategory=(id)=>{
                // const p2id = this.state.p2id;
                fetch(`${baseUrl}api/services/app/ProjectTypes/GetPtChildByParentId?ParentId=`+ id)
                .then(res => res.json())
                .then(json => {
                  if (json.success) {
                  if (json.result[0]) {

                     $('.p2').css('display','block')
                    //  
                    let p3result = json.result;
                    let p3id = json.result[0].id;
                    let child = p3result.map(function (key) {
                      return (
          
                        <option key={key.id} value={key.typeName}>{key.typeName}</option>
          
                      )
                    });
                    this.setState({
                      child,
                      p3result,
                      p3id
                    })
                    this.subCategory1(p3id);
                  }
                  }
                }).catch((error) => {
                  console.error(error);
                });
              }
              subCategory1=(id)=>{
                fetch(`${baseUrl}api/services/app/ProjectTypes/GetPtChildByParentId?ParentId=`+ id)
                .then(res => res.json())
                .then(json => {
                  if (json.result[0]) {
                    $('.p3').css('display','block')
                    //  
                    let p4result = json.result;
                    let p4id = json.result[0].id
                    let subChild = p4result.map(function (key) {
                      return (
          
                        <option key={key.id} value={key.typeName}>{key.typeName}</option>
          
                      )
                    });
                    this.setState({
                      subChild,
                      p4id,
                      p4result
                    })
                    this.subCategory2(p4id);
                  }
                  // else{
                  //   $('.p3').css('display','none')
                  // }
                }).catch((error) => {
                  console.error(error);
                });
              }
              subCategory2=(id)=>{
                
                fetch(`${baseUrl}api/services/app/ProjectTypes/GetPtChildByParentId?ParentId=`+ id)
                .then(res => res.json())
                .then(json => {
                  if (json.result[0]) {
                    // if (json.success) {
                    $('.p4').css('display','block')
        
                    //  
                    let p5result = json.result;
                    let p5id = json.result[0].id;
                    let subChild1 = p5result.map(function (key) {
                      return (
          
                        <option key={key.id} value={key.typeName}>{key.typeName}</option>
          
                      )
                    });
                    this.setState({
                      subChild1,
                      p5id,
                      p5result
                    })
                    this.subCategory3(p5id);
                  }
                }).catch((error) => {
                  console.error(error);
                });
              }
             
              subCategory3=(id)=>{
                
                fetch(`${baseUrl}api/services/app/ProjectTypes/GetPtChildByParentId?ParentId=`+ id)
                .then(res => res.json())
                .then(json => {
                  if (json.result[0]) {
                    // if (json.success) {
                    $('.p5').css('display','block')
        
                     
                    let p6result = json.result;
                    let p6id = json.result[0].id;
                    let subChild2 = p6result.map(function (key) {
                      return (
          
                        <option key={key.id} value={key.typeName}>{key.typeName}</option>
          
                      )
                    });
                    this.setState({
                      subChild2,
                      p6id,
                      p6result
                    })
                    this.subCategory4(p6id);
                  }
                }).catch((error) => {
                  console.error(error);
                });
              }
              subCategory4=(id)=>{
                
                fetch(`${baseUrl}api/services/app/ProjectTypes/GetPtChildByParentId?ParentId=`+ id)
                .then(res => res.json())
                .then(json => {
                  if (json.result[0]) {
                    // if (json.success) {
                    $('.p6').css('display','block')
        
                     
                    let p7result = json.result;
                    let p7id = json.result[0].id;
                    let subChild3 = p7result.map(function (key) {
                      return (
          
                        <option key={key.id} value={key.typeName}>{key.typeName}</option>
          
                      )
                    });
                    this.setState({
                      subChild3,
                      p7id,
                      p7result
                    })
                  }
                }).catch((error) => {
                  console.error(error);
                });
              }
                 





         render(){
          var q = new Date();
          var m = ('0' + (q.getMonth()+1)).slice(-2);
          var d = ('0' + this.state.dateContext.format("D")).slice(-2);
    
          var y = q.getFullYear();
          
          var currentDate = y+"-"+m+"-"+d;
          this.currentDay();
      // 
          
          //  let mydate=new Date('2011-04-11');
          // // 
          // // let currentDate = new Date();
          //  
          //  if(this.state.startDate> currentDate){
            //  
          //  }        
             const {startDate, endDate, length, bodies, description} = this.state;
        //    if(this.state.success){
        //           this.props.history.push('/projectType')
        //     //  return <ProjectType startDate={startDate} endDate={endDate} length={length} bodies={bodies} description={description} parentInfo={true} />
        //    }
        return (
            <div >
            
               <div className="bg-pt" id="basic-info">
               <div style={{float:'left',marginLeft:'40px',marginTop:'40px'}}>
               <Link to='/dashboard'>
                      
                      <button className='btn add-project btn-sm' style={{borderRadius:'20px', width:'200px',backgroundColor: 'transparent'}}><i className="fal fa fa-long-arrow-left"></i> DASHBOARD  </button>
                      </Link>
                      </div>
               <div className="col-md-12 justify-content-center d-flex align-items-center pt-5">

<div className="col-md-10 container row justify-content-center " >
         <div className="bubble-pt previous-pt">


    <i onClick={this.wizard1}></i>
 
  </div>
  <div className="bubble-separator-pt"></div>
  <div className="bubble-pt previous-pt">
{ this.state.projectInfo ?

    <i onClick={this.wizard2}></i>
    : null } 
  </div>
  <div className="bubble-separator-pt"></div>
  <div className="bubble-pt previous-pt">
 { this.state.projectTechnicalInfo ? 

    <i onClick={this.wizard3}></i> 
    : null }
  </div>
  {/* <div className="bubble-pt previous1-pt">
  <Link  to='/projectType'>
  <i></i>

  </Link>
  </div>
  <div className="bubble-separator2-pt"></div>
  <div className="bubble3-pt previous2-pt">
  <Link  to='/projectTechnicalInfo'>
  <i></i>
  </Link>
  </div> */}
  </div>
  </div>
  <div className="col-md-12 col-12 col-sm-12 col-lg-12  col-lg-12 col-xl-9 container justify-content-center d-flex align-items-center" >
<div className="col-md-10 col-12 col-sm-6 col-lg-5 col-lg-4 col-xl-6 container row justify-content-center " style={{marginBottom: "40px"}}>

  <div className="bubble1-pt text col-md-2 col-2 col-sm-4 col-lg-4 col-lg-4">
    <p>Basic Info</p>
  </div>

  
  <div className="bubble4-pt text1 col-md-2 col-2 col-sm-4 col-lg-4 col-lg-4">
    <p>Project Info</p>
  </div>
  <div className="bubble2-pt text2 col-md-2 col-2 col-sm-4 col-lg-4 col-lg-4">
    <p>Technical Info</p>
  </div>





</div>

</div>

<section className="sign-body pt-5" id='addnew'>

     {/* <div className="col-md-12 justify-content-center d-flex align-items-center">
       <div className="col-md-10 container row justify-content-center " >

         <div className="bubble-pt previous-pt">
           <LinK to='/'><i></i></LinK>
         </div>

         <div className="bubble-separator-pt"></div>
         <div className="bubble-pt previous1-pt">
             
         </div>

         <div className="bubble-separator2-pt"></div>
         <div className="bubble3-pt previous2-pt">

         </div>


       </div>

     </div>
     <div className="col-md-12 col-12 col-sm-12 col-lg-12  col-lg-12 col-xl-9 container justify-content-center d-flex align-items-center" >
       <div className="col-md-10 col-12 col-sm-6 col-lg-5 col-lg-4 col-xl-6 container row justify-content-center " style={{marginBottom: "40px"}}>

         <div className="bubble1-pt text col-md-2 col-2 col-sm-4 col-lg-4 col-lg-4">
           <p>Basic Info</p>
         </div>

         
         <div className="bubble4-pt text1 col-md-2 col-2 col-sm-4 col-lg-4 col-lg-4">
           <p>Project Info</p>
         </div>
         <div className="bubble2-pt text2 col-md-2 col-2 col-sm-4 col-lg-4 col-lg-4">
           <p>Technical Info</p>
         </div>





       </div>

     </div> */}
    
     <div className="col-md-12 pb-5" id="basic-info">

       <h2>ADD NEW PROJECT</h2>
       
         <div className="col-md-12  d-flex justify-content-center">
          <form onSubmit={this.addNewProject}>
            <div className="col-md-12 ">
               <div className="container row">
               <div className="col-md-5 input-effect mt-5">
                 <label>START DATE</label>
                 
                 <input id='input' className="effect-16" title={this.state.startDateShowError} ref="startDate" autoFocus={true} type="date" onChange={this.startDateHandle} value={this.state.startdate} />
                 {/* <span className="focus-border"></span><br/> */}
                 {this.state.startDateError ? <p className="text-danger">{this.state.startDateShowError}</p> : null}
                

               </div>
               <div className='col-md-2 mt-5'></div>
               <div className="col-md-5 input-effect mt-5">
                 <label>END DATE</label>
                 <input id='input' className="effect-16" title={this.state.endDateShowError} ref="endDate" type="date"  onChange={this.endDateHandle} value={this.state.enddate} />
                 {/* <span ref='border' className="focus-border"></span> */}
                 {this.state.endDateError ? <p className="text-danger">{this.state.endDateShowError}</p> : null}

               </div>
               
              </div>
            </div>
            <div className="col-md-12 ">
               <div className="container row">
               <div className="col-md-12 input-effect mt-5">
                 <label>DESCRIPTION</label>
                 <input autocomplete="off" id='input'  className="effect-16" ref="description" type="text" onChange={this.descriptionHandle} value={this.state.description}/>
                 {/* <span ref='des-border' className="focus-border description"></span> */}
                 {this.state.descriptionError ? <p className="text-danger">Project description required.</p> : null}

               </div>
              </div>
            </div>
            <div className="col-md-12">
               <div className="container row">
               <div className="col-md-5 input-effect mt-5">
                 <label>LENGTH</label>
                 <input autocomplete="off" id='input' className="effect-16" ref="length" type="text" onChange={this.lengthHandle} value={this.state.length} />
                 {/* <span className="focus-border"></span> */}
                 {this.state.lengthError ? <p className="text-danger">Project Length required.</p> : null}

               </div>
               <div className='col-md-2 mt-5'></div>
               
               <div className="col-md-5 input-effect mt-5">
                 <label>BODIES</label>
                 <input autocomplete="off" id='input' className="effect-16" ref="bodies" type="text" onChange={this.bodiesHandle} value={this.state.bodies} />
                 {/* <span className="focus-border"></span> */}
                 {this.state.bodiesError ? <p className="text-danger">Project bodies required.</p> : null}

               </div>
               
              </div>
            </div>
            <div className="col-md-12 col-12 mb-5">
              
            <ImageUpload triggerFileUploadForParent={this.handleFileUpload} />
            {this.state.attachmentFilesError ? <p className="text-danger">Select At Least One File.</p> : null}
            </div>
            <div className="col-md-12 col-12 mb-5">
               <div className="container row">
               <div className="col-md-6 col-12 mt-5">
                 {/* <label className='attach'  for="fileInput" onClick={this.attach}>ATTACH &nbsp;<i className="fa fa-paperclip"></i></label> */}
                 {/* <label for="fileInput" > */}
                 
{/* </label> */}
{/* <input type="file" style={{display: "none"}}  id="fileInput" onChange={this.fileHandler}  value={this.state.file} /> */}
{/* <progress id="progressBar" value="0" max="100" style={{width:'300px'}}></progress>
  <h3 id="status"></h3>
  <p id="loaded_n_total"></p>

<div id="status"></div> */}
               </div>
              
               <div className="col-md-6 col-12  mt-5">
              
                 <button id="btn-submit" type='submit' disabled={this.state.submitDisabled}>
                   
                 {this.state.loading ? <div style={{ color: 'lightgrey' }}>Wait...</div> :<span> NEXT &nbsp;<i className="fal fa fa-long-arrow-right"></i></span>}
                   
                  </button>
                  
               </div>
 {/* {this.state.fileError ? <p className="text-danger">Attachment required.</p> : null} */}
               
              </div>
            </div>


            
          </form>
         </div>
       </div>
     {/* </div> */}



       
 </section>







{/* <div className="bg-pt" id="project-type"> */}

<section className="sign-body pt-5" style={{display:'none'}} id='type'>
  {/* <Navbar projectInfo={this.state.projectInfo} /> */}
{/* 
  <div className="col-md-12 justify-content-center d-flex align-items-center">
    <div className="col-md-10 container row justify-content-center " >

      <div className="bubble-pt previous-pt">
        <img src={ok} className="wiz2" alt="" />

         <img src="images-info/ok.png" alt=""/> 
      </div>

      <div className="bubble-separator-pt"></div>
      <div className="bubble-pt previous1-pt">
        <i></i>
      </div>

      <div className="bubble-separator2-pt"></div>
      <div className="bubble3-pt previous2-pt">

      </div>


    </div>

  </div>
  <div className="col-md-12 col-12 col-sm-12 col-lg-12  col-lg-12 col-xl-9 container justify-content-center d-flex align-items-center" >
    <div className="col-md-10 col-12 col-sm-6 col-lg-5 col-lg-4 col-xl-6 container row justify-content-center " style={{ marginBottom: "40px" }}>

      <div className="bubble1-pt text col-md-2 col-2 col-sm-4 col-lg-4 col-lg-4">
        <p>Basic Info</p>
      </div>


      <div className="bubble4-pt text1 col-md-2 col-2 col-sm-4 col-lg-4 col-lg-4">
        <p>Project Info</p>
      </div>
      <div className="bubble2-pt text2 col-md-2 col-2 col-sm-4 col-lg-4 col-lg-4">
        <p>Technical Info</p>
      </div>





    </div>

  </div> */}

  <div className="col-md-12 pb-5" id="basic-info">

    <h2>SELECT PROJECT TYPE</h2>

    <div className="col-md-12  d-flex justify-content-center">
      <form onSubmit={this.submitProjectType}>
        <div className="col-md-12 ">
          <div className="container row">
            <div className="col-md-6 input-effect mt-5">
              <label>PROJECT TITLE</label>
              <input autocomplete="off" id='input'  className="effect-16" ref='title' type="text" onChange={this.projectTitleHandle} value={this.state.projectTite}/>
              {/* <span className="focus-border"></span> */}
              {this.state.projectTitleError ? <p className="text-danger">Project title required.</p> : null}

            </div>

            <div className="col-md-6 input-effect focus-border mt-5">
              <label>PROJECT TYPE</label>
              <div>
                <select name=""  ref='type' className="effect-16" style={{ borderBottom: "1px solid #2caae7" }} onChange={this.projectTypeHandle} value={this.state.projectType} required>
                 {this.state.projectTypedata}
                  {/* <option value="sgfsg" className="">Select</option>
                  <option value="sfgf" className="">Select1</option>

                  <option value="fsgfg" className="">Select2</option> */}


                </select>
                {this.state.projectTypeError ? <p className="text-danger">Project type required.</p> : null}

              </div>



            </div>

          </div>
        </div>


        <div className="col-md-12 col-12 mb-5">
          <div className="container row">
            <div className="col-md-6 col-6 mt-5">

            </div>

            <div className="col-md-6 col-6  mt-5">
              {/* <Link to='/projectTechnicalInfo'> */}
              {this.state.loading?
              <button id="btn-technical-info" style={{ color: 'lightgrey' }}  disabled={this.state.submitDisabled} >
              Wait...
                  </button>:
                <button id="btn-project-type"  type='submit' disabled={this.state.submitDisabled} >
                  NEXT &nbsp;<i className="fal fa fa-long-arrow-right"></i>
                </button>
              }
              <span id="btn-technical-info"   onClick={this.wizard1}>
                  BACK &nbsp;<i className="fal fa fa-long-arrow-left"></i>
                </span>
              {/* </Link> */}
            </div>

          </div>
        </div>



      </form>

    </div>
  </div>
  {/* </div> */}

</section>

{/* </div> */}



{/* <div className="bg-pt" id="technical-info"> */}
 
<section className="sign-body pt-5" style={{display:'none'}} id='tech'>
  {/* <Navbar projectTechnicalInfo={true} projectInfo={true} /> */}

     {/* <div className="col-md-12 justify-content-center d-flex align-items-center">
       <div className="col-md-10 container row justify-content-center " >

         <div className="bubble-pt previous-pt">
         <img src={ok} className="wiz3" alt="" />
         </div>

         <div className="bubble-separator-pt"></div>
         <div className="bubble-pt previous1-pt">
         <img src={ok} className="wiz3" alt="" />
         </div>

         <div className="bubble-separator2-pt"></div>
         <div className="bubble3-pt previous2-pt">
         {this.state.success?<img src={ok} className="wiz3" alt="" />: <i></i>}
         </div>


       </div>

     </div>
     <div className="col-md-12 col-12 col-sm-12 col-lg-12  col-lg-12 col-xl-9 container justify-content-center d-flex align-items-center" >
       <div className="col-md-10 col-12 col-sm-6 col-lg-5 col-lg-4 col-xl-6 container row justify-content-center " style={{marginBottom: "40px"}}>

         <div className="bubble1-pt text col-md-2 col-2 col-sm-4 col-lg-4 col-lg-4">
           <p>Basic Info</p>
         </div>

         
         <div className="bubble4-pt text1 col-md-2 col-2 col-sm-4 col-lg-4 col-lg-4">
           <p>Project Info</p>
         </div>
         <div className="bubble2-pt text2 col-md-2 col-2 col-sm-4 col-lg-4 col-lg-4">
           <p>Technical Info</p>
         </div>





       </div>

     </div> */}
    
     <div className="col-md-12 pb-5" id="basic-info">

       <h2>Technical Info</h2>
       
         <div className="col-md-12  d-flex justify-content-center">
          <form onSubmit={this.finish}>
            <div className="col-md-12 ">
               <div className="container row d-flex justify-content-center">
                 
                <div className="col-md-6 input-effect focus-border mt-5">
                 
                 <select name="" id="" ref='contractType' className="effect-16" style={{borderBottom: "1px solid #2caae7"}} onChange={this.contractTypeHandle} value={this.state.contractType} required>
                   {/* <option value="" className="">CONTRACTOR TYPE</option> */}
                   {this.state.tecnicalInfo}
                 </select>
                 {this.state.contractTypeError ? <p className="text-danger">Contract type required.</p> : null}
                
                 
               </div>
               
               <div className="col-md-6 input-effect focus-border mt-5 p2" style={{display:'none'}}>
                 
                 <select name="" id="" ref='subCategory' className="effect-16" style={{borderBottom: "1px solid #2caae7"}} onChange={this.subCategoryHandle} value={this.state.subCategory}>
                {this.state.child} 
                                   {/* <option value="" className="">SUB CATEGORY</option>
                   <option value="" className="">SUB CATEGORY</option>
                   <option value="" className="">SUB CATEGORY</option> */}
                   
                 </select>

                 {this.state.subCategoryError ? <p className="text-danger">Sub Category required.</p> : null}
                
                 
               </div>
               <div className="col-md-6 input-effect focus-border mt-5 p3" style={{display:'none'}}>
                 
                 <select name="" id="" ref='subChild' className="effect-16" style={{borderBottom: "1px solid #2caae7"}} onChange={this.subChildHandle} value={this.state.subChildCategory}>
                   {/* <option value="" className="">CONTRACTOR TYPE</option> */}
                   {this.state.subChild}
                 </select>
                 {this.state.subChildCategoryError ? <p className="text-danger">Contract type required.</p> : null}
                
                 
               </div>
               
               <div className="col-md-6 input-effect focus-border mt-5 p4" style={{display:'none'}}>
                 
                 <select name="" id="" ref='subChild1' className="effect-16" style={{borderBottom: "1px solid #2caae7"}} onChange={this.subChild1Handle} value={this.state.subChil1dCategory}>
                {this.state.subChild1} 
                                   {/* <option value="" className="">SUB CATEGORY</option>
                   <option value="" className="">SUB CATEGORY</option>
                   <option value="" className="">SUB CATEGORY</option> */}
                   
                 </select>

                 {this.state.subChild1CategoryError ? <p className="text-danger">Sub Category required.</p> : null}
                
                 
               </div>
               <div className="col-md-6 input-effect focus-border mt-5 p5" style={{display:'none'}}>
                 
                 <select name="" id="" ref='subChild2' className="effect-16" style={{borderBottom: "1px solid #2caae7"}} onChange={this.subChild2Handle} value={this.state.subChil2dCategory}>
                {this.state.subChild2} 
                                   {/* <option value="" className="">SUB CATEGORY</option>
                   <option value="" className="">SUB CATEGORY</option>
                   <option value="" className="">SUB CATEGORY</option> */}
                   
                 </select>

                 {this.state.subChil2dCategoryError ? <p className="text-danger">Sub Category required.</p> : null}
                
                 
               </div>
               <div className="col-md-6 input-effect focus-border mt-5 p6" style={{display:'none'}}>
                 
                 <select name="" id="" ref='subChild3' className="effect-16" style={{borderBottom: "1px solid #2caae7"}} onChange={this.subChild3Handle} value={this.state.subChil3dCategory}>
                {this.state.subChild3} 
                                   {/* <option value="" className="">SUB CATEGORY</option>
                   <option value="" className="">SUB CATEGORY</option>
                   <option value="" className="">SUB CATEGORY</option> */}
                   
                 </select>

                 {this.state.subChil3dCategoryError ? <p className="text-danger">Sub Category required.</p> : null}
                
                 
               </div>
               
              </div>
            </div>
            
            
            <div className="col-md-12 col-12 mb-5">
               <div className="container row">
               <div className="col-md-6 col-6 mt-5">
                 
               </div>
               
               <div className="col-md-6 col-6  mt-5">
               {/* <Link to='/dashboard'>  */}
               {this.state.loading ?<button id="btn-technical-info" style={{ color: 'lightgrey' }}  disabled={this.state.submitDisabled} >
               Wait...
                   </button> : <button id="btn-technical-info"  disabled={this.state.submitDisabled} >
                   FINISH &nbsp;
                   </button>}
                   {this.state.success?<Redirect to="/dashboard"/>:null}
                  {/* </Link> */}
                  <span id="btn-technical-info"   onClick={this.wizard2}>
                  BACK &nbsp;<i className="fal fa fa-long-arrow-left"></i>
                </span>
               </div>
               
              </div>
            </div>


            
          </form>
      
         </div>
       </div>
     {/* </div> */}



       
 </section>

 </div>


<Footer/>

</div>
        )
    }
}

export default index
