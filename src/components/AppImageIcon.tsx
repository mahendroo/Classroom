import React from "react";
import { GestureResponderEvent, ImageSourcePropType } from "react-native";
import { Image, Pressable } from "react-native";
import { emptyFunction } from "../utils/globalFunctions";
import { globalStyles } from "../utils/globalStyles";

export const AppImageIcon = ({
	onPress = emptyFunction,
	wrapperStyle = globalStyles.iconWrapper,
	iconStyle = globalStyles.iconStyle,
	image,
}: AppImageProps) => {
	return (
		<Pressable onPress={onPress} style={({ pressed }) => [wrapperStyle, { opacity: pressed ? 0.4 : 1 }]}>

			<Image source={image} style={iconStyle} resizeMode={"contain"} />
		</Pressable >
	);
};

/**
 *
 * @param props
 *
 * @param onPress : For Handling Button Press
 * @param image : Image Icon to be shown
 * @param wrapperStyle : For Wrapper Style of Image Surrounding
 * @param iconStyle : For Icon Style of Image
 */

export interface AppImageProps {
	onPress?: null | ((event: GestureResponderEvent) => void),
	wrapperStyle?: object,
	iconStyle?: object,
	image: ImageSourcePropType
}