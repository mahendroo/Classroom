import React from "react";
import { Text, View } from "react-native";
import { STRING_CONSTANTS } from "../../utils/constants/stringConstants";
import { styles } from "./styles";

export const ShortPropertyInfo = ({
    label,
    value = STRING_CONSTANTS.value_not_available,
}: ShortPropertyInfoProps) => {
    return (
        <View style={styles.shortPropertyContainerStyle}>
            <Text style={[styles.shortPropertyInfoTextStyle, styles.shortPropertyInfoLabelStyle]} numberOfLines={1}>{value}</Text>
            <Text style={[styles.shortPropertyInfoTextStyle, styles.shortPropertyInfoValueStyle]} numberOfLines={1}>{label}</Text>
        </View>
    );
};

/**
 *
 * @param props
 *
 * @param label : Property Label
 * @param value : Information related to Label Property
 */

export interface ShortPropertyInfoProps {
    label: string,
    value: string | null | undefined,
}