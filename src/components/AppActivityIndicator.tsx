import React from "react";
import { ActivityIndicator } from "react-native";
import { colors } from "../utils/constants/colors";

/**
 *
 * @param props
 *
 * @param color : Loader Color
 */

export const AppActivityIndicator = ({
	color = colors.primary_theme,
}: any) => {
	return (
		<ActivityIndicator animating size="large" color={color} />
	);
};
