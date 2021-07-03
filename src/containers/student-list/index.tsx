import React, { Component } from 'react'
import { createRef } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { AppHeader } from '../../components/AppHeader'
import CustomFlatlist from '../../libs/custom-flatlist'
import { images } from '../../utils/constants/assets'
import { globalStyles } from '../../utils/globalStyles'
import { sampleStudentInfo } from './collections'
import { StudentCard } from './StudentCard'
import { styles } from './styles'

class Homepage extends Component {

    customFlatlistRef = createRef();

    render() {
        return (
            <View style={styles.containerStyle}>
                <AppHeader rightActionImage={images.filterIcon} />
                <StudentCard studentInfo={sampleStudentInfo} index={0} />
                <View style={globalStyles.flex1WithBackground}>
                    <CustomFlatlist
                        requestUrl="job-post/"
                        ref={this.customFlatlistRef}
                        renderItem={
                            ({ item, index }) => <StudentCard />
                        }
                    />
                </View>
            </View>
        )
    }
}
export default connect(null, {})(Homepage);
