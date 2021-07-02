import { StyleSheet } from "react-native";
import { colors } from "./constants/colors";
import { fontSize, fonts } from "./constants/fonts";
import { dimensConstants } from "./constants/dimensConstant";

export const globalStyles = StyleSheet.create({
	flex1: {
		flex: 1,
	},
	flex1WithBackground: {
		flex: 1,
		backgroundColor: colors.primary_background_color,
	},
	safeAreaViewStyle: {
		flex: 1,
		backgroundColor: colors.primary_background_color,
		paddingBottom: dimensConstants.standard_padding,
	},
	headerWrapper: {
		width: "100%",
		height: 60,
		backgroundColor: colors.secondary_background_color,
		flexDirection: "row",
	},
	headerTitle: {
		marginHorizontal: 60,
		fontSize: fontSize.header_title_size,
		fontFamily: fonts.primary_regular_font,
		color: colors.title_text_theme,
		flex: 1,
		textAlign: "center",
		alignSelf: "center",
	},
	iconStyle: {
		minHeight: dimensConstants.image_icon_height,
		minWidth: dimensConstants.image_icon_width,
		alignSelf: "center",
	},
	iconWrapper: {
		justifyContent: "center",
		position: "absolute",
		height: "100%",
		width: dimensConstants.image_icon_wrapper_width,
	},
	standardButtonWrapper: {
		borderRadius: 10,
		minHeight: 45,
		justifyContent: "center",
	},
	standardButton: {
		borderRadius: dimensConstants.border_radius,
		minHeight: dimensConstants.button_height,
		justifyContent: "center",
		backgroundColor: colors.primary_action_button_background_theme,
		marginHorizontal: dimensConstants.standard_margin_horizontal,
		marginVertical: dimensConstants.standard_margin_vertical,
	},
	standardButtonText: {
		color: colors.primary_action_text_theme,
		fontFamily: fonts.primary_regular_font,
		fontSize: fontSize.subtitle_size,
		justifyContent: "center",
		alignSelf: "center",
		textAlign: "center",
		textTransform: "uppercase",
	},
	standardMarginVertical: {
		marginVertical: 10,
	},
	standardMarginHorizontal: {
		marginHorizontal: dimensConstants.standard_margin_horizontal,
	},
	title: {
		fontSize: fontSize.title_size,
		fontFamily: fonts.primary_semi_bold_font,
		color: colors.primary_action_button_text_theme,
	},
	actionTitle: {
		fontSize: fontSize.title_size,
		fontFamily: fonts.primary_semi_bold_font,
		color: colors.primary_action_text_theme,
	},
	subtitle: {
		fontSize: fontSize.title_size,
		fontFamily: fonts.primary_semi_bold_font,
		color: colors.subtitle_text_theme,
	},
	onBoardingText: {
		fontFamily: fonts.primary_regular_font,
		fontSize: 16,
		lineHeight: 21,
		color: colors.text_color,
	},
	activeDotStyle: {
		width: 40,
		height: 8,
		borderRadius: 10,
	},
	dotStyle: {
		opacity: 0.4,
	},
	RCC: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	dot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		marginLeft: 8,
		backgroundColor: colors.dot_background,
	},
});
