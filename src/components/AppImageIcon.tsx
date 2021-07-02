import React from "react";
import { Image, Pressable } from "react-native";
import { globalStyles } from "../utils/globalStyles";

/**
 *
 * @param props
 *
 * @param onPress : For Handling Button Press
 * @param image : Image Icon to be shown
 * @param wrapperStyle : For Wrapper Style of Image Surrounding
 * @param iconStyle : For Icon Style of Image
 */

export const AppImageIcon = ({
	onPress,
	wrapperStyle = globalStyles.iconWrapper,
	iconStyle = globalStyles.iconStyle,
	image,
}: any) => {
	return (
		<Pressable onPress={onPress} style={wrapperStyle}>
			<Image source={image} style={iconStyle} resizeMode={"contain"} />
		</Pressable>
	);
};
