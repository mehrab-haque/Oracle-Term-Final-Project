import {combineReducers} from 'redux'
import AuthReducer from "./auth";

const allReducers=combineReducers({
auth:AuthReducer

})

export default allReducers
