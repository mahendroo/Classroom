import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { appConstants } from "../utils/constants/appConstants";
import { colors } from "../utils/constants/colors";
import { AppActivityIndicator } from "./AppActivityIndicator";

const AppLoader = (props: Readonly<any>) => {
    return props.showLoader ? (
        <View style={styles.loaderWraper}>
            <AppActivityIndicator />
        </View>
    ) : null;
};

const styles = StyleSheet.create({
    loaderWraper: {
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 1000,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.modal_background,
    },
});

const mapStateToProps = (state: any) => {
    return {
        showLoader: state.UIReducer[appConstants.enable_loader] || false,
    };
};

export default connect(mapStateToProps, null)(AppLoader);
