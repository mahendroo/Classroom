import React from "react";
import { Text, ScrollView, Dimensions, Pressable, View, StyleSheet } from "react-native";
import { images } from "../utils/constants/assets";
import { colors } from "../utils/constants/colors";

import { dimensConstants } from "../utils/constants/dimensConstant";
import { globalStyles } from "../utils/globalStyles";
import { AppImageIcon } from "./AppImageIcon";
import { AppThemeModal } from "./AppThemeModal";

interface AppPickerProps {
    visible: boolean;
    onDismiss: () => void;
    data: Array<any> | undefined;
    idKey: string;
    valueKey: string;
    selectedIndex: number | undefined
    onItemSelected: (selectedIndex: number) => void;
}

const WINDOW_HEIGHT = Dimensions.get("window").height;

export const AppPicker = ({ visible, onDismiss, ...props }: AppPickerProps) => {

    return (
        <AppThemeModal visible={visible} onDismiss={onDismiss}>
            {(handleDismiss) => {
                return (
                    <>
                        <View style={globalStyles.draggableViewStyle} />
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            style={styles.scrollContainerStyle}>
                            {props.data?.map((item, index) => {
                                return (
                                    <Pressable
                                        key={item[props.idKey]}
                                        style={({ pressed }) => [styles.itemContainer, { opacity: pressed ? 0.4 : 1 }]}
                                        onPress={() => {
                                            props.onItemSelected(index)
                                            handleDismiss();
                                        }}>
                                        <Text style={styles.itemLabelStyle}>{item[props.valueKey]}</Text>
                                        {index === props.selectedIndex ?
                                            <AppImageIcon disabled={true} image={images.tickIcon} wrapperStyle={styles.selectedItemTickStyle} />
                                            : null}
                                    </Pressable>
                                );
                            })}

                            <View style={styles.bottomMarginView} />
                        </ScrollView>
                    </>
                );
            }}
        </AppThemeModal>
    );
};


const styles = StyleSheet.create({
    scrollContainerStyle: {
        height: WINDOW_HEIGHT * 0.8,
        padding: dimensConstants.standard_padding,
        marginBottom: dimensConstants.standard_margin_vertical,
    },
    itemContainer: {
        flexDirection: 'row',
        height: 50,
        marginVertical: 2,
        justifyContent: 'center',
        borderRadius: 4,
        borderColor: colors.secondary_action_text_theme,
        borderWidth: 2
    },
    itemLabelStyle: {
        flex: 1,
        alignSelf: 'center',
        fontWeight: 'bold',
        marginHorizontal: dimensConstants.standard_margin_horizontal
    },
    selectedItemTickStyle: {
        flex: -1,
        alignSelf: 'center',
        marginHorizontal: dimensConstants.standard_margin_horizontal
    },
    bottomMarginView: {
        height: dimensConstants.button_height
    }
});