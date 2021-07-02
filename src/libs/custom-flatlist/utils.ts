
export const isDataRefreshing = (typeOfRequest: number) => {
	return typeOfRequest === FLATLIST_REQUEST.REFRESH;
};

export const isDataPaginating = (typeOfRequest: number) => {
	return typeOfRequest === FLATLIST_REQUEST.PAGINATION;
};

export const shouldShowTopLoaderOnListing = (typeOfRequest: number) => {
	return typeOfRequest === FLATLIST_REQUEST.FIRST_TIME;
};

export enum FLATLIST_REQUEST {
    FIRST_TIME,
    REFRESH,
    PAGINATION
}
