import React, { Component, ReactNode } from "react";
import {
    Modal,
    View,
    StyleSheet,
    Animated,
    Dimensions,
    PanResponder,
    Keyboard,
    ViewStyle,
    PanResponderInstance,
} from "react-native";
import { colors } from "../utils/constants/colors";
import { dimensConstants } from "../utils/constants/dimensConstant";

export class AppThemeModal extends Component<AppThemeModalProps, AppThemeModalState> {

    // Default
    resetPositionAnim: any;
    closeAnim: any;
    panResponders: PanResponderInstance;

    constructor(props: AppThemeModalProps) {
        super(props);
        this.state = {
            panY: new Animated.Value(0),
        };

        this.initAnimation();

        this.setPanResponder()
    }

    /**
     * Dismissable animation
     * Swipe Up/Down
     */
    initAnimation = () => {

        this.resetPositionAnim = Animated.timing(this.state.panY, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        });

        this.closeAnim = Animated.timing(this.state.panY, {
            toValue: Dimensions.get("screen").height,
            duration: 500,
            useNativeDriver: true,
        });

    }

    /**
     * Applied Pan responder for Swipable functionality
     */
    setPanResponder = () => {
        this.panResponders = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => false,
            onPanResponderMove: (e, gs) => {
                if (gs.dy > 0 && !this.props.disableGesture) {
                    this.state.panY.setValue(gs.dy);
                }
            },
            onPanResponderRelease: (e, gs) => {
                if (gs.dy > 0 && gs.vy > 0.5) {
                    Keyboard.dismiss();
                    return this.closeAnim.start(() => {
                        this.props.onDismiss();
                    });
                } else {
                    this.state.panY.setValue(0);
                }
                return this.resetPositionAnim.start();
            },
        });
    }

    componentDidUpdate(prevProps: AppThemeModalProps, prevState: AppThemeModalState) {
        if (prevProps.visible !== this.props.visible && this.props.visible) {
            this.resetPositionAnim.start();
        }
    }

    handleDismissAnimation() {
        this.closeAnim.start(() => this.props.onDismiss());
    }

    render() {
        return (
            <Modal
                animated
                animationType="fade"
                visible={this.props.visible}
                transparent
                onRequestClose={() => this.props.onDismiss()}>
                <View style={styles.backgroundOverlay}>
                    <Animated.View
                        style={[
                            styles.container,
                            this.props.containerStyle,
                            { transform: [{ translateY: this.state.panY }] },
                        ]}
                        {...this.panResponders.panHandlers}>
                        {this.props.children(this.handleDismissAnimation.bind(this))}
                    </Animated.View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.card_background_color,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        paddingBottom: dimensConstants.standard_padding,
        paddingHorizontal: dimensConstants.standard_padding,
        height: "80%",
    },
    backgroundOverlay: {
        flex: 1,
        backgroundColor: colors.modal_background,
        justifyContent: "flex-end",
    },
});


interface AppThemeModalProps {
    children: (fn: () => void) => undefined | ReactNode;
    onDismiss: Function;
    visible: boolean;
    containerStyle?: ViewStyle;
    stripStyle?: ViewStyle;
    disableGesture?: boolean;
};

interface AppThemeModalState {
    panY: Animated.Value
};