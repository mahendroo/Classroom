import React, { Component } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'
import { AppImageIcon } from '../../components/AppImageIcon'
import { images } from '../../utils/constants/assets'
import { emptyFunction } from '../../utils/globalFunctions'
import { FilterOptionItemProps } from './collections'
import { styles } from './styles'

export class FilterOptionItem extends Component<Readonly<FilterOptionItemProps>, any> {


    render() {
        const label = this.props.label
        const value = this.props.value
        const placeholder = this.props.placeholder
        const ref = this.props.ref
        const isDropdown = this.props.isDropdown
        const onPress = this.props.onPress ? this.props.onPress : emptyFunction

        return (
            <View style={styles.filterOptionItemContainerStyle}>
                <Text style={styles.filterOptionLabelStyle}>{label}</Text>
                {!isDropdown ?
                    <View style={styles.filterOptionsInputWrapper}>
                        <TextInput style={styles.filterOptionTextInputStyle} value={value} ref={ref} />
                    </View>
                    :
                    <Pressable onPress={onPress} style={({ pressed }) => [styles.filterOptionsInputWrapper, { opacity: pressed ? 0.4 : 1 }]}>
                        <Text style={styles.filterOptionDropdownTextStyle}>{value ? value : placeholder}</Text>
                        <AppImageIcon
                            image={images.dropdownIcon}
                            disabled={true}
                            wrapperStyle={styles.filterOptionsDropdownIconStyle} />
                    </Pressable>}
            </View>
        )
    }
}