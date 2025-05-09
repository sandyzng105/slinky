import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ActionButton = ({ title, subtitle, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
    <Text style={styles.arrow}>›</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#142A3E',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8
  },
  title: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  subtitle: { color: '#aaa', fontSize: 12 },
  arrow: { color: '#5DFDCB', fontSize: 24 }
});

export default ActionButton;
