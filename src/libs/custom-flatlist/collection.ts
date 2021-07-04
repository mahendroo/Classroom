import { FlatListProps, SectionListProps } from "react-native";
import { styles } from "./styles";

/**
 * @param data: The data field that'll be prepared and get rendered on respective list
 * @param isRequesting: It specifies whether there is an ongoing request or not
 * @param refreshing: Its value define whether to show the list respective loader or not
 * @param sectionHeader: Used to keep Temporary Section Headers state for maintaining sections
 * @param sectionData: Used to keep Temporary Section Data state for maintaining sections and data
 */
export interface CustomFlatListState {
    data: Array<any>,
    isRequesting: boolean,
    refreshing: boolean,
    sectionHeader?: Array<any>,
    sectionData?: Array<any>
}

/**
 * 
 * @param shouldRefreshOnFocus: If the Flatlist should refreshes the data on focus or not, default is false
 * @param requestUrl: Defines the URL of API to be hit for fetching the data
 * @param requestData: Request Body Data(if needed), to be sent with API request
 * @param requestParams: Request Params Data(if needed), to be sent with API request
 * @param requestPath: Addition in API Path(if needed), to be sent with API request
 * @param isSection: If true, the list will work as section list. Default is false.
 * @param sectionHeaderTitle: A function that returns title of Section Headers, needed if @param isSection is true, takes element as input
 * @param noDataText: The text string that is needed to be displayed when there is no data to be rendered. Default is "".
 * @param shouldRefreshOnTap: Whether refeshing an empty list is allowed or not. Default is true.
 * @param hideRefreshLoader: Whether list respective loader should be visible at or not. Default is false.
 * @param footerComponent: Custom Footer should be shown once all data has been loaded. Defaut is blank View with some static padding and background color.
 * @param flatlistWrapper: The connected Action function to make API request.
 * @param hardRefresh: To give parent control for refreshing the list.
 * 
 */
interface CustomFlatlistAddOnsProps {
    shouldRefreshOnFocus?: boolean,
    requestUrl: string,
    requestData?: object,
    requestParams?: object,
    requestPath?: string,
    isSection?: boolean,
    sectionHeaderTitle?: (element: any) => string,
    noDataText?: string,
    shouldRefreshOnTap?: boolean,
    hideRefreshLoader?: boolean,
    footerComponent?: any,
    flatlistWrapper: Function,
    hardRefresh?: Function,
}

interface CustomisedFlatListProps extends FlatListProps<any>, CustomFlatlistAddOnsProps {

}

interface CustomisedSectionListProps extends SectionListProps<any>, CustomFlatlistAddOnsProps {

}

export type CustomFlatlistProps = CustomisedFlatListProps | CustomisedSectionListProps;

export const defaultProps = {
    onEndReachedThreshold: 0.1,
    isSection: false,
    noDataText: "",
    shouldRefreshOnFocus: false,
    shouldRefreshOnTap: true,
    hideRefreshLoader: false,
    showsVerticalScrollIndicator: false,
    showsHorizontalScrollIndicator: false,
    viewabilityConfig: {
        waitForInteraction: false,
        viewAreaCoveragePercentThreshold: 95
    },
    stickySectionHeadersEnabled: true,
    // footerComponent: <View style = {styles.emptyFooter} />,
    keyExtractor: (item: any, index: number) => index + '',
    contentContainerStyle: styles.flatListStyle,
}