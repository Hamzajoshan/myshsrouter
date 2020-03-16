import React, { Component } from 'react';
import $ from 'jquery';
// import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import "./index.css";
import Footer from '../../Footer'
import NewProject from './AddNewProject'
import ProjectType from './ProjectType';

import ok from '../../../images/images-info/ok.png';
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { throwStatement } from '@babel/types';
// import { threadId } from 'worker_threads';

class index extends Component {
    constructor(props) {
        super(props)
        this.state={
        }
       
      }
     
         render(){
         
        return (
            <div >
                <ProjectType/>
            {/* <NewProject/> */}
              

<Footer/>

</div>
        )
    }
}

export default index
