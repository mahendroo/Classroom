import React, { Component } from 'react'
import { Keyboard, Pressable, Text, TextInput, View } from 'react-native'
import { AppImageIcon } from '../../components/AppImageIcon'
import { images } from '../../utils/constants/assets'
import { emptyFunction } from '../../utils/globalFunctions'
import { FilterOptionItemProps } from './collections'
import { styles } from './styles'

export class FilterOptionItem extends Component<Readonly<FilterOptionItemProps>, any> {


    render() {

        const { label, value, onChangeText, placeholder, ref, isDropdown, onPress = emptyFunction } = this.props;

        return (
            <View style={styles.filterOptionItemContainerStyle}>
                <Text style={styles.filterOptionLabelStyle}>{label}</Text>
                {!isDropdown ?
                    <View style={styles.filterOptionsInputWrapper}>
                        <TextInput
                            style={styles.filterOptionTextInputStyle}
                            value={value} ref={ref}
                            onChangeText={onChangeText}
                            returnKeyType={'done'}
                            onSubmitEditing={() => Keyboard.dismiss()}
                            blurOnSubmit={false} />
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