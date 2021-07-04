import React, { Component } from 'react'
import { View, Image, Text } from 'react-native'
import { AppImageIcon } from '../../components/AppImageIcon'
import { images } from '../../utils/constants/assets'
import { STRING_CONSTANTS } from '../../utils/constants/stringConstants'
import { StudentCardProps } from './collections'
import { ShortPropertyInfo } from './ShortPropertyInfo'
import { styles } from './styles'

export class StudentCard extends Component<Readonly<StudentCardProps>, Readonly<any>> {


    render() {
        const studentInfo = this.props.studentInfo
        return (
            <View style={styles.studentCardWrapperStyle} key={studentInfo?._id}>
                <View style={styles.studentCardContainerStyle}>
                    <View style={styles.studentCardUpperBodyContainerStyle}>
                        <Image
                            style={styles.studentProfilePictureStyle}
                            source={{ uri: studentInfo?.profile_picture ? studentInfo.profile_picture : undefined }} />

                        <View style={styles.studentNameIdContainerStyle}>
                            <Text style={styles.studentNameCardStyle} numberOfLines={1}>{studentInfo.first_name + " " + studentInfo.last_name}</Text>
                            <Text style={styles.studentIdCardStyle} numberOfLines={1}>{`${STRING_CONSTANTS.label_student_id}: ${studentInfo.student?.student_id}`}</Text>
                        </View>

                        <AppImageIcon
                            image={images.moreOptionsIcon}
                            wrapperStyle={styles.studentCardMoreOptionContainerStyle}
                            iconStyle={styles.studentCardMoreOptionIconStyle} />

                    </View>
                    <View style={styles.studentCardLowerBodyContainerStyle}>
                        <ShortPropertyInfo
                            label={STRING_CONSTANTS.label_class}
                            value={studentInfo.student?.class_name} />
                        <View style={styles.shortPropertyInfoBorderViewStyle} />
                        <ShortPropertyInfo
                            label={STRING_CONSTANTS.label_section}
                            value={studentInfo.student?.section} />
                        <View style={styles.shortPropertyInfoBorderViewStyle} />
                        <ShortPropertyInfo
                            label={STRING_CONSTANTS.label_campus}
                            value={studentInfo.campus} />
                    </View>
                </View>

            </View>
        )
    }
}