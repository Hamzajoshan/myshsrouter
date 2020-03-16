import { Switch, Route } from 'react-router-dom'
import CustomerSignup from './Secens/CustomerSignup'
import Home from './Secens/Home'
// import Aboutus from './Secens/AboutUs'
// import Blog from './Secens/Blog'
// import HowItWorks from './Secens/HowItWorks'
import SP_BasicInfo from './Component/Basic_info'
import SP_TechnicalInfo from './Component/Technical-info'
import SP_ContractType from './Component/Contract-type'
import SelectSignup from './Secens/SignUpSlect';
import Dashboard from './Component/Dashboard';
import NewFeeds from './Component/NewFeeds';
// import MakeBid from './Component/makeBid';
// import Bid from './Component/bid';
import ProjectInfo from './Component/NewFeeds/projectinfo'
// import Bidding from './Component/bidding';

import NewProject from './Component/Dashboard/Projects/AddNewProject';
import ProjectTechnicalInfo from './Component/Dashboard/Projects/ProjectTechnicalInfo';
import ProjectType from './Component/Dashboard/Projects/ProjectType';


 function Main() { 
  return (
    <main>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/CustSignup' component={CustomerSignup}/>
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/newfeeds' component={NewFeeds}/>
        <Route path='/addnew' component={NewProject}/> 
        <Route path='/projectTechnicalInfo' component={ProjectTechnicalInfo}/>
         <Route path='/projectType' component={ProjectType}/>
         {/* <Route path='/makebid' component={MakeBid}/>  
         <Route path='/bid' component={Bid}/>   */}
        <Route path='/projectInfo' component={ProjectInfo}/>
         {/* <Route path='/bidding' component={Bidding}/>   */}
        <Route exact path='/' component={App}/>
        <Route path='/CustSignup' component={CustomerSignup}/>
        <Route path='/SP_TechnicalInfo' component={SP_TechnicalInfo}/>
        <Route path='/basicInfo' component={SP_BasicInfo}/>
        <Route path='/SP_ContractType' component={SP_ContractType}/>
        {/* <Route path='/about' component={Aboutus}/>
        <Route path='/blog' component={Blog}/>
        <Route path='/howitwork' component={HowItWorks}/> */}
        <Route path='/Login' component={Login}/>
        <Route path='/choose-signup' component={SelectSignup} />
      </Switch>
    </main>
  );
}
