import { LegacyRef } from "react";
import { TextInput } from "react-native";
import { GestureResponderEvent } from "react-native";
import { emptyFunction } from "../../utils/globalFunctions";
import { ClassDataType } from "../student-list/collections";

type StringOrUndefined = string | undefined

export interface FilterOptionItemProps {
    label: string,
    ref?: LegacyRef<TextInput>,
    value: StringOrUndefined,
    placeholder?: StringOrUndefined,
    isDropdown?: boolean,
    onPress?: null | ((event: GestureResponderEvent) => void),
    onChangeText?: (text: string) => void,
}

export interface FilterRequest {
    student_id: string,
    first_name: string,
    last_name: string,
    class_name: string,
    section: string,
    page: number,
    limit: number,
}

export interface FilterApiRequest {
    student_id: Array<string>,
    name: Array<string>,
    class_name: Array<string>,
    section: Array<string>,
    page?: string,
    limit?: string,
}

export const filterApiRequestDefaultState = {
    student_id: [],
    name: [],
    class_name: [],
    section: [],
    page: "1",
    limit: "10",
}

export const filterRequestDefaultState: FilterRequest = {
    student_id: "",
    first_name: "",
    last_name: "",
    class_name: "",
    section: "",
    page: 1,
    limit: 10,
}

export interface FilterProps {
    filterRequest: FilterRequest,
    onFilterApply: Function,
    onCancelTap: Function,
    classData?: ClassDataType,
}

export interface FilterState {
    filterState: FilterRequest,
}

export const defaultFilterProps: FilterProps = {
    filterRequest: filterRequestDefaultState,
    onFilterApply: emptyFunction,
    onCancelTap: emptyFunction,
}