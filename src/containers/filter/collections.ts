import { GestureResponderEvent } from "react-native";

type StringOrUndefined = string | undefined

export interface FilterOptionItemProps {
    label: string,
    ref: any,
    value: StringOrUndefined,
    placeholder?: StringOrUndefined,
    isDropdown?: boolean,
    onPress?: null | ((event: GestureResponderEvent) => void),
}