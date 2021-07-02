import { combineReducers } from "redux";
import UserReducer from "../reducers/userReducer";

export default combineReducers(
	Object.assign({
		UserReducer,
	}),
);
