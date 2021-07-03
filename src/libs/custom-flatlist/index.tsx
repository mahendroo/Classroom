import React, { Component, forwardRef } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	SectionList,
	Animated,
} from "react-native";
import { connect } from "react-redux";
import { isDataPaginating } from "./utils";
import { STRING_CONSTANTS } from "../../utils/constants/stringConstants";
import { flatlistWrapper } from "../../network/requests";
import { showAlert } from "../nativeAlert";
import { CustomFlatlistProps, CustomFlatListState, defaultProps } from "./collection";
import { styles } from "./styles";
import { FLATLIST_REQUEST } from "./utils";
import { isNotEmpty } from "../../utils/globalFunctions";
import { AppActivityIndicator } from "../../components/AppActivityIndicator";
import { apiConstants } from "../../utils/constants/apiConstants";

type NullOrUndefined = null | undefined

class CustomFlatList extends Component<CustomFlatlistProps, CustomFlatListState> {
	nextUrl: string | NullOrUndefined;
	nextPage: number | NullOrUndefined;
	requestInProgress: boolean = false;

	static defaultProps = defaultProps;

	constructor(props: Readonly<CustomFlatlistProps>) {
		super(props);
		this.state = {
			data: [],
			isRequesting: true,
			refreshing: false,
			sectionHeader: [],
			sectionData: [],
		};
	}
	componentDidMount() {
		if (this.props.shouldRefreshOnFocus !== true) {
			this.didFocus();
		}
	}

	didFocus = () => {
		this.requestData(FLATLIST_REQUEST.FIRST_TIME);
	};


	/**
	 * Check if Pagination is complete or not
	 */
	hasMoreData = () => {
		return isNotEmpty(this.nextUrl) || isNotEmpty(this.nextPage);
	}

	/**
	 * This method reviews and makes the respective data call for fetching from API
	 * @param typeOfRequest Defines if the request is made for Pagination, or first time or refreshing
	 */
	requestData = (typeOfRequest: number) => {
		if (!this.requestInProgress) {
			switch (typeOfRequest) {
				case FLATLIST_REQUEST.REFRESH:
					this.nextUrl = undefined;
					this.nextPage = 1;
					this.setState({ refreshing: true });
					break;
				case FLATLIST_REQUEST.FIRST_TIME:
					this.nextUrl = undefined;
					this.nextPage = 1;
					break;
			}
			this.setState({ isRequesting: true });
			if (
				(isDataPaginating(typeOfRequest) && this.hasMoreData()) ||
				!isDataPaginating(typeOfRequest)
			) {
				this.requestInProgress = true;
				this.props.flatlistWrapper(
					this.props.requestUrl,
					typeOfRequest,
					this.nextUrl,
					{ ...this.props.requestData, [apiConstants.limit_key]: "10", [apiConstants.page_key]: this.nextPage?.toString() },
					this.props.requestParams,
					this.props.requestPath,
					(listData: any, nextUrl: string | NullOrUndefined, nextPage: number | NullOrUndefined) => {
						this.requestInProgress = false;
						this.setData(listData, typeOfRequest, nextUrl, nextPage);
					},
					(errorMessage: string) => {
						this.requestInProgress = false;
						this.showErrorMessage(errorMessage);
						this.setState({ data: [], refreshing: false, isRequesting: false });
					},
				);
			}
		}
	};

	showErrorMessage = (errorMessage: string) => {
		// TODO: Change this to Toast
		showAlert(errorMessage);
	};

	/**
	 * This method handles the existing data and new data received from API
	 * It prepares data based on the type of FlatList/SectionList
	 * @param dataObject Data received from API
	 * @param typeOfRequest Type of API request made
	 * @param nextUrl Next Url for Paginated data
	 * @param nextPage Next Page Number to pass for pagination and filter
	 */
	setData = (dataObject: any, typeOfRequest: number, nextUrl: string | NullOrUndefined, nextPage: number | NullOrUndefined) => {
		this.nextUrl = nextUrl;
		this.nextPage = nextPage
		let data: any;
		let tempSectionHeader = this.state.sectionHeader && typeOfRequest === FLATLIST_REQUEST.PAGINATION ? [...this.state.sectionHeader] : [];
		let tempSectionData = this.state.sectionData && typeOfRequest === FLATLIST_REQUEST.PAGINATION ? [...this.state.sectionData] : [];

		if (this.props.isSection) {
			dataObject.forEach((element: any) => {
				let sectionHeaderTitle = this.props?.sectionHeaderTitle(element);

				let tempIndex = tempSectionHeader.findIndex(item => item === sectionHeaderTitle);

				if (tempIndex !== -1) {
					let tempSectionDataIndex = tempSectionData.findIndex(item => item.title === sectionHeaderTitle);

					if (tempSectionDataIndex !== -1) {
						tempSectionData[tempSectionDataIndex].data.push(element);
					} else {
						let newSectionObject = { title: '', data: [] };
						newSectionObject.title = sectionHeaderTitle;
						newSectionObject.data.push(element);
						tempSectionData.push(newSectionObject);
					}
				} else {
					tempSectionHeader.push(sectionHeaderTitle);
					let newSectionObject = { title: '', data: [] };
					newSectionObject.title = sectionHeaderTitle;
					newSectionObject.data.push(element);
					tempSectionData.push(newSectionObject);
				}
			});
			data = [...tempSectionData];
		} else {
			data = dataObject;
		}

		switch (typeOfRequest) {
			case FLATLIST_REQUEST.FIRST_TIME:
				this.setState({ data: data, sectionHeader: tempSectionHeader, sectionData: tempSectionData, isRequesting: false });
				break;
			case FLATLIST_REQUEST.PAGINATION:
				let tempList = [...this.state.data, ...data];
				this.setState({ data: this.props.isSection ? data : tempList, sectionHeader: tempSectionHeader, sectionData: tempSectionData, isRequesting: false });
				break;
			case FLATLIST_REQUEST.REFRESH:
				this.setState({ data: data, sectionHeader: tempSectionHeader, sectionData: tempSectionData, refreshing: false, isRequesting: false });
				break;
			default:
				this.setState({ data: data, sectionHeader: tempSectionHeader, sectionData: tempSectionData, isRequesting: false });
				break;
		}
	};

