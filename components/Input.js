import React from 'react'
import {View, StyleSheet, Text, TextInput} from 'react-native'



function Input (props){
  return(
    <TextInput {...props}  style={{...styles.input, ...props.style }} />
    
  )
}

const styles = StyleSheet.create({
  input:{
    borderBottomColor: 'grey',
    borderBottomWidth: 1, 
    height: 30,
    marginHorizontal: 10,
    marginBottom: 5, 
  },
})

export default Input
