import React, { useImperativeHandle } from 'react';
import { TouchableOpacity, ColorValue, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';
import { constants } from '../utils';

interface ColoredButtonProps {
    color: ColorValue;
    index: number;
    disabled: boolean;
    onPress: (index: number) => void;
}

export interface RefProps {
    startAnimation: () => void;
}

const { INITIAL_OPACITY_VALUE, FINAL_OPACITY_VALUE, ANIMATION_DURATION } = constants;

const ColoredButton = React.forwardRef<RefProps, ColoredButtonProps>(({ color, index, onPress, disabled }, ref) => {
    const opacity = useSharedValue(INITIAL_OPACITY_VALUE);
    const animatedStyles = useAnimatedStyle(() => ({ opacity: opacity.value }));
    const handleOnPress = () => onPress(index);

    useImperativeHandle(ref, () => ({
        startAnimation() {
            opacity.value = withSequence(
                opacity.value = withTiming(FINAL_OPACITY_VALUE, { duration: ANIMATION_DURATION }),
                opacity.value = withTiming(INITIAL_OPACITY_VALUE, { duration: ANIMATION_DURATION }),
            );
        }
    }));

    return (
        <Animated.View style={animatedStyles}>
            <TouchableOpacity
                activeOpacity={0.4}
                disabled={disabled}
                onPress={handleOnPress}
                style={[styles.container, { backgroundColor: color }]}
            />
        </Animated.View>
    )
})

export default ColoredButton;

const styles = StyleSheet.create({
    container: {
        height: constants.COLORED_BUTTON_SIZE,
        width: constants.COLORED_BUTTON_SIZE,
        borderWidth: 1
    }
});