import { combineReducers } from "redux";
import LoginReducer from "./Login";
import UpLoadPhotoReducer from "./UpLoadPhoto";
import AddCommentReducer from "./AddComment";

const allReducers = combineReducers({
    login: LoginReducer,
    upLoadPhoto: UpLoadPhotoReducer,
    addComment: AddCommentReducer
});

export default allReducers;