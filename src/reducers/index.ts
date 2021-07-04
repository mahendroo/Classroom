import { combineReducers } from "redux";
import UIReducer from "../reducers/UIReducer";
import ClassReducer from "../reducers/ClassReducer";

export default combineReducers(
	Object.assign({
		UIReducer,
		ClassReducer,
	}),
);
