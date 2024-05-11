import { combineReducers } from "redux";
import LoginReducer from "./Login";

const allReducers = combineReducers({
    login: LoginReducer
});

export default allReducers;