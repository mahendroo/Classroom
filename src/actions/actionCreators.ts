import { ACTION_CONSTANTS } from "../utils/constants/actionConstants";
import { appConstants } from "../utils/constants/appConstants";

export const actionCreators = {
	showLoader: {
		[ACTION_CONSTANTS.TYPE]: ACTION_CONSTANTS.SHOW_LOADER,
		[appConstants.enable_loader]: true,
	},
	hideLoader: {
		[ACTION_CONSTANTS.TYPE]: ACTION_CONSTANTS.HIDE_LOADER,
		[appConstants.enable_loader]: false,
	},
	errorHandler: function (errorMessage: string) {
		return {
			[ACTION_CONSTANTS.TYPE]: ACTION_CONSTANTS.ERROR_HANDLER,
			[appConstants.error_message]: errorMessage,
		};
	},
	exceptionHandler: function (exception: any) {
		return {
			[ACTION_CONSTANTS.TYPE]: ACTION_CONSTANTS.EXCEPTION_HANDLER,
			[appConstants.exception_object]: exception,
		};
	},
};
