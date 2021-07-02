import { Platform } from "react-native";
import { appConstants } from "./constants/appConstants";
import { colors } from "./constants/colors";

const enum PLATFORMS {
    IOS = "ios",
    ANDROID = "android"
}

export const isAndroid = () => {
	return Platform.OS === PLATFORMS.ANDROID;
};

export const isIos = () => {
	return Platform.OS === PLATFORMS.IOS;
};

export const elevationShadowStyle = (elevation: any) => {
	return {
		elevation,
		shadowColor: colors.modal_background,
		shadowOffset: { width: 0, height: 0.5 * elevation },
		shadowOpacity: 0.3,
		shadowRadius: 0.8 * elevation,
	};
};

export const emptyFunction = () => {};

export const objToFormData = (rawData: any) => {
	let formData: FormData = new FormData();
	if (rawData && rawData != null && typeof rawData === "object") {
		Object.keys(rawData).map((item, index) => {
			formData.append(item, rawData[item]);
		});
	}
	return formData;
};

export const isNotEmpty = (data: any) => {
	return data !== null && data !== undefined && data !== "";
};

export const logOnConsole = (...arg: any) => {
	if (__DEV__) {
		console.log(arg);
	}
};
