import { createReducer } from "../store/utils";
import { ACTION_CONSTANTS } from "../utils/constants/actionConstants";
import { appConstants } from "../utils/constants/appConstants";

const initialState = {
    [appConstants.enable_loader]: false,
};

export default createReducer(initialState, {
    [ACTION_CONSTANTS.SHOW_LOADER](state: any, action: any) {
        return {
            ...state,
            [appConstants.enable_loader]: true,
        };
    },
    [ACTION_CONSTANTS.HIDE_LOADER](state: any, action: any) {
        return {
            ...state,
            [appConstants.enable_loader]: false,
        };
    },
    [ACTION_CONSTANTS.ERROR_HANDLER](state: any, action: any) {
        return {
            ...state,
            [appConstants.enable_loader]: false,
        };
    },
    [ACTION_CONSTANTS.EXCEPTION_HANDLER](state: any, action: any) {
        return {
            ...state,
            [appConstants.enable_loader]: false,
        };
    },
    [ACTION_CONSTANTS.CLASS_DETAIL_FETCHED](state: any, action: any) {
        return {
            ...state,
            [appConstants.enable_loader]: false,
        };
    }

});
