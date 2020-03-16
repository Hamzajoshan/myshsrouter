import React, { Component } from 'react'
import {Redirect } from 'react-router-dom'
import Header from '../../Component/Header'
import Footer from '../../Component/Footer'
import'./index.css';
import $ from 'jquery';
import { connect } from 'react-redux'
import { spid } from '../../actions/spid';
import cookie from 'react-cookies'
import SweetAlert from '@sweetalert/with-react';
import { baseUrl } from "./../../config.js";

// import Media from 'react-media';
class index extends Component {
  constructor(props){

    super(props);
    this.state={
      loading: false,
      Fname:"",
      Lname:"",
      email:"",
      username:"",
      pnumber:"",
      password:"",
      confirmpassword:"",
      id:"",
      city:"",
      district:"",
      address:"",
      plocation:"",
      errormessage:false,
      success:false,
      FnameLabel:false,
      LnameLabel:false,
      emailLabel:false,
      pnumberLabel:false,
      usernameLabel:false,
      passwordLabel:false,
   
      confirmpasswordLabel:false,
      matchLabel:false,
      idLabel:false,
      cityLabel:false,
      districtLabel:false,
      addressLabel:false,
      plocationLabel:false
    }
    this.userRegistration = this.userRegistration.bind(this);
  }
    
