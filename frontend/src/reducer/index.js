import {combineReducers} from 'redux'
import AuthReducer from "./auth";
import RegReducer from "./register";

const allReducers=combineReducers({
auth:AuthReducer,
regAuth:RegReducer

})

export default allReducers
