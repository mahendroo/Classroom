import React, { Component } from 'react'
import { createRef } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { AppHeader } from '../../components/AppHeader'
import { AppThemeModal } from '../../components/AppThemeModal'
import CustomFlatlist from '../../libs/custom-flatlist'
import { images } from '../../utils/constants/assets'
import { END_POINTS } from '../../utils/constants/endPoints'
import { globalStyles } from '../../utils/globalStyles'
import { HompepageState } from './collections'
import { StudentCard } from './StudentCard'
import { styles } from './styles'
import Filter from '../filter'
import { filterApiRequestDefaultState, FilterRequest, filterRequestDefaultState } from '../filter/collections'
import { isNotEmpty, logOnConsole } from '../../utils/globalFunctions'

class Homepage extends Component<Readonly<any>, HompepageState> {

    customFlatlistRef = createRef();
    refreshList?: Function;

    constructor(props: Readonly<any>) {
        super(props);

        this.state = {
            showFilterModal: false,
            filterState: filterRequestDefaultState,
            filterApiRequest: filterApiRequestDefaultState,
        }
    }

    toggleFilterModal = () => {
        this.setState((state, props) => ({
            showFilterModal: !state.showFilterModal
        }));
    }

    onFilterApplied = (newFilterRequest: FilterRequest) => {
        let tempFilterApiRequest = { ...this.state.filterApiRequest }

        tempFilterApiRequest.student_id = isNotEmpty(newFilterRequest.student_id) ? newFilterRequest.student_id?.split(",") : []


        let firstName = isNotEmpty(newFilterRequest.first_name) ? newFilterRequest.first_name : ""
        let lastName = isNotEmpty(newFilterRequest.last_name) ? newFilterRequest.last_name : ""

        let fullName = firstName + lastName;

        tempFilterApiRequest.name = isNotEmpty(fullName) ? [fullName] : []
        tempFilterApiRequest.class_name = isNotEmpty(newFilterRequest.class_name) ? newFilterRequest.class_name?.split(",") : []
        tempFilterApiRequest.section = isNotEmpty(newFilterRequest.section) ? newFilterRequest.section?.split(",") : []

        this.setState({ filterApiRequest: tempFilterApiRequest, filterState: newFilterRequest }, () => {
            logOnConsole(this.state.filterApiRequest)
            this.refreshList && this.refreshList()
        })
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <AppHeader rightActionImage={images.filterIcon} onRightActionPress={this.toggleFilterModal} />
                <View style={globalStyles.flex1WithBackground}>
                    <CustomFlatlist
                        requestUrl={END_POINTS.filterStudents}
                        ref={this.customFlatlistRef}
                        requestData={this.state.filterApiRequest}
                        renderItem={
                            ({ item, index }) => <StudentCard studentInfo={item} index={index} />
                        }
                        hardRefresh={(refresh: Function) => this.refreshList = refresh}
                    />
                </View>
                {this.state.filterState ? <AppThemeModal onDismiss={this.toggleFilterModal} visible={this.state.showFilterModal}>
                    {
                        (dimissCallback) => {
                            return <Filter onFilterApply={this.onFilterApplied} filterRequest={this.state.filterState} onCancelTap={dimissCallback} />
                        }
                    }
                </AppThemeModal> : null}
            </View>
        )
    }
}
export default connect(null, {})(Homepage);