  onFnameChange=(e)=>{
    let Fname= e.target.value.split(' ').join('');
    
    this.setState({
      Fname:Fname,
      FnameLabel:false
    })
  }
  onLnameChange=(e)=>{
    let Lname= e.target.value.split(' ').join('');

    this.setState({
      Lname:Lname,
      LnameLabel:false
    })
  }
  onEmailChange=(e)=>{
    this.setState({
      email:e.target.value,
      emailLabel:false
    })
  }
  onUsernameChange=(e)=>{
    let username= e.target.value.split(' ').join('');

    this.setState({
      username:username,
      usernameLabel:false
    })
  }
  onPnumberChange=(e)=>{
    if (/^[0-9\b]+$/.test(e.target.value)|| e.target.value === '' ) {
    this.setState({
      pnumber:e.target.value,
      pnumberLabel:false
    })
  }
}
  onPasswordChange=(e)=>{
    this.setState({
      password:e.target.value,
      passwordLabel:false
    })
  }
  onIdChange=(e)=>{
    this.setState({
      id:e.target.value,
      idLabel:false
    })
  }
  onCityChange=(e)=>{
    this.setState({
      city:e.target.value,
      cityLabel:false
    })
  }
  onDistrictChange=(e)=>{
    this.setState({
      district:e.target.value,
      districtLabel:false
    })
  }
 onAddressChange=(e)=>{
    this.setState({
      address:e.target.value,
      addressLabel:false
    })
  }
  onPlocationChange=(e)=>{
    this.setState({
      plocation:e.target.value,
      plocationLabel:false
    })
  }
  onConfirmpasswordChange=(e)=>{
   
    this.setState({
      confirmpassword:e.target.value,
      confirmpasswordLabel: false
      // passwordLabel:false
    })
    if(this.state.password!==e.target.value){
      this.setState({
        match:false,
        matchLabel:true
      })
  
    }
    else{
      this.setState({
        match:false,
        matchLabel:false
      })
  
    }
  }
  
    
    userRegistration = (e) => {
      const {Fname, Lname, email, username, password, confirmpassword, id, city, district, address, plocation} = this.state;
      e.preventDefault();
      this.setState({
        loading:true,
        submitDisabled:true
      })
      // const =this.state.{Fname,Lname,email,password, confirmPassword}
      if(Fname === '' || Lname === '' || email === '' || username === '' || password === '' || confirmpassword === '' || id === '' || city === '' || district === '' || address === '' || plocation === '')
{    
      if (this.state.Fname==="") {
        // $(this.refs['fname']).focus();
        this.setState({
          FnameLabel:!this.state.FnameLabel,
          loading:false,
          submitDisabled:false
        })
    }
    if (this.state.Lname==="") {
      // $(this.refs['lname']).focus();

      this.setState({
        LnameLabel:!this.state.LnameLabel,
        loading:false,
        submitDisabled:false
      })
  }
  if (this.state.email==="") {
    // $(this.refs['email']).focus();

    this.setState({
      emailLabel:!this.state.emailLabel,
      loading:false,
      submitDisabled:false
    })
  }
  if (this.state.pnumber==="") {
    // $(this.refs['phone']).focus();
  
    this.setState({
      pnumberLabel:!this.state.pnumberLabel,
      loading:false,
      submitDisabled:false
    })
  }
  if (this.state.username==="") {
    // $(this.refs['username']).focus();

    this.setState({
      usernameLabel:!this.state.usernameLabel,
      loading:false,
      submitDisabled:false
    })
  }
  if (this.state.password==="") {
    // $(this.refs['password']).focus();

    this.setState({
      passwordLabel:!this.state.passwordLabel,
      loading:false,
      submitDisabled:false
    })
  }
  if (this.state.confirmpassword==="") {
    // $(this.refs['confirmpassword']).focus();

    this.setState({
      confirmpasswordLabel:!this.state.confirmpasswordLabel,
      loading:false,
      submitDisabled:false
    })
  }
  if (this.state.id==="") {
    // $(this.refs['id']).focus();

    this.setState({
      idLabel:!this.state.idLabel,
      loading:false,
      submitDisabled:false
    })
  }
  if (this.state.city==="") {
    // $(this.refs['city']).focus();

    this.setState({
      cityLabel:!this.state.cityLabel,
      loading:false,
      submitDisabled:false
    })
  }
  if (this.state.district==="") {
    // $(this.refs['district']).focus();

    this.setState({
      districtLabel:!this.state.districtLabel,
      loading:false,
      submitDisabled:false
    })
  }
  if (this.state.address==="") {
    // $(this.refs['address']).focus();

    this.setState({
      addressLabel:!this.state.addressLabel,
      loading:false,
      submitDisabled:false
    })
  }
  if (this.state.plocation==="") {
    // $(this.refs['location']).focus();

    this.setState({
      plocationLabel:!this.state.plocationLabel,
      loading:false,
      submitDisabled:false
    })
  }
   }
   else if (this.state.password!==this.state.confirmpassword) {
    $(this.refs['password']).focus();

    this.setState({
      success:false,
    // errormessage:"Password does not match!!!",
    loading:false,
    submitDisabled:false
    })
  }   else {
        // make API call
       
        fetch(`${baseUrl}api/services/app/User/Create`, {
          method: 'post',
          mode: 'cors', 
          redirect: 'follow',
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify(
            {
              "userName": username,
              "name": Fname,
              "surname": Lname,
              "emailAddress": email,
              "isActive": true,
              "userType": "2",
              "password": password
            }
          )
          
      }).then(function (response) {
        // this.props.history.push('/SP_TechnicalInfo');
          return response.json(); //response.json() is resolving its promise. It waits for the body to load
      }).then((responseData)=> {
    //  alert(responseData);
       
        if(!responseData.success){
          // console.log(responseData.error.message)
          if(responseData.error.message===""){
            if (!this.props.spId) {
              // return <LoginPanel onSuccess={this.onLogin} />
              // return <Dashboard />
              SweetAlert(responseData.error.message, {
                buttons: {
                  catch: {
                    text: "Login",
                    value: "catch",
                  },
                 
                
                },
              })
              .then((value) => {
                switch (value) {
               
                  case "catch":
                    {
                      this.props.history.push('/Login');
                    }
                    break;
               
                  // default:
                  //   SweetAlert("Got away safely!");
                }
              });
                // this.props.history.push('/dashboard');
            
            }
          }
          this.setState({
            errormessage:responseData.error.message,
            submitDisabled: false,
            success:false,
            loading: false

          })
        }
        else{
          
          this.props.add2(responseData.result.id);
          this.setState({
            Fname:'',
            Lname:'',
            username: '',
            email:'',
            pnumber: '',
            text: '',
            id:"",
            city:"",
            district:"",
            address:"",
            plocation:"",
            emailValid: false,         // valid flags for each field
            textValid: false, 
            submitDisabled: false   ,
            password:'',
            confirmpassword:'',
            errormessage: false,
            success:responseData.success,
            
            loading: false
          })
        // this.props.history.push('/SP_TechnicalInfo');

        }
       
      },
      (error) => {
        // console.log(error)
        // this.setState({
  
        //   errormessage:error,
        // });
      }).catch(error=>{
        console.log(error)
      });
    }
  }
  
