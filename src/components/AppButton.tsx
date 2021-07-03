import React from "react";
import { GestureResponderEvent, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import { Text, Pressable } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "../utils/constants/colors";
import { dimensConstants } from "../utils/constants/dimensConstant";
import { fontSize } from "../utils/constants/fonts";
import { emptyFunction } from "../utils/globalFunctions";
import { globalStyles } from "../utils/globalStyles";

export const AppButton = ({
	onPress = emptyFunction,
	wrapperStyle = styles.buttonStyle,
	textStyle = styles.textStyle,
	label,
}: AppButtonProps) => {
	return (
		<View style={styles.buttonContainer}>
			<Pressable onPress={onPress} style={({ pressed }) => [{ opacity: pressed ? 0.4 : 1 }]}>
				<LinearGradient style={wrapperStyle} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={["#CD853F", "#A0522D"]}>
					<Text style={textStyle}>{label.toUpperCase()}</Text>
				</LinearGradient>
			</Pressable >
		</View>
	);
};

const styles = StyleSheet.create({
	buttonContainer: {
		justifyContent: 'center',
		marginVertical: dimensConstants.standard_margin_horizontal
	},
	buttonStyle: {
		width: '80%',
		height: dimensConstants.button_height,
		justifyContent: 'center',
		alignSelf: 'center',
		borderRadius: 8
	},
	textStyle: {
		alignSelf: 'center',
		color: colors.card_background_color,
		fontSize: fontSize.form_sub_title_size,
		fontWeight: 'bold'
	},
});

/**
 *
 * @param props
 *
 * @param onPress : For Handling Button Press
 * @param label : Text Label to be shown
 * @param wrapperStyle : For Wrapper Style of Image Surrounding
 * @param textStyle : For Style of Label Text
 */

export interface AppButtonProps {
	onPress?: null | ((event: GestureResponderEvent) => void),
	wrapperStyle?: StyleProp<ViewStyle>,
	textStyle?: StyleProp<TextStyle>,
	label: string,
}