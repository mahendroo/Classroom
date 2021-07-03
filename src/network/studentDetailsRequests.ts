import { actionCreators } from "../actions/actionCreators";
import { ClassDetailResponse } from "../containers/student-list/collections";
import { END_POINTS } from "../utils/constants/endPoints";
import { API_HEADERS, API_REQUEST } from "./collections";
import { commonApiWrapper } from "./requests";

export const fetchClassDetails = (succesCallback: Function, errorCallback: Function) => {
    return (dispatch: Function) =>
        commonApiWrapper(
            dispatch,
            END_POINTS.classDetails,
            API_REQUEST.GET,
            API_HEADERS.TYPE_RAW_DATA,
            null,
            null,
            null,
            (res: ClassDetailResponse) => {
                dispatch(actionCreators.saveClassDetails(res.data))
                succesCallback()
            },
            errorCallback,
        );
};
