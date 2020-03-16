import React, { Component } from 'react'
import './index.css';
import Header from '../../Component/Header'
import Footer from '../../Component/Footer'
import SweetAlert from '@sweetalert/with-react';
import { connect } from 'react-redux'
import cookie from 'react-cookies'
import ContractType from '../Contract-type';
import { baseUrl } from "./../../config.js";

class index extends Component {
  constructor(props) {
    super(props)
    this.state={
      login : this.props.login,
      scrollTop: 0,
      workInterest:'',
      legalType:'',
      serviceProvider:'',
      selectedWorkInterest:'',
      workInterestValue:'',
      legalTypeValue:'',
      serviveProviderValue:'',
      errormessage: false,
      success: false,
      loading: false,

    }
   
    this.selectedWorkInterest = this.selectedWorkInterest.bind(this)
    this.selectedLegalType = this.selectedLegalType.bind(this)
    this.postTechnicalInfo = this.postTechnicalInfo.bind(this)

  
  }
  selectedWorkInterest=(e)=>{
      this.setState({workInterestValue:e.target.value})
       let inputArray=this.state.workResult;
    // console.log("inputarray"+ e)
    let data=e.target.value;
    // console.log("inputarray"+ typeof data)
    // let user = inputArray.find(item => item.typeName === data);

    const result = inputArray.find(item => item.workIntrestType === data);
    // console.log("inputarray worik: "+result.id)

    
    this.setState({workInterestId: result.id})
}
selectedLegalType=(e)=>{

  this.setState({legalTypeValue:e.target.value})
  let inputArray=this.state.legalResult;
  // console.log("inputarray"+ e)
  let data=e.target.value;
  // console.log("inputarray"+ typeof data)
  // let user = inputArray.find(item => item.typeName === data);

  const result = inputArray.find(item => item.legelTypeName === data);
  // console.log("inputarray legaal: "+result.id)


  this.setState({legalTypeId:result.id})
}
// selectedServiveProvider=(e)=>{
//   this.setState({serviveProviderValue:e.target.value})
// }
componentWillMount(){
  // console.log("tec ")


  fetch(`${baseUrl}api/services/app/WorkIntrest/GetActiveWorkIntrestTypesAsync`)
.then(res=> res.json())
.then(json=>{
if(json.success){
//  console.log("tec "+json.result)
 let workResult=json.result;
 let workInterestId=workResult[0].id
//  console.log("workInterest id: "+workResult[0].id)
 let workInterest =workResult.map(function(key) {

  return ( 
  
  <option key={key.id} value={key.workIntrestType}>{ key.workIntrestType}</option>
  
  )
  });
  this.setState({
    workInterest,
    workInterestId,
    workResult
  })
}
}).catch((error) => {
      console.error(error);
    });



fetch(`${baseUrl}api/services/app/LegelType/GetActiveLegelTypesAsync`)
.then(res=> res.json())
.then(json=>{
if(json.success){
//  console.log(json.resut)
 let legalResult=json.result;
//  console.log("Legaltype id: "+legalResult[0].id)
let legalTypeId = legalResult[0].id;
 let legalType =legalResult.map(function(key) {
  return ( 
  
  <option key={key.id} value={key.legelTypeName}>{ key.legelTypeName}</option>
  
  )
  });
  this.setState({
   legalType,
   legalTypeId,
   legalResult
  })
}
}).catch((error) => {
      console.error(error);
    });
    // fetch('https://shsbackend.azurewebsites.net/api/services/app/ServiceProviderType/GetParentSpTypes')
    // .then(res=> res.json())
    // .then(json=>{
    // if(json.success){
    // //  console.log(json.result)
    //  let result=json.result;
    //  let serviceProvider =result.map(function(key) {
    
    //   return ( 
      
    //   <option key={key.id} vlaue={key.typeName}>{ key.typeName}</option>
      
    //   )
    //   });
    //   this.setState({
    //     serviceProvider
    //   })
    // }
    // }).catch((error) => {
    //       console.error(error);
    //     });
    
    


}
postTechnicalInfo=(e)=>{
  e.preventDefault();
  if (!this.props.spId) {
    // return <LoginPanel onSuccess={this.onLogin} />
    // return <Dashboard />
    SweetAlert("You need to provide some basic info.", {
      buttons: {
        catch: {
          text: "BasicInfo",
          value: "catch",
        },
       
      
      },
    })
    .then((value) => {
      switch (value) {
     
        case "catch":
    
            this.props.history.push('/basicinfo');
    
          break;
     
        // default:
        //   SweetAlert("Got away safely!");
      }
    });
      // this.props.history.push('/dashboard');
  
  }
  this.setState({loading:true});
  if (this.state.workInterestId==="" || this.state.legalTypeId==="") {
  // console.log("error")
  SweetAlert(
    <div style={{color: 'red'}}>
    <h1> <strong >Error!</strong></h1>
    <p style={{ fontSize: "20px" }}>Kindly select properly!!!</p>
  </div>
  )
    this.setState({
        success: false,
        // errormessage:"Password does not match!!!",
        loading: false,
        submitDisabled: false
      })
    }
    else {
  this.setState({success:!this.state.success});

      // make API call

  //     fetch('https://shsbackend.azurewebsites.net/api/services/app/WorkIntrest/CreateWorkIntrestAsync', {
  //       method: 'post',
  //       // mode: 'cors',
  //       // 'contentType': 'application/json',
        
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
         
  //       },
  //       body: JSON.stringify(
  //         {
  //           "workIntrestType": this.state.workInterestValue,
  //           "creatorUserId": this.props.spId,
  //         }
  //       )
  //     }).then(function (response) {
  //       return response.json(); //response.json() is resolving its promise. It waits for the body to load
  //     }).then((responseData) => {
        
  // // console.log("malik")
  // if (responseData.success) {
  //       fetch('https://shsbackend.azurewebsites.net/api/services/app/LegelType/CreateLegelTypesAsync', {
  //         method: 'post',
  //         // mode: 'cors',
  //         // 'contentType': 'application/json',
          
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
           
  //         },
  //         body: JSON.stringify(
           
  //             {
  //               "legelTypeName": this.state.legalTypeValue,
  //               "creatorUserId": this.props.spId,
  //             }
            
  //         )
  //       }).then(function (response) {
  //         return response.json(); //response.json() is resolving its promise. It waits for the body to load
  //       }).then((responseData) => {
  //         if (responseData.success) {
  //         this.props.history.push('/SP_ContractType');
  //         }
  //         //  alert(responseData);
  //         // SweetAlert(
  //         //   <div className="alert alert-success alert-dismissible fade show">
  //         //     <h1> <strong>Success!</strong></h1>
  //         //     <p style={{ fontSize: "30px" }}>Signed up successfully.</p>
    
  //         //   </div>
  //         // )
          
  //     // this.setState({ success: !this.state.success, finish: !this.state.finish })
        
  //         if (!responseData.success) {
    
  //           // console.log(responseData.error.message)
  //           this.setState({
  //             errormessage: responseData.error.message,
  //             success: false
  //           })
  //           SweetAlert(
  //             <div className="alert alert-danger fade show">
  //               <h1> <strong>Error!</strong></h1>
  //               <p style={{ fontSize: "30px" }}>{this.state.errormessage}</p>
  //             </div>
  //           )
  //         }
    
  //       },
  //         (error) => {
  //           // console.log(error)
  //           // this.setState({
    
  //           //   errormessage:error,
  //           // });
  //         }).catch(error => {
  //           console.log(error)
  //         });
  //       //  alert(responseData);
  //       // SweetAlert(
  //       //   <div className="alert alert-success alert-dismissible fade show">
  //       //     <h1> <strong>Success!</strong></h1>
  //       //     <p style={{ fontSize: "30px" }}>Signed up successfully.</p>

  //       //   </div>
  //       // )
        
  //   // this.setState({ success: !this.state.success, finish: !this.state.finish })
  //       }
  //       if (!responseData.success) {

  //         // console.log(responseData.error.message)
  //         this.setState({
  //           errormessage: responseData.error.message,
  //           success: false
  //         })
  //         SweetAlert(
  //           <div className="alert alert-danger fade show">
  //             <h1> <strong>Error!</strong></h1>
  //             <p style={{ fontSize: "30px" }}>{this.state.errormessage}</p>
  //           </div>
  //         )
  //       }

    //   },
    //     (error) => {
    //       // console.log(error)
    //       // this.setState({

    //       //   errormessage:error,
    //       // });
    //     }).catch(error => {
    //       console.log(error)
    //     });
    }
  
  
}
  render() {

// console.log("workInterestValue: "+this.state.workInterestId);
// console.log("legalTypeValue: "+this.state.legalTypeId)
// console.log(this.state.serviveProviderValue)
if (cookie.load('Token')) {
  // return <LoginPanel onSuccess={this.onLogin} />
  // return <Dashboard />
    this.props.history.push('/dashboard');

}
else if (!this.props.spId) {
  // return <LoginPanel onSuccess={this.onLogin} />
  // return <Dashboard />
  SweetAlert("You need to provide some basic info.", {
    buttons: {
      catch: {
        text: "BasicInfo",
        value: "catch",
      },
     
    
    },
  })
  .then((value) => {
    switch (value) {
   
      case "catch":
      
          this.props.history.push('/basicinfo');
        
        break;
   
      // default:
      //   SweetAlert("Got away safely!");
    }
  });
    // this.props.history.push('/dashboard');

}
else if(this.state.success)
{
return <ContractType workInterest={this.state.workInterestId} legalType={this.state.legalTypeId} />
}
    return (
        <div className="bg-tech">
          <Header/>
  {this.state.selectedWorkInterest}
        
          <section className="sign-body" id="form">

          <div class="col-md-12 justify-content-center d-flex align-items-center">
  <div class="col-md-10 container row justify-content-center " >

  <div class="bubble previous">
    <i></i>
  </div>

  <div class="bubble-separator"></div>
  <div class="bubble previous1">
     
  </div>

  
  
  
  
</div>

</div>
<div class="col-md-12 container justify-content-center d-flex align-items-center" >
  <div class="col-md-9  container row justify-content-center " style={{marginBottom: "40px"}}>
 <div class="col-md-1"></div>
 <div class="bubble1 text col-md-2" style={{fontSize:"13"}}>
    < p >Technical Info</p>
  </div>

  <div class="bubble-separator1"></div>
  <div class="bubble2 text1 col-md-4" style={{fontSize:"13"}}>
      <p>Contract Type</p>
  </div>
            
                {/* <div className="bubble-separator1"></div>
                  <div className="bubble2 text1 col-md-3 col-3">
                    <i>Contract Type</i>
                  </div> */}
      



              </div>

            </div>
            <div className="col-md-12 d-flex align-items-center justify-content-center">


              <div className="col-md-8 col-xm-4 col-sm-8 col-lg-7  pt-5 pb-5 d-flex align-items-center justify-content-center">


                <div className=" col-md-8 col-xm-3 col-sm-8 col-lg-8 col-8 tech-sign" >
                  <h2 className="text-uppercase"><strong>Technical Info</strong></h2>

                </div>


                <div className="col-md-12 ">

                  <div className="row center form">

                    <div className="col-md-12">

                      <form className="inner-form">

                        <div className="form-row">
                          <div className="form-group col-md-12" >

                            <select onChange={this.selectedWorkInterest} value={this.state.workInterestValue} className="form-control mainLoginInput" id="inputDado1">
                              {this.state.workInterest}
                            
                            </select>
                          </div>
                          
                          <div className="form-group col-md-12" >

                            <select onChange={this.selectedLegalType} value={this.state.legalTypeValue} className="form-control mainLoginInput" id="inputDado1">
                             {this.state.legalType}
                              
                            </select>
                          </div>
                          {/* <div className="form-group col-md-6" >

                            <select onChange={this.selectedServiveProvider} value={this.state.serviveProviderValue} className="form-control mainLoginInput" id="inputDado">
                              {this.state.serviceProvider}
                             
                            </select>
                          </div> */}
                          <div className="form-group col-md-7" >


                          </div>
                          <button className="col-md-6 col-7 container button-outer-contract" style={{outline: 'inherit',}} type='submit' value="save" name="save" onClick={this.postTechnicalInfo} >
                          {/* <Link to="/SP_ContractType"> */}
                          {/* <Link to="/SP_ContractType" style={{textDecoration:"none"}}> */}
                                {/* <a href="#" className="button-inner" onClick={this.userRegistration} > */}
                                  <div className="col-md-6 container" style={{outline: 'inherit',}}>
                                  {/* <span > <strong>Next</strong><strong > <i className="fal fa fa-long-arrow-right"></i></strong></span> */}
                                  {this.state.loading?<div style={{color:'lightgrey'}}>Wait...</div>: <span > <strong>Next</strong><strong > <i className="fal fa fa-long-arrow-right"></i></strong></span>}  
                                  </div>
                                {/* </a> */}
                                {/* </Link> */}
                              {/* // </button> */}
                              </button>
                              {/* </Link> */}
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
                      <li><span><a href=""><img src="images-info/insta.png" className="insta" /></a></span></li>
                      <li><span><a href=""><img src="images-info/twiter.png" className="twiter" /></a></span></li>
                      <li> <span><a href=""><img src="images-info/in.png" className="linkedin" /></a></span></li>
                      <li><span><a href=""><img src="images-info/pint.png" className="pintrest" /></a></span></li>

                    </ul>

                  </div>


                </div>

              </div>


            </footer> */}
            {/* <div className="footer-copyright text-right py-2"><span>© 2019</span> </div> */}
            </div>
          )
      }
  }
  const mapStateToProps = state => {

    return {
      Token: state.places.Token,
      Income: state.places.Income,
      spId: state.places.spId,
  
    }
  }
  // const mapDispatchToProps = dispatch => {
  //   return {
  //     add2: (value) => {
  //       dispatch(spid(value))
  //     },
  
  //   }
  // }
  export default connect(
    mapStateToProps
  )(index);