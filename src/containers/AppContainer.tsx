import React from "react";
import Navigation from "../navigation";
import AppLoader from "../components/AppLoader";

const AppContainer = (props: any) => {
    return (
        <>
            <Navigation />
            <AppLoader {...props} />
        </>
    );
};
export default AppContainer;
