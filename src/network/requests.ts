import {
	isNotEmpty, logOnConsole,
} from "../utils/globalFunctions";
import { apiConstants } from "../utils/constants/apiConstants";
import { actionCreators } from "../actions/actionCreators";
import { prepareApiRequest } from "./index";
import { isDataPaginating, shouldShowTopLoaderOnListing } from "../libs/custom-flatlist/utils";
import { API_HEADERS, API_REQUEST } from "./collections";

export const flatlistWrapper = (
	url: string,
	typeOfRequest: number,
	nextPageUrl: string,
	body: any,
	params: any,
	path: string,
	succesCallback: Function,
	errorCallback: Function,
) => {
	logOnConsole("Body Request", body)
	return (dispatch: any) => {
		if (shouldShowTopLoaderOnListing(typeOfRequest)) {
			showLoader(true, dispatch);
		}
		if (isDataPaginating(typeOfRequest) && isNotEmpty(nextPageUrl)) {
			url = nextPageUrl;
		}

		prepareApiRequest(
			url,
			API_REQUEST.POST,
			API_HEADERS.TYPE_RAW_DATA,
			params,
			body,
			(response: any) => {
				let nextPage = undefined;
				if (body[apiConstants.page_key] < response[apiConstants.data_key][apiConstants.pages_key])
					nextPage = response[apiConstants.data_key][apiConstants.page_key] + 1

				succesCallback(
					response[apiConstants.data_key][apiConstants.docs_key],
					response[apiConstants.data_key][apiConstants.next_page_url_key],
					nextPage,
				);
				if (shouldShowTopLoaderOnListing(typeOfRequest)) {
					showLoader(false, dispatch);
				}
			},
			(errorMessage: string) => handleError(errorMessage, errorCallback, dispatch),
			(exception: any) => handleException(exception, dispatch),
		);
	};
};

export const commonApiWrapper = (
	dispatch: Function,
	url: string,
	apiRequestType: String,
	contentType: String,
	path: string | null,
	requestData: any,
	params: any,
	successCallback: Function,
	errorCallback: Function,
) => {
	showLoader(true, dispatch);
	if (isNotEmpty(path)) {
		url = `${url}${path}/`;
	}
	prepareApiRequest(
		url,
		apiRequestType,
		contentType,
		params,
		requestData,
		successCallback,
		(errorMessage: string) => handleError(errorMessage, errorCallback, dispatch),
		(exception: any) => handleException(exception, dispatch),
	);
};

const showLoader = (shouldShow: boolean, dispatch: any) => {
	if (shouldShow) {
		dispatch(actionCreators.showLoader);
	} else {
		dispatch(actionCreators.hideLoader);
	}
};

const handleError = (errorMessage: string, errorCallback: Function, dispatch: any) => {
	if (isNotEmpty(errorMessage)) {
		dispatch(actionCreators.errorHandler(errorMessage));
	}
	if (errorCallback) {
		errorCallback();
	}
};

const handleException = (exception: any, dispatch: any) => {
	if (isNotEmpty(exception)) {
		dispatch(actionCreators.exceptionHandler(exception));
	}
};
