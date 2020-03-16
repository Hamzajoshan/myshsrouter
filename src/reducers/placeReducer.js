import { ADD_TOKEN, ADD_USERID, ADD_SPID } from '../actions/types';
// import moment from 'moment';

const initialState = {
  Token:'',
  userId: '',
  spId: '',
  // date:moment().format("L")
};

const placeReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_TOKEN:
     
    // console.log('token Reducer');  
    return {
        ...state,
      
        Token: action.payload
       
      };
      case ADD_USERID:
     
        // console.log('token Reducer');  
        return {
            ...state,
          
            userId: action.payload
           
          };
          case ADD_SPID:
     
        // console.log('token Reducer');  
        return {
            ...state,
          
            spId: action.payload
           
          };
  
    default:
      return state;
  }
}

export default placeReducer;