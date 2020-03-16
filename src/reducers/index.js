import {combineReducers} from 'redux';
import Tokens from './reducer';
import userId from './reducer';
import spId from './reducer';


export default combineReducers({
     Token: Tokens,
     userId: userId,
     spId: spId,
     
    
})