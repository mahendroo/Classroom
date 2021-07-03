import axios from "axios";
import qs from "qs";
import Config from "react-native-config";
import { objToFormData, logOnConsole } from "../utils/globalFunctions";
import { API_HEADERS, API_REQUEST } from "./collections";

/**
 * Kindly check for env files in root directory of project to get the Config
 * Default or for Dev: .env
 * Staging: .env.staging
 * Production: .env.production
 */

const TIMEOUT_DURATION_IN_MILLIS = 60000;

const defaultInstance = axios.create({
	baseURL: Config.BASE_URL + Config.BASE_API_VERSION,
	timeout: TIMEOUT_DURATION_IN_MILLIS,
	validateStatus: function (status: number) {
		return status >= 200 && status < 500;
	},
});

defaultInstance.interceptors.request.use(
	(config: any) => {
		logOnConsole("API Request Config:", config);
		if (config.data) {
			if (config.data instanceof FormData) {
				config.headers[API_HEADERS.CONTENT_TYPE] = API_HEADERS.TYPE_FORM_DATA;
			} else {
				config.headers[API_HEADERS.CONTENT_TYPE] = API_HEADERS.TYPE_RAW_DATA;
			}
		}
		config.paramsSerializer = (params: any) => {
			return qs.stringify(params, {
				arrayFormat: "brackets", //
				encode: false,
			});
		};
		return config;
	},
	(error: any) => {
		// Do something with request error
		logOnConsole("Request Error:", error);
		return Promise.reject(error);
	},
);

defaultInstance.interceptors.response.use(
	(response: any) => {
		return response.data;
	},
	(error: any) => {
		// Do something with request error
		logOnConsole("Response Error:", error);
		return Promise.reject(error);
	},
);

const getRequestData = (data: any, contentType: String) => {
	switch (contentType) {
		case API_HEADERS.TYPE_RAW_DATA:
			return data;
		case API_HEADERS.TYPE_MULTIPART_DATA:
		case API_HEADERS.TYPE_FORM_DATA:
			return objToFormData(data);
	}
	return data;
};

export const prepareApiRequest = (
	url: string,
	apiRequestType: String,
	contentType: String,
	params: any,
	body: any,
	successCallback: Function,
	errorCallback: Function,
	exceptionCallback: Function,
) => {
	requestApi(
		url,
		apiRequestType,
		params,
		getRequestData(body, contentType),
		successCallback,
		errorCallback,
		exceptionCallback,
	);
};

const requestApi = (
	url: string,
	apiRequestType: String,
	params: any,
	data: any,
	successCallback: Function,
	errorCallback: Function,
	exceptionCallback: Function,
) => {
	let promise: Promise<any> | null = null;
	switch (apiRequestType) {
		case API_REQUEST.GET:
			logOnConsole("GET Request");
			promise = defaultInstance.get(url, { params: params });
			break;
		case API_REQUEST.POST:
			logOnConsole("POST Request");
			promise = defaultInstance.post(url, data, { params: params });
			break;
		case API_REQUEST.PATCH:
			logOnConsole("PATCH Request");
			promise = defaultInstance.patch(url, data, { params: params });
			break;
		case API_REQUEST.PUT:
			logOnConsole("PUT Request");
			promise = defaultInstance.put(url, data, { params: params });
			break;
		case API_REQUEST.DELETE:
			logOnConsole("DELETE Request");
			promise = defaultInstance.delete(url, { data: data, params: params });
			break;
	}

	promise!!
		.then((response: any) => {
			// Success Condition
			if (response.status) {
				if (successCallback) {
					successCallback(response);
				}
			} else {
				// Error Condition
				if (errorCallback) {
					errorCallback();
				}
			}
		})
		.catch((ex: any) => {
			// Handle Exception
			if (exceptionCallback) {
				exceptionCallback(ex);
			}
		});
};
