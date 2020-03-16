import React from "react";
import ReactDOM from "react-dom";
// import './index.css';
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// import 'bootstrap/dist/css/bootstrap.min.css';
import "jquery";
import "popper.js";
import "bootstrap/dist/css/bootstrap.min.css";
// import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./Secens/Login";
// import MultiOptionCheck from "./Secens/check_multi";
import SPsignup from "./Secens/SPsignup";
import EnterNewPassword from "./Secens/ForgotPassword";

import SearchSp from "./Secens/search-sp";
import ResetPasswordRequest from "./Secens/ResetPassword";
import Aboutus from "./Secens/AboutUs";
import Blog from "./Secens/Blog";
import HowItWorks from "./Secens/HowItWorks";
import CustomerSignup from "./Secens/CustomerSignup";
import BasicInfo from "./Component/Basic_info";
// import SP_TechnicalInfo from "./Component/Technical-info";
// import SP_ContractType from "./Component/Contract-type";
import CheckLoader from "./Component/loader";
import SelectSignup from "./Secens/SignUpSlect";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import configureStore from "./store";
import NewFeeds from "./Component/NewFeeds";
import Dashboard from "./Component/Dashboard";
import NewProject from "./Component/Dashboard/Projects/AddNewProject";
import ProjectTechnicalInfo from "./Component/Dashboard/Projects/ProjectTechnicalInfo";
import BidByProject from "./Component/Dashboard/bidByProject";
import ProjectType from "./Component/Dashboard/Projects/ProjectType";
import MyProject from "./Component/Dashboard/myproject";
import BidDetails from "./Component/Dashboard/BidDetails";
import Workspace from "./Component/Dashboard/Workspace";
import ActiveProjects from "./Component/Dashboard/ActiveProjects";
import MyProfile from "./Component/Dashboard/profile";
import GiveReviews from "./Component/Dashboard/Reviews";
import EditProfileCust from "./Component/Dashboard/editProfile";
import ProjectDetails from "./Component/Dashboard/ProjectDetails";
import Chat from "./Component/Dashboard/Chat";
import ProjectInfo from "./Component/NewFeeds/projectinfo";
import ProjectFilesView from "./Component/projectFilesView"; //projectFiles
import ChangePassword from "./Component/Dashboard/ChangePassword";

//Sp Routes of Dashboard
import MyDashboard from "./Component/DashboardSp";
import MyBidByProject from "./Component/DashboardSp/bidByProject";

import MakeBid from "./Component/DashboardSp/makeBid";
import MyBidDetails from "./Component/DashboardSp/BidDetails";
import MyWorkspace from "./Component/DashboardSp/Workspace";
import ClosedProjects from "./Component/DashboardSp/ClosedProjects";
import cancelledProjects from "./Component/DashboardSp/cancelledProjects";
import MyActiveProjects from "./Component/DashboardSp/ActiveProjects";
import SPProfile from "./Component/DashboardSp/MyProfile";
import Reviews from "./Component/DashboardSp/Reviews";
import MyProjectDetails from "./Component/DashboardSp/ProjectDetails";
import EditProfileSp from "./Component/DashboardSp/editProfile";
// import MyChat from "./Component/DashboardSp/Chat";

import ChangeMyPassword from "./Component/DashboardSp/ChangePassword";

const store = configureStore();

// import store from './store.js'
// const initialState = {};
// const store = configureStore(initialState, browserHistory);
// const store = createStore(rootReducer, initialStore);
const routing = (
  <CookiesProvider>
    <Router>
      <Provider store={store}>
        <div>
          <Route exact path="/" component={App} />
          {/* sp dashboard routes */}
          <Route path="/projectFiles/:fileUrl" component={ProjectFilesView} />
          <Route path="/mydashboard" component={MyDashboard} />
          <Route path="/checkloader" component={CheckLoader} />
          <Route path="/editProfileSp" component={EditProfileSp} />

          <Route path="/activeProjects" component={MyActiveProjects} />
          <Route path="/closedprojects" component={ClosedProjects} />
          <Route path="/cancelledprojects" component={cancelledProjects} />
          <Route path="/sp_profile" component={SPProfile} />
          <Route path="/p_workspace/:projectId" component={MyWorkspace} />
          <Route
            path="/project_details/:projectId"
            component={MyProjectDetails}
          />
          <Route path="/makebid/:projectId" component={MakeBid} />
          <Route
            exact
            path="/changepassworduser"
            component={ChangeMyPassword}
          />
          <Route
            path="/projectbids/:projectId/:project_title"
            component={MyBidByProject}
          />
          <Route path="/givereviews/:projectId/" component={Reviews} />
          <Route
            path="/bidDetails/:bid_id/:project_title/:project_id"
            component={BidDetails}
          />
          {/* sp dashboard routes end */}

          <Route exact path="/changepassword" component={ChangePassword} />

          <Route exact path="/myprofile" component={MyProfile} />
          <Route path="/CustSignup" component={CustomerSignup} />

          {/* <Route path="/SP_TechnicalInfo" component={SP_TechnicalInfo} /> */}
          <Route path="/basicInfo" component={BasicInfo} />
          {/* <Route path="/SP_ContractType" component={SP_ContractType} /> */}
          <Route path="/chat" component={Chat} />
          <Route
            exact
            path="/forgotpassword"
            component={ResetPasswordRequest}
          />
          {/* problem here */}
          <Route path="/Home/:key" component={EnterNewPassword} />
          <Route path="/newfeeds" component={NewFeeds} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/addnew" component={NewProject} />
          <Route path="/myActiveProjects" component={ActiveProjects} />

          <Route path="/projectdetails/:projectId" component={ProjectDetails} />

          <Route
            path="/bid_detail/:bid_id/:project_title/:project_id"
            component={MyBidDetails}
          />
          <Route path="/workspace/:projectId" component={Workspace} />

          <Route
            path="/bidsbyproject/:projectId/:project_title"
            component={BidByProject}
          />
          <Route path="/reviews/:projectId/" component={GiveReviews} />

          <Route path="/myproject" component={MyProject} />
          <Route path="/editProfileCust" component={EditProfileCust} />

          {/* <Route path='/bid' component={Bid}/>  
        // <Route path='/bidding' component={Bidding}/>   */}
          <Route path="/projectInfo" component={ProjectInfo} />
          <Route
            path="/projectTechnicalInfo"
            component={ProjectTechnicalInfo}
          />
          <Route path="/projectType" component={ProjectType} />

          <Route path="/Login" component={Login} />
          {/* <Route path="/check_multi" component={MultiOptionCheck} /> */}

          <Route path="/search_sp" component={SearchSp} />
          <Route path="/spsingup" component={SPsignup} />
          <Route path="/about" component={Aboutus} />
          <Route path="/blog" component={Blog} />
          <Route path="/howitwork" component={HowItWorks} />
          <Route path="/choose-signup" component={SelectSignup} />
        </div>
      </Provider>
    </Router>
  </CookiesProvider>
);
ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
