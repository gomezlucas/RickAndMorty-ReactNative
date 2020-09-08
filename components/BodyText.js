import * as React from 'react';
import { Text, StyleSheet } from 'react-native';

function BodyText (props) {
  return <Text style={{...styles.text, ...props.style}}> {props.children}</Text>;
}

const styles = StyleSheet.create({
  text: { 
    fontFamily: 'roboto',
    fontSize: 18, 
     },
});

export default BodyText;
