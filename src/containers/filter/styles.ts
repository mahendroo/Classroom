import { StyleSheet } from "react-native";
import { colors } from "../../utils/constants/colors";
import { dimensConstants } from "../../utils/constants/dimensConstant";
import { fontSize } from "../../utils/constants/fonts";

export const styles = StyleSheet.create({
    filterOptionsInputWrapper: {
        borderRadius: 4,
        borderColor: colors.secondary_action_text_theme,
        padding: 10,
        borderWidth: 1,
        marginTop: 10,
        flexDirection: 'row',
    },
    draggableViewStyle: {
        width: 50,
        height: 5,
        borderRadius: 4,
        backgroundColor: colors.secondary_action_text_theme,
        alignSelf: 'center',
        marginVertical: dimensConstants.standard_margin_vertical
    },
    filterHeaderContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: dimensConstants.standard_margin_horizontal
    },
    filterSeparationBorderStyle: {
        width: '100%',
        backgroundColor: colors.secondary_action_text_theme,
        height: 2
    },
    filterCancelActionStyle: {
        color: colors.secondary_action_text_theme,
        fontSize: fontSize.subtitle_size,
        alignSelf: 'center',
        marginBottom: dimensConstants.standard_margin_vertical
    },
    filterHeaderTextStyle: {
        fontWeight: 'bold',
        fontSize: 24,
    },
    filterCancelTextStyle: {
        color: colors.primary_action_text_theme,
        alignSelf: 'center'
    },
    filterOptionLabelStyle: {
        fontWeight: 'bold'
    },
    filterOptionItemContainerStyle: {
        marginHorizontal: dimensConstants.standard_margin_horizontal,
        marginBottom: 25
    },
    filterOptionTextInputStyle: {
        margin: 2,
        width: '100%'
    },
    filterOptionDropdownTextStyle: {
        flex: 1,
        alignSelf: 'center'
    },
    filterOptionsDropdownIconStyle: {
        alignSelf: 'flex-end'
    },
})