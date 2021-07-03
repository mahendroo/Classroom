import { NavigationContainer } from "@react-navigation/native";
import React, { Component } from "react";
import { navigationRef } from "./utils";
import DashboardNavigation from "./DashboardNavigation";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../utils/globalStyles";

export default class Navigation extends Component {
	constructor(props: Readonly<{}>) {
		super(props);
	}

	render() {
		return <SafeAreaProvider>
			<NavigationContainer ref={navigationRef}>
				<SafeAreaView style={globalStyles.flex1} edges={['top']}>
					<DashboardNavigation />
				</SafeAreaView>
			</NavigationContainer>
		</SafeAreaProvider>;
	}
}
