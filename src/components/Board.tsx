import React, { FC } from 'react';
import { ColorValue, StyleSheet, View } from 'react-native';
import { colors, constants } from '../utils';
import ColoredButton from './ColoredButton';

interface BoardProps {
    isGameStarted: boolean;
}

const colorSquare: ColorValue[] = [colors.RED, colors.GREEN, colors.BLUE, colors.YELLOW];

const Board: FC<BoardProps> = ({ isGameStarted }) => {
    return (
        <View style={styles.container}>
            {colorSquare.map(color => (
                <ColoredButton key={color.toString()} color={color} />
            ))}
        </View>

    )
}

export default Board;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: constants.COLORED_BUTTON_SIZE * constants.AMOUNT_OF_COLUMNS,
    }
})