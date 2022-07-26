import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface HeaderTextProps {
    text: string;
}
const HeaderText: FC<HeaderTextProps> = ({ text }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
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
        fontWeight: 'bold'
    }
})