import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import './index.css';

class index extends Component {
    constructor(props) {
        super(props)
        this.state={
        
        }
    }
    componentDidMount(){
      console.log(this.props.projectInfo)

    }
    componentWillReceiveProps(){
      console.log(this.props.projectInfo)
    }
    render(){
      // console.log(this.state.projectInfo);
        return(
            <div>
     <div className="col-md-12 justify-content-center d-flex align-items-center">

       <div className="col-md-10 container row justify-content-center " >
                <div className="bubble-pt previous-pt">
       <Link  to='/addnew'>

           <i></i>
           </Link>
         </div>
         <div className="bubble-separator-pt"></div>
         <div className="bubble-pt previous-pt">
       { this.props.projectInfo ? <Link  to='/projectType'>

           <i></i>
           </Link>: null }
         </div>
         <div className="bubble-separator-pt"></div>
         <div className="bubble-pt previous-pt">
       { this.props.projectTechnicalInfo ? <Link  to='/projectTechnicalInfo'>

           <i></i> 
           </Link> : null }
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
           <p style={{color:'#fff'}}>Basic Info</p>
         </div>

         
         <div className="bubble4-pt text1 col-md-2 col-2 col-sm-4 col-lg-4 col-lg-4">
           <p style={{color:'#fff'}}>Project Info</p>
         </div>
         <div className="bubble2-pt text2 col-md-2 col-2 col-sm-4 col-lg-4 col-lg-4">
           <p style={{color:'#fff'}}>Technical Info</p>
         </div>





       </div>

     </div>
            </div>
        )
    }
}
export default index;