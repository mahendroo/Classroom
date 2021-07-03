import React from "react";
import { GestureResponderEvent, ImageSourcePropType, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { colors } from "../utils/constants/colors";
import { dimensConstants } from "../utils/constants/dimensConstant";
import { emptyFunction } from "../utils/globalFunctions";
import { AppImageIcon } from "./AppImageIcon";

export const AppHeader = ({
	onRightActionPress = emptyFunction,
	rightActionContainerStyle = styles.rightActionStyle,
	rightActionImage,
	rightActionText,
}: AppHeaderProps) => {
	return (
		<View style={styles.headerStyle}>
			{rightActionImage ?
				<AppImageIcon onPress={onRightActionPress}
					image={rightActionImage}
					wrapperStyle={rightActionContainerStyle} />
				: null}
			{rightActionText && !rightActionImage ?
				<Text style={rightActionContainerStyle} >{rightActionText}</Text>
				: null}
		</View>

	);
};

const styles = StyleSheet.create({
	headerStyle: {
		backgroundColor: colors.primary_theme,
		width: '100%',
		height: dimensConstants.header_height,
		justifyContent: 'center',
	},
	rightActionStyle: {
		alignSelf: 'flex-end',
		color: colors.primary_action_text_theme,
		marginHorizontal: dimensConstants.standard_margin_horizontal
	},
});
/**
 *
 * @param props
 *
 * @param onRightActionPress : For Handling Button Press of right Action
 * @param rightActionImage : Right Action Image Icon to be shown
 * @param rightActionContainerStyle : For Wrapper Style of Right Action
 * @param rightActionText : Text For Right Action to be shown
 */

export interface AppHeaderProps {
	onRightActionPress?: null | ((event: GestureResponderEvent) => void),
	rightActionImage?: ImageSourcePropType,
	rightActionText?: string
	rightActionContainerStyle?: object,
}