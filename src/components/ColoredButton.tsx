import React, { useImperativeHandle, useRef } from 'react';
import { TouchableOpacity, ColorValue, StyleSheet } from 'react-native';
import Sound from 'react-native-sound';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';
import { constants } from '../utils';

interface ColoredButtonProps {
    color: ColorValue;
    index: number;
    disabled: boolean;
    onPress: (index: number) => void;
    soundPath?: string;
}

export interface RefProps {
    startAnimation: () => void;
}

const {
    INITIAL_OPACITY_VALUE,
    FINAL_OPACITY_VALUE,
    ANIMATION_DURATION,
    COLORED_BUTTON_SIZE,
    MARGIN_OF_SQUARE
} = constants;

const ColoredButton = React.forwardRef<RefProps, ColoredButtonProps>(({ color, index, onPress, disabled, soundPath }, ref) => {
    const soundRef = useRef(new Sound(soundPath, Sound.MAIN_BUNDLE));
    const opacity = useSharedValue(INITIAL_OPACITY_VALUE);
    const animatedStyles = useAnimatedStyle(() => ({ opacity: opacity.value }));

    const handleOnPress = () => {
        soundRef.current.play();
        onPress(index);
    }

    useImperativeHandle(ref, () => ({
        startAnimation() {
            soundRef.current.play();
            opacity.value = withSequence(
                withTiming(FINAL_OPACITY_VALUE, { duration: ANIMATION_DURATION / 2 }),
                withTiming(INITIAL_OPACITY_VALUE, { duration: ANIMATION_DURATION / 2 }),
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
        height: COLORED_BUTTON_SIZE,
        width: COLORED_BUTTON_SIZE,
        borderWidth: 1,
        borderRadius: 15,
        margin: MARGIN_OF_SQUARE
    }
});