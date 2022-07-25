import React, { FC } from 'react';
import { TouchableOpacity, ColorValue, StyleSheet } from 'react-native';
import { constants } from '../utils';

interface ColoredButtonProps {
    color: ColorValue;
}

const ColoredButton: FC<ColoredButtonProps> = ({ color }) => {
    return (
        <TouchableOpacity style={[styles.container, { backgroundColor: color }]} />
    )
}

export default ColoredButton;

const styles = StyleSheet.create({
    container: {
        height: constants.COLORED_BUTTON_SIZE,
        width: constants.COLORED_BUTTON_SIZE,
        borderWidth: 1
    }
});