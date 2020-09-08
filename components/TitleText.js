import * as React from 'react';
import { Text, StyleSheet } from 'react-native';

function TitleText(props) {
  return <Text style={{...styles.text, ...props.style}}> {props.children}</Text>;
}

const styles = StyleSheet.create({
  text: { 
    fontFamily: 'roboto-bold',
    fontSize: 25, 
     },
});

export default TitleText;
