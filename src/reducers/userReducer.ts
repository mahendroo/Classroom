import AsyncStorage from "@react-native-community/async-storage";
import { appConstants } from "../utils/constants/appConstants";
import { apiConstants } from "../utils/constants/apiConstants";
import { createReducer } from "../utils/globalFunction";
import { actionConstants } from "../utils/constants/actionConstants";

const initialState = {
	[apiConstants.user_data_key]: null,
	[apiConstants.access_token_key]: null,
	[apiConstants.refresh_token_key]: null,
};

export default createReducer(initialState, {
	[actionConstants.login_success](state: any, action: any) {
		AsyncStorage.multiSet([
			[appConstants.user_data, JSON.stringify(action[apiConstants.user_data_key])],
			[apiConstants.access_token_key, action[apiConstants.access_token_key]],
			[apiConstants.refresh_token_key, action[apiConstants.refresh_token_key]],
		]);
		return {
			...state,
			[apiConstants.user_data_key]: action[apiConstants.user_data_key],
			[apiConstants.access_token_key]: action[apiConstants.access_token_key],
			[apiConstants.refresh_token_key]: action[apiConstants.refresh_token_key],
		};
	},
	[actionConstants.user_detail_fetched](state: any, action: any) {
		AsyncStorage.multiSet([
			[appConstants.user_data, JSON.stringify(action[apiConstants.data_key])],
		]);
		return {
			...state,
			[apiConstants.user_data_key]: action[apiConstants.user_data_key],
		};
	},
});
