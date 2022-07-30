import React, { FC } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';

interface HeaderTextProps {
    text: string;
    customTextStyle?: StyleProp<TextStyle>;
}

const HeaderText: FC<HeaderTextProps> = ({ text, customTextStyle }) => {
    return (
        <View style={styles.container}>
            <Text style={[styles.text, customTextStyle]}>{text}</Text>
        </View>
    )
}

export default HeaderText;

const styles = StyleSheet.create({
    container: {
        marginVertical: 24
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    }
})