import { combineReducers } from "redux";
import UIReducer from "../reducers/UIReducer";

export default combineReducers(
	Object.assign({
		UIReducer,
	}),
);
