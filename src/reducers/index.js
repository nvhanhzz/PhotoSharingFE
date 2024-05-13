import { combineReducers } from "redux";
import LoginReducer from "./Login";
import UpLoadPhotoReducer from "./UpLoadPhoto";

const allReducers = combineReducers({
    login: LoginReducer,
    upLoadPhoto: UpLoadPhotoReducer
});

export default allReducers;