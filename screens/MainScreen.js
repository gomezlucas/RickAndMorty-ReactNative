import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';



function MainScreen() {
  return (
    <View style={styles.container}>
      <Text>Esta es la main Screen</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
})

export default MainScreen 