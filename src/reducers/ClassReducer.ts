import { createReducer } from "../store/utils";
import { ACTION_CONSTANTS } from "../utils/constants/actionConstants";
import { appConstants } from "../utils/constants/appConstants";

const initialState = {

};

export default createReducer(initialState, {
    [ACTION_CONSTANTS.CLASS_DETAIL_FETCHED](state: any, action: any) {
        return {
            ...state,
            [appConstants.data]: action[appConstants.data],
        };
    },
});
