
import { StyleSheet } from "react-native";
import { colors } from "../../utils/constants/colors";
import { dimensConstants } from "../../utils/constants/dimensConstant";
import { elevationShadowStyle } from "../../utils/globalFunctions";
import { globalStyles } from "../../utils/globalStyles";

export const styles = StyleSheet.create({
    containerStyle: {
        ...globalStyles.flex1,

    },
    studentCardWrapperStyle: {
        height: dimensConstants.standard_card_height,
        ...elevationShadowStyle(8),
        justifyContent: 'center',
    },
    studentCardContainerStyle: {
        marginVertical: dimensConstants.standard_margin_horizontal,
        ...elevationShadowStyle(8),
        height: 160,
        backgroundColor: colors.card_background_color,
        borderRadius: 16
    },
    shortPropertyContainerStyle: {
        flex: 1,
        justifyContent: 'center',
        margin: 10
    },
    shortPropertyInfoTextStyle: {
        alignSelf: 'center',
        // marginTop: dimensConstants.standard_padding
    },
    shortPropertyInfoLabelStyle: {
        ...globalStyles.subtitle,
        color: colors.primary_action_text_theme,
        fontWeight: 'bold',
        // marginTop: dimensConstants.standard_padding
    },
    shortPropertyInfoValueStyle: {
        ...globalStyles.subtitle,
        color: colors.secondary_action_text_theme,
        fontSize: 17,
    },
    shortPropertyInfoBorderViewStyle: {
        ...globalStyles.subtitle,
        backgroundColor: colors.secondary_action_text_theme,
        width: 1,
        opacity: 0.8,
        alignSelf: 'center',
        borderRadius: 8,
        height: "80%",
    },
    studentNameCardStyle: {
        ...globalStyles.title,
        color: colors.student_name_color,
    },
    studentIdCardStyle: {
        ...globalStyles.subtitle,
        color: colors.student_id_color,
        fontSize: 17,
        marginTop: 5,
    },
    studentCardMoreOptionContainerStyle: {
        flex: -1,
        justifyContent: 'center',
        marginEnd: dimensConstants.standard_padding,
        height: 40,
    },
    studentCardMoreOptionIconStyle: {
        alignSelf: 'center'
    },
    studentProfilePictureStyle: {
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: colors.secondary_action_text_theme,
        alignSelf: 'center',
        marginHorizontal: dimensConstants.standard_margin_horizontal
    },
    studentNameIdContainerStyle: {
        alignSelf: 'center',
        justifyContent: 'space-evenly',
        flex: 1,
        marginEnd: dimensConstants.standard_margin_horizontal
    },
    studentCardLowerBodyContainerStyle: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: dimensConstants.standard_margin_vertical
    },
    studentCardUpperBodyContainerStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 25
    }
});
