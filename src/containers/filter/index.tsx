import React, { Component, LegacyRef } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { AppButton } from '../../components/AppButton';
import { AppPicker } from '../../components/AppPicker';
import { fetchClassDetails } from '../../network/studentDetailsRequests';
import { apiConstants } from '../../utils/constants/apiConstants';
import { appConstants } from '../../utils/constants/appConstants';
import { STRING_CONSTANTS } from '../../utils/constants/stringConstants'
import { logOnConsole } from '../../utils/globalFunctions';
import { defaultFilterProps, FilterProps, filterRequestDefaultState, FilterState } from './collections';
import { FilterOptionItem } from './FilterOptionItem';
import { styles } from './styles';


class Filter extends Component<Readonly<FilterProps>, FilterState> {

    /**
     * Have to create these string based legacy Ref as TextInput doesn't support RefObject
     */
    studentIdRef = "studentIdRef"
    firstNameRef = "firstNameRef"
    lastNameRef = "lastNameRef"

    static defaultProps = defaultFilterProps;

    constructor(props: Readonly<FilterProps>) {
        super(props);

        /**
         * Filter State is being managed from its Parent component
         * It can be moved to Redux if needed
         * 
         * Currently it isn't needed on multiple places, that's why keeping Abtract via Parent Component.
         * 
         * Filter is also not being stored in the Local Storage for Persistance considering the current requirement, 
         * if the requirement changes we can add that.
         */


        /**
         * This dynamic calculation of selectedIndex is kept 
         * if in case in future we need to refresh our ClassDetail by fetching details again
         * 
         * Other way would have been to just maintain the index like other states.
         */
        let selectedClassIndex, selectedSectionIndex;

        if (props.filterRequest.class && props.classData?.classes) {
            for (let index = 0; index < props.classData?.classes.length; index++) {
                const classItem = props.classData?.classes[index]
                if (classItem._id === props.filterRequest.class?._id) {
                    selectedClassIndex = index

                    for (let sectionIndex = 0; sectionIndex < classItem.section.length; sectionIndex++) {
                        const sectionItem = classItem.section[sectionIndex];
                        selectedSectionIndex = sectionIndex
                    }
                }
            }
        }

        this.state = {
            filterState: props.filterRequest,
            showClassPicker: false,
            showSectionPicker: false,
            selectedClassIndex: selectedClassIndex,
            selectedSectionIndex: selectedSectionIndex,
        }
    }

    componentDidMount() {
        if (!this.props.classData) {
            this.props.fetchClassDetails();
        } else {

        }
    }

    updateTextState = (ref: LegacyRef<TextInput>, text: string) => {
        let tempFilterState = { ...this.state.filterState }
        switch (ref) {
            case this.studentIdRef:
                tempFilterState.student_id = text;
                break;
            case this.firstNameRef:
                tempFilterState.first_name = text;
                break;
            case this.lastNameRef:
                tempFilterState.last_name = text;
                break;
        }
        this.setState({ filterState: tempFilterState })
    }

    onResetTapped = () => {
        this.setState({ filterState: filterRequestDefaultState })
    }

    toggleClassPickerModal = () => {
        this.setState((state, props) => ({
            showClassPicker: !state.showClassPicker,
            showSectionPicker: false,
        }));
    }

    toggleSectionPickerModal = () => {
        this.setState((state, props) => ({
            showClassPicker: false,
            showSectionPicker: !state.showSectionPicker,
        }));
    }

    render() {
        return (
            <View>
                <View style={styles.draggableViewStyle} />
                <View style={styles.filterHeaderContainerStyle}>
                    <Text style={styles.filterHeaderTextStyle}>{STRING_CONSTANTS.label_filter}</Text>
                    <Text style={styles.filterCancelTextStyle} onPress={this.onResetTapped}>{STRING_CONSTANTS.label_reset}</Text>
                </View>
                <ScrollView >
                    <FilterOptionItem label={STRING_CONSTANTS.label_student_id} value={this.state.filterState.student_id} ref={this.studentIdRef} onChangeText={(text) => this.updateTextState(this.studentIdRef, text)} />
                    <FilterOptionItem label={STRING_CONSTANTS.label_first_name} value={this.state.filterState.first_name} ref={this.firstNameRef} onChangeText={(text) => this.updateTextState(this.firstNameRef, text)} />
                    <FilterOptionItem label={STRING_CONSTANTS.label_last_name} value={this.state.filterState.last_name} ref={this.lastNameRef} onChangeText={(text) => this.updateTextState(this.lastNameRef, text)} />
                    <FilterOptionItem label={STRING_CONSTANTS.label_class} value={this.state.filterState.class?.class_name} placeholder={STRING_CONSTANTS.label_select_class} isDropdown={true} onPress={this.toggleClassPickerModal} />
                    <FilterOptionItem label={STRING_CONSTANTS.label_section} value={this.state.filterState.section?.section} placeholder={STRING_CONSTANTS.label_select_section} isDropdown={true} onPress={this.toggleSectionPickerModal} />

                </ScrollView>
                <View style={styles.filterSeparationBorderStyle} />

                <AppButton label={STRING_CONSTANTS.label_apply_filter} onPress={() => {
                    logOnConsole(this.state.filterState)
                    this.props.onFilterApply(this.state.filterState)
                    this.props.onCancelTap();
                }
                } />

                <Text style={styles.filterCancelActionStyle} onPress={this.props.onCancelTap}>{STRING_CONSTANTS.label_cancel}</Text>

                {this.state.showClassPicker ?
                    <AppPicker
                        data={this.props.classData?.classes}
                        onDismiss={this.toggleClassPickerModal}
                        visible={this.state.showClassPicker}
                        idKey={apiConstants.id_key}
                        valueKey={apiConstants.class_name_key}
                        selectedIndex={this.state.selectedClassIndex}
                        onItemSelected={(selectedIndex) => {
                            let selectedClass = this.props.classData?.classes[selectedIndex]
                            let tempFilterState = { ...this.state.filterState }
                            tempFilterState.class = selectedClass
                            tempFilterState.section = undefined
                            this.setState({ selectedClassIndex: selectedIndex, filterState: tempFilterState, selectedSectionIndex: undefined })
                        }}
                    /> : null}

                {this.state.showSectionPicker && this.state.filterState.class ?
                    <AppPicker
                        data={this.props.classData?.classes[this.state.selectedClassIndex!!].section}
                        onDismiss={this.toggleSectionPickerModal}
                        visible={this.state.showSectionPicker}
                        idKey={apiConstants.id_key}
                        valueKey={apiConstants.section_name_key}
                        selectedIndex={this.state.selectedSectionIndex}
                        onItemSelected={(selectedIndex) => {
                            let selectedSection = this.props.classData?.classes[selectedIndex]
                            let tempFilterState = { ...this.state.filterState }
                            tempFilterState.section = this.props.classData?.classes[this.state.selectedClassIndex!!].section[selectedIndex]
                            this.setState({ selectedSectionIndex: selectedIndex, filterState: tempFilterState })
                        }}
                    /> : null}
            </View>
        )
    }
}


const mapStateToProps = (state: any) => {
    return {
        classData: state.ClassReducer[appConstants.data] || {},
    };
};

export default connect(mapStateToProps, { fetchClassDetails })(Filter);
