import React, { Component } from "react";
import { connect } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { NAVIGATIONS } from "../utils/constants/navigationConstants";
import Homepage from "../containers/student-list";
import { fetchClassDetails } from "../network/studentDetailsRequests";

/**
 * This is the main handler component for Navigation
 */

const Stack = createStackNavigator();
class DashboardNavigation extends Component<any, any> {
	constructor(props: Readonly<{}>) {
		super(props);

		this.props.fetchClassDetails()
	}

	render() {
		return (
			<Stack.Navigator
				initialRouteName={NAVIGATIONS.HOME_PAGE}
				headerMode="none">
				<Stack.Screen
					name={NAVIGATIONS.HOME_PAGE}
					component={Homepage}
				/>
			</Stack.Navigator>
		);
	}
}

export default connect(null, { fetchClassDetails })(DashboardNavigation);
