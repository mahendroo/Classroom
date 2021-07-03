import React from "react";
import { Provider } from "react-redux";
import store from "./src/store";
import AppContainer from "./src/containers/AppContainer";
// import Loader from "./src/components/Loader";

const App = (props: Readonly<any>) => {
	return (
		<Provider store={store}>
			<AppContainer />
		</Provider>
	);
};

export default App;