    render() {
      if (cookie.load('Token')) {
        // return <LoginPanel onSuccess={this.onLogin} />
        // return <Dashboard />
          this.props.history.push('/dashboard');
  
      }
        return (
          <div>
          <div className="bg-basicinfo">
        <Header/>

            {/* <Media query="(max-width: 600px)">
    {matches =>
      matches ? 
       this.setState({toggle:false})
       : (
        <p>The document is at least 600px wide.</p>
      )
    }
  </Media> */}
        
         <section className="sign-body" id="form">
      
         <div className="col-md-12 justify-content-center d-flex align-items-center">
          <div className="col-md-10 container row justify-content-center " >

            <div className="bubble previous">
              <i></i>
            </div>

            <div className="bubble-separator"></div>
            <div className="bubble previous1">

            </div>





          </div>

        </div>
        <div className="col-md-12 container justify-content-center d-flex align-items-center" >
          <div className="col-md-9  container row justify-content-center " style={{marginBottom: "40px"}}>

            <div className="bubble1 b-text col-md-3" style={{fontSize:"13"}}>
              <p className='b-text'>Basic Info</p>
            </div>

            <div className="bubble-separator1"></div>
            <div className="bubble2 text1 col-md-3" style={{fontSize:"13"}}>
              <p>Technical Info</p>
            </div>
    
      
      
                </div>
       
              </div>
             
              <div className="col-md-12 d-flex align-items-center justify-content-center">
      
      
                <div className="col-md-8 col-xm-4 col-sm-8 col-lg-7  pt-5 pb-5 d-flex align-items-center justify-content-center">
      
      
                  <div className=" col-md-8 col-xm-3 col-sm-8 col-lg-8 col-8 basic-sign" >
                    <h2 className="text-uppercase"><strong>Basic Info</strong></h2>    
      
                  </div>
      
      
                  <div className="col-md-12 ">
      
                   <div className="row center form">
      
                    <div className="col-md-12">
      
                      <form className="inner-form" onSubmit={this.userRegistration}>
                      {this.state.errormessage? 
                            <div className="alert alert-danger fade show">
                            <strong>Error!</strong> {this.state.errormessage}
                            
                        </div>
                            :null}
                             {this.state.success? 
                            <div className="alert alert-success alert-dismissible fade show">
                            <strong>Success!</strong> signed up successfully.
                           
                        </div>
                            :null}
                        <div className="form-row">
                        <div className="form-group col-md-6">
                                <input autocomplete="off" ref="fname" autoFocus={true} type="name"  maxLength="20" className="form-control mainLoginInput" id="inputDado" placeholder=" First Name*" value={this.state.Fname} onChange={this.onFnameChange}/>
                                {this.state.FnameLabel?<label className="text-danger">First name required.</label>:null}
                              </div>
                             
                              <div className="form-group col-md-6">
                                <input autocomplete="off" ref="lname" type="name"  maxLength="20" className="form-control mainLoginInput" id="inputDado" placeholder=" Last Name*" value={this.state.Lname} onChange={this.onLnameChange}  />
                                {this.state.LnameLabel?<label className="text-danger">Last name required.</label>:null}
                              
                              </div>
                              <div className="form-group col-md-6">
                                <input autocomplete="off" ref="email" type="email"  maxLength="30" className="form-control mainLoginInput" id="inputDado" placeholder=" Email*" value={this.state.email} onChange={this.onEmailChange}/>
                                {this.state.emailLabel?<label className="text-danger">Email Address required.</label>:null}
                              
                              </div>
                             
                              <div className="form-group col-md-6">
                                <input autocomplete="off" ref="phone" type="text" pattern="^((?:[+?0?0?966]+)(?:\s?\d{2})(?:\s?\d{7}))$"  maxLength="11" className="form-control mainLoginInput" id="inputDado" placeholder=" (00966) 1234-567*" value={this.state.pnumber} onChange={this.onPnumberChange}/>
                                {this.state.pnumberLabel?<label className="text-danger">Phone Number required.</label>:null}
                              </div>
                              {/* */}
                              <div className="form-group col-md-6">
                                <input autocomplete="off" ref="username" type="name"  maxLength="20" className="form-control mainLoginInput" id="inputDado" placeholder=" Username*" value={this.state.username} onChange={this.onUsernameChange}/>
                                {this.state.usernameLabel?<label className="text-danger">UserName required.</label>:null}
                              </div>
                             
                              <div className="form-group col-md-6">
                            <input autocomplete="off" ref="id" type="id"  maxLength="10" className="form-control mainLoginInput" id="inputDado" placeholder=" ID*" value={this.state.id} onChange={this.onIdChange}/>
                            {this.state.idLabel?<label className="text-danger">Id required.</label>:null}
                          </div>
                              <div className="form-group col-md-6">
                                <input autocomplete="off" ref="password" type="password"  maxLength="10" className="form-control mainLoginInput" id="inputDado" placeholder=" Password*" value={this.state.password} onChange={this.onPasswordChange}/>
                                {this.state.passwordLabel?<label className="text-danger">Password required.</label>:null}
                              </div>
                             
                              <div className="form-group col-md-6">
                                <input autocomplete="off" ref="confirm-pass" type="password"  maxLength="10" className="form-control mainLoginInput" id="inputDado" placeholder=" Re-Type Password*" value={this.state.confirmpassword} onChange={this.onConfirmpasswordChange}/>
                                {this.state.confirmpasswordLabel?<label className="text-danger">Confirm password required.</label>:null}
                                {this.state.matchLabel?<label className="text-danger">Password does not match.</label>:null}
                              </div>
                         
                          
                          {/* <div className="col-md-2"></div> */}
                          <div className="form-group col-md-6">
                            <input autocomplete="off" ref="city" type="text"  maxLength="15" className="form-control mainLoginInput" id="inputDado" placeholder=" City" value={this.state.city} onChange={this.onCityChange}/>
                            {this.state.cityLabel?<label className="text-danger">City required.</label>:null}
                          </div>
                         
                          <div className="form-group col-md-6">
                            <input autocomplete="off" ref="district" type="text"  maxLength="15" className="form-control mainLoginInput" id="inputDado" placeholder=" District*" value={this.state.district} onChange={this.onDistrictChange}/>
                            {this.state.districtLabel?<label className="text-danger">District required.</label>:null}
                          </div>
                          <div className="form-group col-md-12">
                            <input autocomplete="off" ref="address" type="text"  maxLength="50" className="form-control mainLoginInput" id="inputDado" placeholder=" Address*" value={this.state.address} onChange={this.onAddressChange}/>
                            {this.state.addressLabel?<label className="text-danger">Address required.</label>:null}
                          </div>
                          <div className="form-group col-md-12">
                            <input autocomplete="off" ref="location" type="text"  maxLength="50" className="form-control mainLoginInput" id="inputDado" placeholder=" Preferable Location*" value={this.state.plocation} onChange={this.onPlocationChange}/>
                            {this.state.plocationLabel?<label className="text-danger">Location required.</label>:null}
                          </div>
                          <button className="col-md-6 col-7 container button-outer" value="save" name="save" style={{outline: 'inherit',}} type='submit' disabled={this.state.submitDisabled}>
                                {/* <a href="#" className="button-inner" onClick={this.userRegistration} > */}
                                  <div className="col-md-6 container" >
                                  {this.state.loading?<div style={{color:'lightgrey'}}>Wait...</div>:<span > <strong><strong>Next</strong> <i className="fal fa fa-long-arrow-right"></i></strong></span>}  
                                  </div>
                                {/* </a> */}
                              </button>
                              {this.state.success?<Redirect to="/SP_TechnicalInfo"/>:null}
                          {/* <div className="col-md-6 col-7  container button-outer button-inner">
                            <a href="/SP_TechnicalInfo" className="button-inner"> 
                             <div className="col-md-5 container">
                              <span ><strong>Next </strong> <i className="fal fa fa-long-arrow-right"></i></span>
                            </div> */}
                          {/* </a>
                        </div> */}
                        </div>
                        
                      </form>
                      <br/>
                      
                      <div className="col-md-12 pt-3">
      
                      </div>
      
      
                    </div>
      
                  </div>
      
                </div>
      
              </div>
            </div>
      
          </section>
      
      </div>
<Footer/>

      {/* <footer>
        <div className=" footer-bg">
          <div className=" col-md-12 row  pb-5">
      
      
            <div className="col-md-2">
              <h4>SITE MAP</h4>
              <p>
                <ul className="">
                  <li><a href="#"> Home</a></li>
                  <li><a href="#"> About Us</a></li>
                  <li><a href="#"> How we work</a></li>
                  <li><a href="#"> Details</a></li>
                  <li><a href="#"> History</a></li>
      
                </ul>
              </p>
            </div>
      
            <div className="col-md-2">
              <h4>SERVICES</h4>
              <p>
                <ul className="">
                  <li><a href="#"> Home</a></li>
                  <li><a href="#"> About Us</a></li>
                  <li><a href="#"> How we work</a></li>
                  <li><a href="#"> Details</a></li>
                  <li><a href="#"> History</a></li>
      
                </ul>
              </p>
            </div>
      
            <div className="col-md-2">
              <h4>CONTACT US</h4>
              <p>
                <ul className="">
                  <li><a href="#"> Home</a></li>
                  <li><a href="#"> About Us</a></li>
                  <li><a href="#"> How we work</a></li>
                  <li><a href="#"> Details</a></li>
                  <li><a href="#"> History</a></li>
      
                </ul>
              </p>
            </div>
      
            <div className="col-md-6">
              <ul className="row icons">
                <li><span><a href=""><img src="images-info/fb.png" className="fb" /></a></span></li>
                <li><span><a href=""><img src="images-info/insta.png" className="insta"/></a></span></li>          
                <li><span><a href=""><img src="images-info/twiter.png" className="twiter"/></a></span></li>
                <li> <span><a href=""><img src="images-info/in.png" className="linkedin"/></a></span></li>
                  <li><span><a href=""><img src="images-info/pint.png" className="pintrest"/></a></span></li>
      
                </ul>
                
              </div>
      
      
            </div>
      
          </div>
      
      
        </footer> */}
       
  </div>
  
        )
    }
}
const mapStateToProps = state => {

  return {
    Token: state.places.Token,
    Income: state.places.Income,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    add2: (value) => {
      dispatch(spid(value))
    },

  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(index);
   