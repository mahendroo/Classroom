import React, { Component } from 'react'
import { createRef } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { AppHeader } from '../../components/AppHeader'
import CustomFlatlist from '../../libs/custom-flatlist'
import { images } from '../../utils/constants/assets'
import { END_POINTS } from '../../utils/constants/endPoints'
import { globalStyles } from '../../utils/globalStyles'
import { StudentCard } from './StudentCard'
import { styles } from './styles'

class Homepage extends Component {

    customFlatlistRef = createRef();

    render() {
        return (
            <View style={styles.containerStyle}>
                <AppHeader rightActionImage={images.filterIcon} />
                <View style={globalStyles.flex1WithBackground}>
                    <CustomFlatlist
                        requestUrl={END_POINTS.filterStudents}
                        ref={this.customFlatlistRef}
                        renderItem={
                            ({ item, index }) => <StudentCard studentInfo={item} index={index} />
                        }
                    />
                </View>
            </View>
        )
    }
}
export default connect(null, {})(Homepage);
