import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function NotificationsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>You have new notifications!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default NotificationsScreen;
