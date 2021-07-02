import { Alert } from "react-native";
import { emptyFunction } from "../utils/globalFunctions";
import { STRING_CONSTANTS } from "../utils/constants/stringConstants";

export function showAlert(message: string) {
	Alert.alert(
		STRING_CONSTANTS.app_name,
		message,
		[{ text: STRING_CONSTANTS.ok_text, onPress: emptyFunction, style: "default" }],
		{ cancelable: false },
	);
}
export function showAlertDialog(
	title: string,
	message: string,
	buttonTitle: string,
	callback: Function,
) {
	if (!callback) {
		callback = emptyFunction;
	}
	Alert.alert(
		title,
		message,
		[{ text: buttonTitle, onPress: () => callback(), style: "default" }],
		{ cancelable: false },
	);
}
export function showDoubleActionAlertDialog(
	title: string,
	message: string,
	positiveTitle: string,
	positiveCallback: Function,
	negativeTitle: string,
	negativeCallback: Function,
) {
	if (!positiveCallback) {
		positiveCallback = emptyFunction;
	}
	if (!negativeCallback) {
		negativeCallback = emptyFunction;
	}
	Alert.alert(
		title,
		message,
		[
			{
				text: negativeTitle,
				style: "cancel",
				onPress: () => negativeCallback(),
			},
			{
				text: positiveTitle,
				style: "destructive",
				onPress: () => positiveCallback(),
			},
		],
		{ cancelable: false },
	);
}
export function showTripleActionAlertDialog(
	title: string,
	message: string,
	positiveTitle: string,
	positiveCallback: Function,
	negativeTitle: string,
	negativeCallback: Function,
	neutralTitle: string,
	neutralCallback: Function,
) {
	if (!positiveCallback) {
		positiveCallback = emptyFunction;
	}
	if (!negativeCallback) {
		negativeCallback = emptyFunction;
	}
	if (!neutralCallback) {
		neutralCallback = emptyFunction;
	}
	Alert.alert(
		title,
		message,
		[
			{
				text: positiveTitle,
				style: "default",
				onPress: () => positiveCallback(),
			},
			{
				text: negativeTitle,
				style: "destructive",
				onPress: () => negativeCallback(),
			},
			{
				text: neutralTitle,
				style: "cancel",
				onPress: () => neutralCallback(),
			},
		],
		{ cancelable: false },
	);
}
