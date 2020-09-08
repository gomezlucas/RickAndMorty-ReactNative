import *  as React from  'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import BodyText from './BodyText'

function MainButton (props) {

return (
  <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}> 
  <View style={styles.button}>
      <BodyText style={styles.buttonText}> {props.children} </BodyText>
  </View>
</TouchableOpacity>)
}

const styles = StyleSheet.create({
    button:{
      backgroundColor: '#FF9800', 
      paddingVertical: 10, 
      paddingHorizontal: 30, 
      borderRadius: 25,
      marginVertical: 10,
    },
    buttonText:{
      color: 'white',
    },
})


export default MainButton
