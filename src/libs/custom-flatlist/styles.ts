import { StyleSheet } from "react-native";
import { colors } from "../../utils/constants/colors";

export const styles = StyleSheet.create({
    footerActivityIndicatorContainer: {
        paddingVertical: 20,
        borderColor: colors.primary_background_color,
        marginBottom: 20,
    },
    emptyFooter: {
        paddingVertical: 20,
        borderColor: colors.primary_background_color,
    },
    flatlist: {
        overflow: "hidden",
        // borderTopLeftRadius: 50,
        // borderTopRightRadius: 50,
        backgroundColor: colors.primary_background_color,
        flex: 1,
    },
    flatListStyle: {
        marginHorizontal: 20,
        marginTop: 20,
        justifyContent: "center",
    },
    emptyListBodyStyle: {
        alignItems: "center",
        flex: 1,
        height: "100%",
        width: "100%",
        // backgroundColor: 'yellow'
    },
    emptyListContentStyle: {
        color: colors.secondary_theme,
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 16,
        marginTop: 20,
    },
    refreshIconStyle: {
        color: colors.secondary_theme,
        marginTop: 20,
    },
});
