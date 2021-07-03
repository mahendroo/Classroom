import React, { Component } from 'react'
import { createRef } from 'react';
import { Text, TextInput, View } from 'react-native'
import { connect } from 'react-redux';
import { AppButton } from '../../components/AppButton';
import { colors } from '../../utils/constants/colors';
import { dimensConstants } from '../../utils/constants/dimensConstant';
import { fontSize } from '../../utils/constants/fonts';
import { STRING_CONSTANTS } from '../../utils/constants/stringConstants'
import { FilterOptionItem } from './FilterOptionItem';
import { styles } from './styles';


class Filter extends Component<Readonly<any>, any> {

    studentIdRef = createRef<TextInput>()
    firstNameRef = createRef<TextInput>()
    lastNameRef = createRef<TextInput>()

    constructor(props: Readonly<any>) {
        super(props);

        this.state = {
            studentId: undefined,
            firstName: undefined,
            lastName: undefined,
            selectedClass: undefined,
            selectedSection: undefined,
        }
    }


    render() {
        return (
            <View>
                <View style={styles.draggableViewStyle} />
                <View style={styles.filterHeaderContainerStyle}>
                    <Text style={styles.filterHeaderTextStyle}>{STRING_CONSTANTS.label_filter}</Text>
                    <Text style={styles.filterCancelTextStyle}>{STRING_CONSTANTS.label_reset}</Text>
                </View>
                <FilterOptionItem label={STRING_CONSTANTS.label_student_id} value={this.state.studentId} ref={this.studentIdRef} />
                <FilterOptionItem label={STRING_CONSTANTS.label_first_name} value={this.state.firstName} ref={this.firstNameRef} />
                <FilterOptionItem label={STRING_CONSTANTS.label_last_name} value={this.state.lastName} ref={this.lastNameRef} />
                <FilterOptionItem label={STRING_CONSTANTS.label_class} value={this.state.selectedClass} placeholder={STRING_CONSTANTS.label_select_class} isDropdown={true} />
                <FilterOptionItem label={STRING_CONSTANTS.label_section} value={this.state.selectedSection} placeholder={STRING_CONSTANTS.label_select_section} isDropdown={true} />

                <View style={styles.filterSeparationBorderStyle} />

                <AppButton label={STRING_CONSTANTS.label_apply_filter} />

                <Text style={styles.filterCancelActionStyle}>{STRING_CONSTANTS.label_cancel}</Text>
            </View>
        )
    }
}
export default connect(null, {})(Filter);