	renderEmptyComponent = () =>
	(<>
		{!this.state.isRequesting ? (
			<TouchableOpacity
				style={styles.emptyListBodyStyle}
				disabled={!this.props.shouldRefreshOnTap}
				onPress={() => this.requestData(FLATLIST_REQUEST.FIRST_TIME)}
			>
				<Text style={styles.emptyListContentStyle}>
					{this.props.noDataText
						? this.props.noDataText
						: STRING_CONSTANTS.flatlist_default_no_data_text}
				</Text>
			</TouchableOpacity>
		) : null}
	</>);


	renderFooterComponent = () => {
		if (this.state.data && this.state.data.length < 1) {
			return null;
		} else if (this.hasMoreData()) {
			return (
				<View style={styles.footerActivityIndicatorContainer}>
					<AppActivityIndicator />
				</View>
			);
		} else {
			return this.props.footerComponent ? this.props.footerComponent : <View style={styles.emptyFooter} />;
		}
	};

	removeAnItem = (itemToBeRemoved: any, keyForComparison: string) => {
		let tempIndex = -1;
		if (this.state.data && Array.isArray(this.state.data)) {
			tempIndex = this.state.data.findIndex(item => item[keyForComparison] === itemToBeRemoved[keyForComparison]);
		}
		if (tempIndex !== -1) {
			let tempData = [...this.state.data];
			tempData.splice(tempIndex, 1);
			if (tempData.length > 0)
				this.setState({ data: tempData });
			else
				this.didFocus();
		}
		// TODO: Need to Handle sections
	};

	/**
	 * Used to share the update if any item is updated 
	 * For ex, if we want to do something on nth item being shown.
	 * Then this function will help to update the Parent Component
	 */
	onViewableItemChanged = ({ viewableItems }) => {
		if (viewableItems && viewableItems[0]) {
			let index = viewableItems[0].index;
			if (index !== -1 && this.props.onViewableItemsChanged)
				this.props.onViewableItemsChanged(this.state.data[index]);
		}
	};

	render() {

		const customProps = {
			renderItem: this.props.renderItem,
			ListFooterComponent: this.renderFooterComponent,
			ListEmptyComponent: this.renderEmptyComponent,
			refreshing: this.props.hideRefreshLoader ? false : this.state.refreshing,
			onEndReached: () => this.requestData(FLATLIST_REQUEST.PAGINATION),
			onRefresh: () => this.requestData(this.props.hideRefreshLoader ? FLATLIST_REQUEST.FIRST_TIME : FLATLIST_REQUEST.REFRESH),
			onViewableItemsChanged: this.onViewableItemChanged,
		};

		return (
			<View style={styles.flatlist}>
				{
					this.props.isSection ?
						<SectionList
							{...this.props}
							{...customProps}
							sections={this.state.data}
						/> :
						<Animated.FlatList
							{...this.props}
							{...customProps}
							data={this.state.data}
						/>
				}
			</View>

		);
	};
}

const ConnectedCustomFlatlist = connect(null, { flatlistWrapper })(CustomFlatList);

export default forwardRef<CustomFlatList, CustomFlatlistProps>((props: CustomFlatlistProps, ref: any) => {
	return <ConnectedCustomFlatlist {...props} ref={ref} />;
})

// export default connect(null, { flatlistWrapper })(CustomFlatList);

// Example Usage
// 			<CustomFlatList
// 				requestUrl="job-post/"
// 				requestParams={{
// 					status: 1,
// 					radius: 1000,
// 					lat: -33,
// 					lng: 151,
// 				}}
// 				ref={this.customFlatList}
// 				renderItem={
// 					({ item, index }) => <View style={{ backgroundColor: 'red', margin: 20, height: 40 }}><Text>{item.title}</Text></View>
// 				}
// 			// data={[]}
// 			/>	