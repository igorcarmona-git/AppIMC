import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const IconIMC = ({ iconName, iconSize, iconColor, text, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.iconStyle}>
    <Icon 
        name={iconName} 
        size={iconSize} 
        color={iconColor} 
    />
    <Text style={styles.iconText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
    iconStyle:{
        alignItems: 'center', 
        marginHorizontal: 10,
    },

    iconText:{
        color: 'white', 
        marginTop: 0,
        fontWeight: 'bold',
        marginBottom: 12,
    },
});